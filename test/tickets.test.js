const test = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const { TicketStore, ticketStatus, DAY } = require('../tickets');
const { parseCard, importLegacy } = require('../legacy');

const ticketId = '120000000000000001';
const userId = '120000000000000002';
const messageId = '120000000000000003';
const key = randomBytes(32).toString('base64');
const base = { threadId: ticketId, guildId: '120000000000000004', parentId: '120000000000000005', openerId: userId, description: 'private description' };

test('authenticated encryption hides identifiers and payloads; wrong keys and tampering fail closed', () => {
    const database = new Map();
    const store = new TicketStore(database, key);
    store.upsert(base);
    const raw = JSON.stringify([...database]);
    assert(!raw.includes(userId)); assert(!raw.includes(ticketId)); assert(!raw.includes('private description'));
    assert.equal(new TicketStore(database, key).get(ticketId).openerId, userId);
    assert.throws(() => new TicketStore(database, randomBytes(32).toString('base64')));
    const a = `t:${store.index(ticketId)}`;
    database.set(a, { ...database.get(a), tag: Buffer.alloc(16).toString('base64') });
    assert.throws(() => store.get(ticketId));
});

test('all states, stable close dates, reopening, retention and no resurrection after purge', () => {
    let now = 100 * DAY;
    const store = new TicketStore(new Map(), key, { now: () => now });
    assert.equal(ticketStatus({ archived: true, locked: true }), 'locked');
    store.upsert(base); assert.equal(store.counts().open, 1);
    now += DAY; store.upsert({ threadId: ticketId, archived: true });
    const closed = store.get(ticketId);
    now += DAY; store.upsert({ threadId: ticketId, name: 'renamed' });
    assert.equal(store.get(ticketId).statusChangedAt, closed.statusChangedAt);
    assert.equal(store.get(ticketId).expiresAt, closed.expiresAt);
    store.upsert({ threadId: ticketId, locked: true });
    assert.equal(store.get(ticketId).expiresAt, closed.expiresAt);
    store.upsert({ threadId: ticketId, locked: false });
    store.upsert({ threadId: ticketId, archived: false });
    assert.equal(store.get(ticketId).expiresAt, null);
    store.upsert({ threadId: ticketId, locked: true }); assert.equal(store.counts().locked, 1);
    now += 31 * DAY; assert.equal(store.expire(), 1); assert.equal(store.get(ticketId), null);
    assert.equal(store.upsert(base, { imported: true }), null);
    assert.equal(store.upsert(base), null);
});

test('opt-out, deletion and edit/delete backfill races preserve privacy', () => {
    const store = new TicketStore(new Map(), key);
    store.upsert(base);
    const message = { id: messageId, authorId: userId, content: 'secret', editedAt: 100 };
    assert(store.saveMessage(ticketId, message));
    assert.equal(store.saveMessage(ticketId, { ...message, content: 'stale', editedAt: null }), false);
    assert.equal(store.messages(ticketId)[0].content, 'secret');
    store.deleteMessage(ticketId, messageId);
    assert.equal(store.saveMessage(ticketId, message), false);
    store.excludeUser(userId);
    assert.equal(store.get(ticketId).description, null);
    assert.equal(store.saveMessage(ticketId, { ...message, id: '120000000000000006' }), false);
    store.upsert({ ...base, description: 'reimport' });
    assert.equal(store.get(ticketId).description, null);
    store.deleteUser(userId); assert.equal(store.get(ticketId), null);
    assert.equal(store.upsert(base, { imported: true }), null);
});

