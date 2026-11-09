const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { randomBytes } = require('node:crypto');
const Enmap = require('enmap');
const { TicketStore } = require('../tickets');
const { importLegacy } = require('../legacy');
const { EncryptedSessionStore } = require('../session-store');

test('real SQLite/Enmap adapter persists encrypted records and login sessions across restart', async () => {
    const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'tickets-db-'));
    const key = randomBytes(32).toString('base64');
    let db; let sessions;
    try {
        db = new Enmap({ name: 'privateTickets', dataDir: dir, fetchAll: false, autoFetch: true });
        let store = new TicketStore(db, key);
        store.upsert({ threadId: '120000000000000001', openerId: '120000000000000002', description: 'sensitive ticket fixture', archived: true });
        store.saveMessage('120000000000000001', { id: '120000000000000003', authorId: '120000000000000002', content: 'encrypted chat persists indefinitely' });
        store.write(`t:${store.index('120000000000000001')}`, { ...store.get('120000000000000001'), expiresAt: Date.now() - 86400000 });
        sessions = new EncryptedSessionStore(store);
        await new Promise((resolve, reject) => sessions.set('persistent-session-fixture', { user: { id: '120000000000000002' }, csrfToken: 'private-csrf-fixture', cookie: {} }, error => error ? reject(error) : resolve()));
        sessions.stopInterval();
        db.close(); db = null;
        assert(!fs.readFileSync(path.join(dir, 'enmap.sqlite')).includes(Buffer.from('sensitive ticket fixture')));
        assert(!fs.readFileSync(path.join(dir, 'enmap.sqlite')).includes(Buffer.from('persistent-session-fixture')));
        assert(!fs.readFileSync(path.join(dir, 'enmap.sqlite')).includes(Buffer.from('private-csrf-fixture')));
        db = new Enmap({ name: 'privateTickets', dataDir: dir, fetchAll: false, autoFetch: true });
        store = new TicketStore(db, key);
        assert.equal(store.get('120000000000000001').description, 'sensitive ticket fixture');
        assert.equal(store.get('120000000000000001').expiresAt, null);
        assert.equal(store.expire(), 0);
        assert.equal(store.message('120000000000000001', '120000000000000003').content, 'encrypted chat persists indefinitely');
        assert(!fs.readFileSync(path.join(dir, 'enmap.sqlite')).includes(Buffer.from('encrypted chat persists indefinitely')));
        sessions = new EncryptedSessionStore(store);
        const restored = await new Promise((resolve, reject) => sessions.get('persistent-session-fixture', (error, data) => error ? reject(error) : resolve(data)));
        assert.equal(restored.user.id, '120000000000000002');
        assert.equal(restored.csrfToken, 'private-csrf-fixture');
    } finally { sessions?.stopInterval(); db?.close(); fs.rmSync(dir, { recursive: true, force: true }); }
});

test('verified legacy retirement removes old plaintext only after encrypted persistence', async () => {
    const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'tickets-legacy-'));
    let old; let encrypted;
    try {
        old = new Enmap({ name: 'botData', dataDir: dir, fetchAll: false, autoFetch: true });
        encrypted = new Enmap({ name: 'privateTickets', dataDir: dir, fetchAll: false, autoFetch: true });
        const store = new TicketStore(encrypted, randomBytes(32).toString('base64'));
        old.set('ticket_120000000000000001', { userId: '120000000000000002', joinedUserIds: [], closedLockedReason: 'old private reason' });
        const settings = { guildId: '120000000000000004', ticketParentId: '120000000000000005' };
        const report = await importLegacy({ client: { user: { id: '120000000000000007' } }, legacy: old, store, settings, channels: [], apply: true, retire: true });
        assert.equal(report.retired, 1); assert.equal(old.indexes.length, 0);
        assert.equal(store.get('120000000000000001').openerId, '120000000000000002');
        assert(!fs.readFileSync(path.join(dir, 'enmap.sqlite')).includes(Buffer.from('old private reason')));
    } finally { old?.close(); encrypted?.close(); fs.rmSync(dir, { recursive: true, force: true }); }
});

test('SQLite batches commit encrypted message pages once and roll back database, cache and revision', async () => {
    const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'tickets-batch-'));
    const key = randomBytes(32).toString('base64');
    let db;
    try {
        db = new Enmap({ name: 'privateTickets', dataDir: dir, fetchAll: false, autoFetch: true });
        const store = new TicketStore(db, key);
        const thread = '120000000000000001';
        store.upsert({ threadId: thread, openerId: '120000000000000002' });
        let changes = 0;
        store.on('change', () => changes++);
        const messages = Array.from({ length: 20 }, (_, i) => ({
            id: String(120000000000001000n + BigInt(i)), authorId: '120000000000000002', content: `secret page message ${i}`,
        }));
        store.batchWrites(() => messages.forEach(message => store.saveMessage(thread, message)));
        assert.equal(changes, 1);
        assert.equal(store.messages(thread).length, 20);
        const revision = store.revision;
        const inserted = { id: '120000000000002000', authorId: '120000000000000002', content: 'rolled back insert' };
        assert.throws(() => store.batchWrites(() => {
            store.saveMessage(thread, { ...messages[0], content: 'rolled back update' });
            store.saveMessage(thread, inserted);
            throw new Error('abort page');
        }), /abort page/);
        assert.equal(store.message(thread, messages[0].id).content, messages[0].content);
        assert.equal(store.message(thread, inserted.id), null);
        assert.equal(store.revision, revision);
        assert.equal(changes, 1);
        db.close(); db = null;
        const bytes = fs.readFileSync(path.join(dir, 'enmap.sqlite'));
        assert(!bytes.includes(Buffer.from('secret page message')));
        assert(!bytes.includes(Buffer.from('rolled back')));
        db = new Enmap({ name: 'privateTickets', dataDir: dir, fetchAll: false, autoFetch: true });
        const restored = new TicketStore(db, key);
        assert.equal(restored.messages(thread).length, 20);
        assert.equal(restored.message(thread, messages[0].id).content, messages[0].content);
        assert.equal(restored.message(thread, inserted.id), null);
    } finally { db?.close(); fs.rmSync(dir, { recursive: true, force: true }); }
});
