const test = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const { TicketStore, ticketStatus, publicTicket, DAY } = require('../tickets');
const { parseCard, importLegacy } = require('../legacy');

const ticketId = '120000000000000001';
const userId = '120000000000000002';
const messageId = '120000000000000003';
const key = randomBytes(32).toString('base64');
const base = { threadId: ticketId, guildId: '120000000000000004', parentId: '120000000000000005', openerId: userId, description: 'private description' };

test('cancelled legacy import neither applies a late scan nor marks import complete', async () => {
    const controller = new AbortController();
    let release;
    const page = new Promise(resolve => { release = resolve; });
    const store = new TicketStore(new Map(), key);
    const importing = importLegacy({ client: { user: { id: userId }, channels: { fetch: async () => page } },
        legacy: { indexes: [] }, store, settings: { guildId: base.guildId, ticketParentId: base.parentId },
        channels: [base.parentId], apply: true, signal: controller.signal });
    controller.abort();
    release({ guildId: base.guildId, isTextBased: () => true });
    await assert.rejects(importing, { name: 'AbortError' });
    assert.equal(store.read('meta:legacy-complete'), null);
    assert.deepEqual(store.all(), []);
});

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

test('closed and locked tickets retain their encrypted messages indefinitely; deletion still expires and cannot resurrect', () => {
    let now = 100 * DAY;
    const store = new TicketStore(new Map(), key, { now: () => now });
    assert.equal(ticketStatus({ archived: true, locked: true }), 'locked');
    store.upsert(base); assert.equal(store.counts().open, 1);
    store.saveMessage(ticketId, { id: messageId, authorId: userId, content: 'retained conversation' });
    now += DAY; store.upsert({ threadId: ticketId, archived: true });
    const closed = store.get(ticketId);
    assert.equal(closed.expiresAt, null);
    now += DAY; store.upsert({ threadId: ticketId, name: 'renamed' });
    assert.equal(store.get(ticketId).statusChangedAt, closed.statusChangedAt);
    assert.equal(store.get(ticketId).expiresAt, closed.expiresAt);
    store.upsert({ threadId: ticketId, locked: true });
    assert.equal(store.get(ticketId).expiresAt, closed.expiresAt);
    store.upsert({ threadId: ticketId, locked: false });
    store.upsert({ threadId: ticketId, archived: false });
    assert.equal(store.get(ticketId).expiresAt, null);
    store.upsert({ threadId: ticketId, locked: true }); assert.equal(store.counts().locked, 1);
    now += 3650 * DAY; assert.equal(store.expire(), 0);
    assert.equal(store.message(ticketId, messageId).content, 'retained conversation');
    store.clearMessages(ticketId); store.upsert({ threadId: ticketId, deletedAt: now, description: null });
    const deleted = store.get(ticketId);
    assert.equal(deleted.expiresAt, now + 30 * DAY);
    assert.equal(store.messages(ticketId).length, 0);
    now += DAY; store.upsert({ threadId: ticketId, name: 'deleted metadata update' });
    assert.equal(store.get(ticketId).expiresAt, deleted.expiresAt);
    now += 30 * DAY; assert.equal(store.expire(), 1); assert.equal(store.get(ticketId), null);
    assert.equal(store.upsert(base, { imported: true }), null);
    assert.equal(store.upsert(base), null);
});