test('legacy parser validates author and schema; safe import is idempotent and preserves live values', async () => {
    const settings = { guildId: base.guildId, ticketParentId: base.parentId };
    const botId = '120000000000000007';
    const card = { author: { id: botId }, createdTimestamp: Date.now(), embeds: [{ title: `New Ticket: \`${ticketId}\``, description: `Ticket created by <@${userId}>.`, fields: [{ name: 'Description', value: 'legacy body' }, { name: 'Type', value: 'Generic' }] }], components: [{ components: [{ style: 5 }] }] };
    assert.equal(parseCard({ ...card, author: { id: userId } }, settings, botId), null);
    assert.equal(parseCard(card, settings, botId).description, 'legacy body');
    const store = new TicketStore(new Map(), key);
    const legacy = { indexes: [`ticket_${ticketId}`], get: () => ({ userId, joinedUserIds: [] }) };
    const client = { user: { id: botId }, channels: { fetch: async () => ({ guildId: base.guildId, isTextBased: () => true, messages: { fetch: async () => new Map([[messageId, card]]) } }) } };
    const run = apply => importLegacy({ client, legacy, store, settings, channels: ['a'], apply });
    await run(false); assert.equal(store.get(ticketId), null);
    await run(true); assert.equal(store.get(ticketId).description, 'legacy body');
    store.upsert({ threadId: ticketId, description: 'live value' });
    await run(true); assert.equal(store.get(ticketId).description, 'live value');
    assert.equal(store.all().length, 1);
});

test('filters and paging apply to the whole dataset', () => {
    const store = new TicketStore(new Map(), key);
    for (let i = 0; i < 30; i++) store.upsert({ ...base, threadId: String(BigInt(ticketId) + BigInt(i)), type: i % 2 ? 'Generic' : 'Payment', name: `ticket ${i}` });
    assert.equal(store.list({ type: 'Payment', pageSize: 5, page: 2 }).total, 15);
    assert.equal(store.list({ type: 'Payment', pageSize: 5, page: 2 }).tickets.length, 5);
    assert.equal(store.list({ q: 'ticket 29' }).total, 1);
});

test('server inventory discovers active and paginated private archives with no old database or cards', async () => {
    const settings = { guildId: base.guildId, ticketParentId: base.parentId };
    const now = Date.now();
    const activeId = '120000000000000020';
    const lockedId = '120000000000000021';
    const archivedId = '120000000000000022';
    let pages = 0;
    const thread = (id, archived, locked) => ({ id, type: 12, parent_id: base.parentId, name: `Generic: test (${userId})`, thread_metadata: { archived, locked, archive_timestamp: new Date(now).toISOString() } });
    const client = { user: { id: '120000000000000007' }, channels: { fetch: async () => ({ guildId: base.guildId, threads: { fetchActive: async () => ({ threads: new Map([[activeId, thread(activeId, false, false)]]) }) } }) }, rest: { get: async (_url, { query }) => {
        pages++;
        if (pages % 2) return { threads: [thread(lockedId, true, true)], has_more: true };
        assert(query.get('before'));
        return { threads: [thread(archivedId, true, false)], has_more: false };
    } } };
    const store = new TicketStore(new Map(), key);
    const report = await importLegacy({ client, legacy: { indexes: [] }, store, settings, channels: [], apply: true });
    assert.equal(pages, 2); assert.equal(report.errors, 0);
    assert.equal(report.activeThreads, 1); assert.equal(report.archivedThreads, 2);
    assert.deepEqual(store.counts(), { open: 1, closed: 1, locked: 1, deleted: 0 });
    assert.equal(store.get(activeId).openerId, userId);
});

test('partial legacy import reports bounded safe errors and does not mark completion', async () => {
    const badId = '120000000000000011';
    const goodId = '120000000000000012';
    const store = new TicketStore(new Map(), key);
    const legacy = { indexes: [`ticket_${badId}`, `ticket_${goodId}`], get: key => key.endsWith(badId) ? null : { userId } };
    const client = { user: { id: '120000000000000007' }, channels: { fetch: async () => { throw Object.assign(new Error('private response token'), { code: 50001, status: 403 }); } } };
    const channels = Array.from({ length: 25 }, (_, i) => String(120000000000000100n + BigInt(i)));
    const report = await importLegacy({ client, legacy, store, settings: { guildId: base.guildId, ticketParentId: base.parentId }, channels, apply: true });
    assert.equal(report.errors, 26); assert.equal(report.errorDetails.length, 20);
    assert.deepEqual(report.errorDetails[0], { stage: 'legacy-record', threadId: badId });
    assert.equal(report.errorDetails[1].code, 50001);
    assert.equal(report.errorDetails[1].status, 403);
    assert(!JSON.stringify(report.errorDetails).includes('private response token'));
    assert.equal(store.get(goodId).openerId, userId);
    assert.equal(store.read('meta:legacy-complete'), null);
});
