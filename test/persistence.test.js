const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { randomBytes } = require('node:crypto');
const Enmap = require('enmap');
const { TicketStore } = require('../tickets');
const { importLegacy } = require('../legacy');

test('real SQLite/Enmap adapter persists encrypted records across restart', () => {
    const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'tickets-db-'));
    const key = randomBytes(32).toString('base64');
    let db;
    try {
        db = new Enmap({ name: 'privateTickets', dataDir: dir, fetchAll: false, autoFetch: true });
        let store = new TicketStore(db, key);
        store.upsert({ threadId: '120000000000000001', openerId: '120000000000000002', description: 'sensitive ticket fixture' });
        db.close(); db = null;
        assert(!fs.readFileSync(path.join(dir, 'enmap.sqlite')).includes(Buffer.from('sensitive ticket fixture')));
        db = new Enmap({ name: 'privateTickets', dataDir: dir, fetchAll: false, autoFetch: true });
        store = new TicketStore(db, key);
        assert.equal(store.get('120000000000000001').description, 'sensitive ticket fixture');
    } finally { db?.close(); fs.rmSync(dir, { recursive: true, force: true }); }
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