test('scoped expiry checks one ticket without scanning the archive and still purges an expired ticket', () => {
    let now = 100 * DAY;
    const store = new TicketStore(new Map(), key, { now: () => now });
    store.upsert(base);
    const deletedId = '120000000000000006';
    store.upsert({ ...base, threadId: deletedId, deletedAt: now });
    store.deleteMessage(ticketId, messageId);
    now += 31 * DAY;
    const all = store.all.bind(store);
    const keys = store.keys.bind(store);
    store.all = () => assert.fail('A scoped check must not decrypt the whole archive');
    store.keys = () => assert.fail('A retained ticket check must not enumerate archive keys');
    assert.equal(store.expire(ticketId), 0);
    assert.equal(store.expire('120000000000000999'), 0);
    store.keys = keys;
    assert.equal(store.expire(deletedId), 1);
    assert.equal(store.get(deletedId), null);
    assert.equal(store.upsert({ ...base, threadId: deletedId }), null);
    assert.equal(store.messageDeleted(ticketId, messageId), true, 'Only global maintenance removes old tombstones');
    store.all = all;
    assert.equal(store.expire(), 0);
    assert.equal(store.messageDeleted(ticketId, messageId), false);
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

test('public ticket resolves legacy opener names only for matching IDs without mutating stored data', () => {
    const ticket = { ...base, name: `Generic: Legacy Name (${userId})` };
    assert.equal(publicTicket(ticket).openerName, 'Legacy Name');
    assert.equal(publicTicket({ ...ticket, name: 'Generic: Legacy Name (bad)' }).openerName, null);
    assert.equal(publicTicket({ ...ticket, name: `Payment: Legacy Name (${messageId})` }).openerName, null);
    assert.equal(publicTicket({ ...base, openerName: userId }).openerName, null);
    assert.equal(publicTicket({ ...ticket, openerId: null }).openerName, 'Legacy Name');
    assert.equal(publicTicket({ ...ticket, openerName: 'Saved Name' }).openerName, 'Saved Name');
    assert.equal(publicTicket({ ...ticket, openerName: userId }).openerName, 'Legacy Name');
    assert.deepEqual(ticket, { ...base, name: `Generic: Legacy Name (${userId})` });
});

test('cached Discord identity and avatar take precedence over saved ticket data', () => {
    const ticket = { ...base, openerName: 'Old Name', openerAvatarUrl: 'old-avatar' };
    const user = { globalName: 'Discord Name', username: 'username', displayAvatarURL: options => { assert.deepEqual(options, { extension: 'png', size: 64 }); return 'avatar-url'; } };
    assert.deepEqual(publicTicket(ticket, user), { ...ticket, openerName: 'Discord Name', openerAvatarUrl: 'avatar-url', discordUrl: `https://discord.com/channels/${base.guildId}/${ticketId}`, recordedParticipantsOnly: true, unread: false });
    assert.equal(publicTicket(ticket, { username: 'Fallback' }).openerName, 'Fallback');
    assert.equal(publicTicket(ticket).openerAvatarUrl, 'old-avatar');
    assert.equal(publicTicket(base).openerAvatarUrl, null);
});

test('owner lookup uses exact IDs or mentions, and escalation sorting works across cursor pages', () => {
    const store = new TicketStore(new Map(), key);
    for (let i = 0; i < 35; i++) store.upsert({ ...base, threadId: String(BigInt(ticketId) + BigInt(i)), openerName: i % 2 ? 'Alice' : 'Bob' });
    store.upsert({ threadId: ticketId, escalatedAt: Date.now() });
    const first = store.list({ opener: `<@${userId}>`, sort: 'priority', pageSize: 10 });
    assert.equal(first.tickets[0].threadId, ticketId);
    const next = store.list({ opener: userId, sort: 'priority', pageSize: 10, cursor: first.nextCursor });
    assert.equal(new Set([...first.tickets, ...next.tickets].map(item => item.threadId)).size, 20);
    assert.equal(store.list({ opener: 'ALICE' }).total, 17);
    assert.equal(store.list({ opener: '120000000000000099' }).total, 0);
});

test('latest-message ordering ignores import and staff updates and keeps unknown dates last', () => {
    let now = 100 * DAY;
    const store = new TicketStore(new Map(), key, { now: () => now });
    const older = ticketId;
    const newer = '120000000000000009';
    const unknown = '120000000000000099';
    store.upsert({ ...base, threadId: newer, createdAt: 10, lastMessageAt: 200 });
    now++;
    store.upsert({ ...base, threadId: older, createdAt: 20, lastMessageAt: 100 });
    now++;
    store.upsert({ ...base, threadId: unknown, createdAt: 30 });
    now++;
    store.upsert({ threadId: older, name: 'Renamed by staff', escalatedAt: now });
    assert.deepEqual(store.list({ sort: 'updated' }).tickets.map(ticket => ticket.threadId), [newer, older, unknown]);
    assert.deepEqual(store.list({ sort: 'created' }).tickets.map(ticket => ticket.threadId), [unknown, older, newer]);
    assert.deepEqual(store.list({ sort: 'priority' }).tickets.map(ticket => ticket.threadId), [older, newer, unknown]);
    store.upsert({ threadId: older, lastMessageAt: 300 });
    assert.equal(store.list().tickets[0].threadId, older);
    assert.equal(store.get(unknown).lastMessageAt, null);
});

test('shared read watermark advances safely and leaves later messages unread', () => {
    const store = new TicketStore(new Map(), key);
    store.upsert({ ...base, lastMessageAt: 100, lastMessageId: '120000000000000010' });
    store.upsert({ ...base, threadId: '120000000000000009', lastMessageAt: 100, lastMessageId: '120000000000000008' });
    assert.equal(publicTicket(store.get(ticketId)).unread, true);
    store.markRead(ticketId, { messageAt: 100, messageId: '120000000000000010' });
    assert.equal(store.get(ticketId).teamReadAt, 100);
    assert.equal(publicTicket(store.get(ticketId)).unread, false);
    store.upsert({ threadId: ticketId, lastMessageAt: 101, lastMessageId: '120000000000000011' });
    assert.equal(publicTicket(store.get(ticketId)).unread, true);
    store.markRead(ticketId, { messageAt: 100, messageId: '120000000000000010' });
    assert.equal(publicTicket(store.get(ticketId)).unread, true);
    assert.equal(store.get(ticketId).teamReadAt, 100);
    assert.equal(store.get(ticketId).lastMessageAt, 101);
    assert.equal(store.list().tickets[0].threadId, ticketId);
});

test('same-time messages use message IDs and invalid or future read positions are rejected', () => {
    const store = new TicketStore(new Map(), key);
    store.upsert({ ...base, lastMessageAt: 100, lastMessageId: '120000000000000011' });
    store.markRead(ticketId, { messageAt: 100, messageId: '120000000000000010' });
    assert.equal(publicTicket(store.get(ticketId)).unread, true);
    store.markRead(ticketId, { messageAt: 100, messageId: '120000000000000011' });
    assert.equal(publicTicket(store.get(ticketId)).unread, false);
    assert.throws(() => store.markRead(ticketId, { messageAt: 0 }), { status: 400 });
    assert.throws(() => store.markRead(ticketId, { messageAt: 100, messageId: 'bad' }), { status: 400 });
    assert.throws(() => store.markRead(ticketId, { messageAt: 101 }), { status: 409 });
    assert.throws(() => store.markRead(ticketId, { messageAt: 100, messageId: '120000000000000012' }), { status: 409 });
    assert.equal(publicTicket({ lastMessageAt: null }).unread, false);
    store.upsert({ ...base, lastMessageAt: 101, lastMessageId: '10000000000000000' });
    store.markRead(ticketId, { messageAt: 101, messageId: '9999999999999999' });
    assert.equal(publicTicket(store.get(ticketId)).unread, true);
    store.markRead(ticketId, { messageAt: 101, messageId: '10000000000000000' });
    assert.equal(publicTicket(store.get(ticketId)).unread, false);
});

test('observed aggregate metrics are idempotent, encrypted, persistent and survive ticket retention', () => {
    let now = Date.UTC(2026, 10, 4, 12);
    const database = new Map();
    const store = new TicketStore(database, key, { now: () => now });
    const input = { ...base, createdAt: now };
    store.upsert(input); store.upsert(input);
    store.upsert({ ...base, threadId: '120000000000000099', createdAt: now - 100 * DAY, archived: true }, { imported: true });
    store.upsert({ threadId: ticketId, archived: true, locked: true });
    store.upsert({ threadId: ticketId, archived: false, locked: false });
    store.upsert({ threadId: ticketId, escalatedAt: now });
    store.upsert({ threadId: ticketId, deletedAt: now });
    const expected = { opened: 1, discovered: 1, closed: 1, locked: 1, reopened: 1, deleted: 1, escalated: 1 };
    assert.deepEqual(store.statistics.query().totals, expected);
    const restarted = new TicketStore(database, key, { now: () => now });
    assert.deepEqual(restarted.statistics.query().totals, expected);
    assert(!JSON.stringify([...database]).includes('opened'));
    now += 31 * DAY; restarted.expire();
    assert.equal(restarted.get(ticketId), null);
    const historic = restarted.statistics.query({ from: '2026-11-04', to: '2026-11-04' });
    assert.deepEqual(historic.totals, expected);
    assert(!JSON.stringify(historic).includes(userId));
    assert(!JSON.stringify(historic).includes(ticketId));
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

test('startup clears legacy expiry on retained closed tickets before expiry checks, without restoring purged data', () => {
    let now = 100 * DAY;
    const database = new Map();
    const old = new TicketStore(database, key, { now: () => now });
    old.upsert({ ...base, archived: true });
    old.saveMessage(ticketId, { id: messageId, authorId: userId, content: 'old encrypted conversation' });
    old.write(`t:${old.index(ticketId)}`, { ...old.get(ticketId), expiresAt: now + 30 * DAY });
    const purgedId = '120000000000000099';
    old.upsert({ ...base, threadId: purgedId }); old.purge(purgedId);
    now += 365 * DAY;
    const restarted = new TicketStore(database, key, { now: () => now });
    assert.equal(restarted.get(ticketId).expiresAt, null);
    assert.equal(restarted.expire(), 0);
    assert.equal(restarted.message(ticketId, messageId).content, 'old encrypted conversation');
    assert.equal(restarted.get(purgedId), null);
    assert.equal(restarted.upsert({ ...base, threadId: purgedId }, { imported: true }), null);
    const revision = restarted.revision;
    assert.equal(new TicketStore(database, key, { now: () => now }).revision, revision, 'migration is idempotent');
    assert(!JSON.stringify([...database]).includes('old encrypted conversation'));
});
