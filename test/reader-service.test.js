const test = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Enmap = require('enmap');
const { TicketStore } = require('../tickets');
const { TicketService } = require('../ticket-service');
const { DiscordReader } = require('../discord-reader');
const { Collection, ChannelType } = require('discord.js');

const guild = '533407895010803753', thread = '1308807823349649459', parent = '1308807823349649458';
const author = '664565054083170314', base = 1563662533485658156n;
const id = offset => String(base + BigInt(offset));
const raw = offset => ({ id: id(offset), channel_id: thread, guild_id: guild,
    url: `https://discord.com/channels/${guild}/${thread}/${id(offset)}`, content: `message ${offset}`,
    timestamp: '2026-11-05T12:00:00Z', edited_timestamp: null, pinned: false,
    author: { id: author, username: 'requester', global_name: 'Requester', bot: false }, attachments: [], embeds: [], message_reference: null });
const page = (items, limit = 100) => ({ channel_id: thread, messages: items, pagination: { count: items.length, limit,
    next_before: items.length === limit ? items.at(-1).id : null, next_after: items.length === limit ? items[0].id : null } });
const batch = (newest, size) => Array.from({ length: size }, (_, index) => raw(newest - index));
const event = (offset, more = {}) => ({ id: id(offset), channelId: thread, guildId: guild, createdTimestamp: Date.parse(raw(offset).timestamp),
    author: { id: author, username: 'requester', bot: false }, system: false, partial: false, content: '', embeds: [], attachments: new Map(), ...more });
function fixture(t, provider, options = {}) {
    const calls = [];
    const reader = new DiscordReader({ baseUrl: 'https://reader.example', apiKey: 'test-key' }, { sleep: async () => {}, fetchImpl: async url => {
        const target = new URL(url); calls.push(target);
        return Response.json(await provider(target, calls.length));
    } });
    const store = new TicketStore(new Map(), randomBytes(32).toString('base64'), options);
    store.upsert({ threadId: thread, guildId: guild, parentId: parent, openerId: author });
    const settings = { guildId: guild, ticketParentId: parent, messageContentApproved: false, webChatEnabled: true, webRepliesEnabled: false };
    const service = new TicketService({}, store, settings, { reader, logger: { warn() {}, error() {} } });
    t.after(() => service.stop());
    return { service, store, settings, reader, calls };
}

test('reader works without Message Content; Gateway metadata alone never reads or stores content', async t => {
    const f = fixture(t, () => page([raw(1)]));
    assert.equal(f.service.capabilities().canReadConversation, true);
    assert.equal(f.settings.messageContentApproved, false);
    await f.service.handleMessage(event(1, { content: 'must not store this Gateway payload' }));
    assert.equal(f.calls.length, 0);
    assert.equal(f.store.get(thread).lastMessageId, id(1));
    assert.equal(f.store.messages(thread).length, 0);
    const [first, concurrent] = await Promise.all([f.service.conversation(thread), f.service.conversation(thread)]);
    assert.equal(f.calls.length, 1);
    assert.deepEqual(first, concurrent);
    assert.equal(first.messages[0].content, 'message 1');
    await f.service.handleMessage(event(1));
    assert.equal(f.store.message(thread, id(1)).content, 'message 1');
    await f.service.conversation(thread);
    assert.equal(f.calls.length, 1);
    assert.equal(f.service.conversationReads.size, 0);
});

test('history loads serial pages only as needed and does not skip old cached gaps', async t => {
    const f = fixture(t, target => target.searchParams.has('before') ? page(batch(-100, 20)) : page(batch(0, 100)));
    f.store.saveMessage(thread, { id: id(-500), authorId: author, content: 'old cache outside confirmed coverage' });
    const first = await f.service.conversation(thread);
    assert.equal(first.messages.length, 50); assert.equal(first.nextBefore, id(-49)); assert.equal(f.calls.length, 1);
    const second = await f.service.conversation(thread, { before: first.nextBefore });
    assert.equal(second.messages.length, 50); assert.equal(second.nextBefore, id(-99));
    assert.equal(f.calls.length, 2); // One lookahead proves whether a further local page exists.
    assert.equal(f.calls[1].searchParams.get('before'), id(-99));
    const third = await f.service.conversation(thread, { before: second.nextBefore });
    assert.equal(third.messages[0].id, id(-100));
    assert.equal(third.messages.filter(message => message.content.startsWith('message')).length, 20);
    assert.equal(third.nextBefore, null);
});

test('progressive pages fetch twenty messages without a lookahead and keep history contiguous', async t => {
    const f = fixture(t, target => {
        const before = target.searchParams.get('before');
        return page(before === id(-39) ? [] : batch(before ? -20 : 0, 20), 20);
    });
    const first = await f.service.conversation(thread, { limit: 20 });
    assert.equal(f.calls.length, 1); assert.equal(first.messages.length, 20);
    assert.equal(first.nextBefore, id(-19)); assert.equal(first.syncing, false);
    const older = await f.service.conversation(thread, { before: first.nextBefore, limit: 20 });
    assert.equal(f.calls.length, 2); assert.equal(older.messages.length, 20); assert.equal(older.nextBefore, id(-39));
    assert.equal(f.calls[1].searchParams.get('before'), id(-19));
    const end = await f.service.conversation(thread, { before: older.nextBefore, limit: 20 });
    assert.equal(f.calls.length, 3); assert.equal(end.nextBefore, null); assert.deepEqual(end.messages, []);
    assert(f.calls.every(call => call.searchParams.get('limit') === '20'));
});

test('saved conversation returns immediately during a blocked reader request and still enforces exclusions', async t => {
    let release;
    const f = fixture(t, () => new Promise(resolve => { release = resolve; }));
    f.store.saveMessage(thread, { id: id(1), authorId: author, content: 'previously saved' });
    const reading = f.service.conversation(thread, { limit: 20 });
    await new Promise(resolve => setImmediate(resolve));
    const saved = await f.service.conversation(thread, { limit: 20, cached: true });
    assert.equal(saved.messages[0].content, 'previously saved'); assert.equal(saved.cached, true); assert.equal(saved.syncing, true);
    assert.equal(f.calls.length, 1); assert.equal(f.store.read(`r:${f.store.index(thread)}`), null);
    release(page([raw(1)], 20)); await reading;
    f.store.excludeUser(author);
    await assert.rejects(f.service.conversation(thread, { limit: 20, cached: true }), error => error.status === 409);
});

test('progressive catch-up commits one next_after page per request, including an empty final page', async t => {
    const f = fixture(t, (target, count) => count === 1 ? page([raw(0)], 20)
        : target.searchParams.get('after') === id(0) ? page(batch(20, 20), 20) : page([], 20));
    await f.service.conversation(thread, { limit: 20 });
    await f.service.handleMessage(event(20));
    const partial = await f.service.conversation(thread, { limit: 20 });
    assert.equal(f.calls.length, 2); assert.equal(partial.syncing, true);
    assert.equal(f.store.read(`r:${f.store.index(thread)}`).newestId, id(20));
    const complete = await f.service.conversation(thread, { limit: 20 });
    assert.equal(f.calls.length, 3); assert.equal(complete.syncing, false);
    assert.deepEqual(f.calls.slice(1).map(call => call.searchParams.get('after')), [id(0), id(20)]);
});

test('progressive edited history refreshes one exact message at a time', async t => {
    const f = fixture(t, target => target.pathname === '/v1/message'
        ? { message: { ...raw(target.searchParams.get('url').endsWith(id(2)) ? 2 : 1), content: 'edited' } }
        : page([raw(2), raw(1)], 20));
    await f.service.conversation(thread, { limit: 20 });
    f.service.updatedMessage(event(2)); f.service.updatedMessage(event(1));
    const partial = await f.service.conversation(thread, { limit: 20 });
    assert.equal(f.calls.length, 2); assert.equal(partial.syncing, true);
    const complete = await f.service.conversation(thread, { limit: 20 });
    assert.equal(f.calls.length, 3); assert.equal(complete.syncing, false);
    assert(complete.messages.every(message => message.content === 'edited'));
});

test('historical messages obtain missing user avatars without changing webhook attribution', async t => {
    const avatar = 'https://cdn.discordapp.com/avatars/664565054083170314/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.webp?size=128';
    const item = { ...raw(2), author: { ...raw(2).author, avatar_url: avatar } };
    const f = fixture(t, () => page([item, raw(1)]));
    f.service.client.users = { cache: new Map(), fetch: async userId => {
        assert.fail('Message avatars must arrive with the reader response');
    } };
    f.store.saveMessage(thread, { id: id(1), authorId: author, staffAuthorId: author, webhookId: '664565054083170398',
        authorAvatarUrl: 'https://cdn.discordapp.com/avatars/664565054083170314/staff.png', content: 'staff reply' });
    const first = await f.service.conversation(thread);
    assert.equal(first.messages[0].authorAvatarUrl, avatar);
    assert.equal(first.messages[1].authorAvatarUrl, 'https://cdn.discordapp.com/avatars/664565054083170314/staff.png');
    await f.service.conversation(thread);
    assert.equal(f.store.get(thread).openerAvatarUrl, avatar);
});

test('reader retains rich embeds, attachment metadata and cached reply context', async t => {
    const message = { ...raw(2), message_reference: { channel_id: thread, message_id: id(1) },
        embeds: [{ title: 'Status', description: '**Ready**', url: 'https://example.com', color: 5793266,
            image: { url: 'https://cdn.discordapp.com/example.png' }, thumbnail: { url: 'https://cdn.discordapp.com/thumb.png' },
            author: { name: 'Support', icon_url: 'https://cdn.discordapp.com/icon.png' }, footer: { text: 'Updated' },
            fields: [{ name: 'Order', value: '1042', inline: true }] }],
        attachments: [{ filename: 'image', url: 'https://cdn.discordapp.com/attachment?format=webp', content_type: 'image/webp', size: 4000 }] };
    const f = fixture(t, () => page([message, raw(1)]));
    const result = await f.service.conversation(thread);
    const first = result.messages[0];
    assert.equal(first.embeds[0].image, message.embeds[0].image.url);
    assert.equal(first.embeds[0].thumbnail, message.embeds[0].thumbnail.url);
    assert.equal(first.embeds[0].author.iconUrl, message.embeds[0].author.icon_url);
    assert.equal(first.embeds[0].color, 5793266);
    assert.equal(first.embeds[0].fields[0].inline, true);
    assert.equal(first.embeds[0].footer.text, 'Updated');
    assert.equal(first.attachments[0].contentType, 'image/webp');
    assert.equal(first.attachments[0].size, 4000);
    assert.equal(first.replyTo.content, 'message 1');
    f.store.deleteMessage(thread, id(1));
    const updated = await f.service.conversation(thread);
    assert.equal(updated.messages[0].replyTo.content, 'Original message not loaded.');
});

test('old reader checkpoints refresh visible rich metadata once without importing all history', async t => {
    const item = { ...raw(1), embeds: [{ image: { url: 'https://cdn.discordapp.com/image.png' } }] };
    const f = fixture(t, () => page([item]));
    f.store.saveMessage(thread, { id: id(1), authorId: author, content: item.content, embeds: [] });
    const key = `r:${f.store.index(thread)}`;
    f.store.write(key, { newestId: id(1), before: null, complete: true });
    const result = await f.service.conversation(thread);
    assert.equal(f.calls.length, 1);
    assert.equal(f.calls[0].searchParams.has('after'), false);
    assert.equal(result.messages[0].embeds[0].image, item.embeds[0].image.url);
    assert.equal(f.store.read(key).format, 3);
    await f.service.conversation(thread);
    assert.equal(f.calls.length, 1);
});

test('incremental catch-up uses next_after, including the empty page after a full final page', async t => {
    const f = fixture(t, (target, count) => count === 1 ? page([raw(0)]) : target.searchParams.get('after') === id(0) ? page(batch(100, 100)) : page([]));
    await f.service.conversation(thread);
    await f.service.handleMessage(event(100));
    const result = await f.service.conversation(thread);
    assert.equal(result.messages[0].id, id(100));
    assert.deepEqual(f.calls.slice(1).map(call => call.searchParams.get('after')), [id(0), id(100)]);
    assert.equal(f.store.read(`r:${f.store.index(thread)}`).newestId, id(100));
    await f.service.conversation(thread); assert.equal(f.calls.length, 3);
});

test('cached edits are refreshed by exact ID on demand; reader markers are not returned', async t => {
    const edited = { ...raw(1), content: 'edited', edited_timestamp: '2026-11-05T12:01:00Z' };
    const f = fixture(t, target => target.pathname === '/v1/message' ? { message: edited } : page([raw(1)]));
    await f.service.conversation(thread);
    f.service.updatedMessage(event(1, { partial: true }));
    assert.equal(f.calls.length, 1);
    const result = await f.service.conversation(thread);
    assert.equal(result.messages[0].content, 'edited');
    assert.equal('readerDirty' in result.messages[0], false);
    assert.equal(f.calls[1].searchParams.get('url'), raw(1).url);
    await f.service.conversation(thread); assert.equal(f.calls.length, 2);
});

test('a 404 while refreshing an edited message remains an error rather than an empty history', async t => {
    const f = fixture(t, () => page([raw(1)]));
    await f.service.conversation(thread); f.service.updatedMessage(event(1));
    const { DiscordReaderError } = require('../discord-reader');
    f.reader.message = async () => { throw new DiscordReaderError(503, 'discord_not_found', null, 'The requested Discord resource was not found.', 404); };
    await assert.rejects(f.service.conversation(thread), error => error.readerStatus === 404);
    assert.equal(f.store.message(thread, id(1)).content, 'message 1');
    assert.equal(f.service.readerLoaded.has(thread), false);
});

test('delete tombstones prevent a late history response from resurrecting content or activity', async t => {
    let release;
    const f = fixture(t, () => new Promise(resolve => { release = resolve; }));
    const reading = f.service.conversation(thread);
    await new Promise(resolve => setImmediate(resolve));
    f.store.deleteMessage(thread, id(1));
    release(page([raw(1)]));
    assert.equal((await reading).messages.length, 0);
    assert.equal(f.store.get(thread).lastMessageId, null);
    assert.equal(f.store.message(thread, id(1)), null);
});

test('exclusion, purge and thread deletion during a request cannot restore data or checkpoints', async t => {
    for (const action of ['exclude', 'purge', 'deleted']) {
        let release, now = Date.now();
        const f = fixture(t, () => new Promise(resolve => { release = resolve; }), { now: () => now });
        const reading = f.service.conversation(thread);
        await new Promise(resolve => setImmediate(resolve));
        if (action === 'exclude') f.store.excludeUser(author);
        if (action === 'purge') f.store.purge(thread);
        if (action === 'deleted') { f.store.clearMessages(thread); f.store.upsert({ threadId: thread, deletedAt: now }); }
        release(page([raw(1)]));
        await assert.rejects(reading, error => [404, 409].includes(error.status));
        assert.equal(f.store.message(thread, id(1)), null, action);
        assert.equal(f.store.read(`r:${f.store.index(thread)}`), null, action);
    }
});

test('an excluded author discovered by the reader clears and excludes the entire conversation', async t => {
    const f = fixture(t, () => page([raw(1)]));
    f.store.upsert({ threadId: thread, openerId: '664565054083170315' });
    f.store.excludeUser(author);
    await assert.rejects(f.service.conversation(thread), error => error.status === 409);
    assert.equal(f.store.get(thread).contentExcluded, true);
    assert.equal(f.store.messages(thread).length, 0);
});

test('webhook staff attribution survives reader JSON without webhook metadata', async t => {
    const f = fixture(t, () => page([raw(1)]));
    const staffId = '664565054083170399';
    f.store.saveMessage(thread, { id: id(1), authorId: staffId, staffAuthorId: staffId, webhookId: '664565054083170398',
        authorName: 'Staff member', authorAvatarUrl: 'https://cdn.discordapp.com/example.png', content: 'original' });
    const result = await f.service.conversation(thread);
    assert.equal(result.messages[0].staffAuthorId, staffId);
    assert.equal(result.messages[0].authorId, staffId);
    assert.equal(result.messages[0].authorName, 'Staff member');
    assert.equal(result.messages[0].authorAvatarUrl, 'https://cdn.discordapp.com/example.png');
});

test('reader page persists twenty messages in one SQLite change event', async t => {
    const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'reader-batch-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    const db = new Enmap({ name: 'readerBatch', dataDir: dir, fetchAll: false, autoFetch: true });
    t.after(() => db.close());
    const store = new TicketStore(db, randomBytes(32).toString('base64'));
    store.upsert({ threadId: thread, guildId: guild, parentId: parent, openerId: author });
    const service = new TicketService({}, store, { guildId: guild, ticketParentId: parent, messageContentApproved: false, webChatEnabled: true },
        { reader: { close() {} }, logger: { warn() {}, error() {} } });
    t.after(() => service.stop());
    let changes = 0;
    store.on('change', () => changes++);
    const messages = batch(19, 20);
    await service.saveReaderPage(thread, messages);
    assert.equal(changes, 1);
    assert.equal(store.messages(thread).length, 20);
    assert.equal(store.message(thread, id(19)).content, 'message 19');
    assert.equal(store.message(thread, id(0)).content, 'message 0');
});

test('excluded reader author clears retained conversation before opening a batch', async t => {
    const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'reader-excluded-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    const db = new Enmap({ name: 'readerExcluded', dataDir: dir, fetchAll: false, autoFetch: true });
    t.after(() => db.close());
    const store = new TicketStore(db, randomBytes(32).toString('base64'));
    store.upsert({ threadId: thread, guildId: guild, parentId: parent, openerId: '664565054083170315' });
    store.saveMessage(thread, { id: id(0), authorId: author, content: 'retained private conversation' });
    store.excludeUser(author);
    const service = new TicketService({}, store, { guildId: guild, ticketParentId: parent, messageContentApproved: false, webChatEnabled: true },
        { reader: { close() {} }, logger: { warn() {}, error() {} } });
    t.after(() => service.stop());
    let batches = 0;
    const batchWrites = store.batchWrites.bind(store);
    store.batchWrites = work => { batches++; return batchWrites(work); };
    await assert.rejects(service.saveReaderPage(thread, [raw(1)]), error => error.status === 409);
    assert.equal(batches, 0);
    assert.equal(store.get(thread).contentExcluded, true);
    assert.deepEqual(store.messages(thread), []);
    assert.equal(store.message(thread, id(0)), null);
});

test('reader echo preserves the reply client nonce in saved attribution', async t => {
    const f = fixture(t, () => page([{ ...raw(1), author: { ...raw(1).author, id: '664565054083170399', bot: true }, webhook_id: '664565054083170398' }]));
    const nonce = '550e8400-e29b-41d4-a716-446655440000';
    f.store.saveMessage(thread, { id: id(1), authorId: '664565054083170399', staffAuthorId: '664565054083170399',
        webhookId: '664565054083170398', clientNonce: nonce, content: 'staff reply' });
    await f.service.conversation(thread);
    assert.equal(f.store.message(thread, id(1)).clientNonce, nonce);
});

test('reader checkpoint survives restart and catch-up starts after the saved ID', async t => {
    const f = fixture(t, () => page([raw(1)]));
    await f.service.conversation(thread);
    let after;
    const reader = { messages: async (_guild, _thread, query) => { after = query.after; return page([raw(2)]); }, close() {} };
    const second = new TicketService({}, f.store, f.settings, { reader }); t.after(() => second.stop());
    assert.equal((await second.conversation(thread)).messages[0].id, id(2));
    assert.equal(after, id(1));
});

test('a failed multi-page catch-up keeps its durable checkpoint and retries without gaps', async t => {
    const f = fixture(t, () => page([raw(0)]));
    await f.service.conversation(thread); await f.service.handleMessage(event(101));
    const after = []; let fail = true;
    f.reader.messages = async (_guild, _thread, query) => {
        after.push(query.after);
        if (query.after === id(0)) return page(batch(100, 100));
        if (fail) throw Object.assign(new Error('reader unavailable'), { status: 503 });
        return page([raw(101)]);
    };
    await assert.rejects(f.service.conversation(thread), error => error.status === 503);
    assert.equal(f.store.read(`r:${f.store.index(thread)}`).newestId, id(0));
    fail = false;
    assert.equal((await f.service.conversation(thread)).messages[0].id, id(101));
    assert.deepEqual(after, [id(0), id(100), id(0), id(100)]);
});

test('free-form embed and attachment metadata are normalized before reaching the renderer', async t => {
    const message = { ...raw(1), embeds: [{ title: {}, description: [], fields: 'invalid', toJSON: 'invalid' }], attachments: [{ filename: {}, url: { invalid: true } }, {}] };
    const f = fixture(t, () => page([message]));
    const result = await f.service.conversation(thread);
    assert.deepEqual(result.messages[0].embeds, [{ fields: [] }]);
    assert.equal(result.messages[0].attachments.length, 2);
    assert.deepEqual(result.messages[0].attachments, [{ name: 'Attachment', url: null }, { name: 'Attachment', url: null }]);
});

test('failed reader requests remain errors and shutdown aborts an active conversation read', async t => {
    const f = fixture(t, () => { throw new Error('raw private error'); });
    await assert.rejects(f.service.conversation(thread), error => error.status === 503 && !error.message.includes('private'));
    const reader = new DiscordReader({ baseUrl: 'https://reader.example', apiKey: 'test-key' }, { fetchImpl: async (_url, options) => new Promise((resolve, reject) => options.signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true })) });
    const second = new TicketService({}, f.store, f.settings, { reader });
    const reading = second.conversation(thread);
    await new Promise(resolve => setImmediate(resolve));
    const rejected = assert.rejects(reading, error => error.status === 503);
    await second.stop(); await rejected;
    assert.equal(second.conversationReads.size, 0);
    assert.equal(f.store.messages(thread).length, 0);
});

test('new tickets add only the requester; requester setup failure remains durable', async t => {
    for (const failRequester of [false, true]) {
        const f = fixture(t, () => assert.fail('Creating tickets must not fetch their conversation'));
        const readerId = '664565054083170399'; f.settings.discordReaderUserId = readerId;
        const additions = [];
        const created = { id: thread, guildId: guild, parentId: parent, type: ChannelType.PrivateThread,
            name: 'test', archived: false, locked: false, createdTimestamp: Date.now(),
            members: { add: async member => { additions.push(member); assert.equal(member, author); if (failRequester) throw Object.assign(new Error('cannot add requester'), { code: 50013 }); } },
            setRateLimitPerUser: async () => {}, send: async () => ({ id: id(1) }) };
        const interaction = { guildId: guild, channelId: parent, user: { id: author, username: 'requester' },
            channel: { threads: { fetchActive: async () => ({ threads: new Collection() }), create: async () => created } },
            member: { roles: { cache: new Collection() } }, guild: { channels: { cache: new Collection() } } };
        assert.equal(await f.service.create(interaction, 'Generic', 'A detailed synthetic support request containing enough information.'), created);
        assert.deepEqual(additions, [author]);
        assert.equal(f.store.get(thread).setupComplete, !failRequester);
        assert.equal(f.calls.length, 0);
    }
});

test('reader reads archived tickets without joining or reopening; explicit reopen does not change membership', async t => {
    const f = fixture(t, () => page([]));
    const readerId = '664565054083170399'; f.settings.discordReaderUserId = readerId;
    const current = { id: thread, guildId: guild, parentId: parent, type: ChannelType.PrivateThread, archived: true, locked: true,
        createdTimestamp: Date.now(), members: { add: async () => assert.fail('Reader must never be added to a ticket'), remove: async () => assert.fail('Existing members must remain unchanged') },
        edit: async change => { Object.assign(current, change); return current; } };
    f.service.recordThread(current);
    f.service.client.channels = { fetch: async () => assert.fail('Reader history needs no membership lookup through the bot') };
    assert.equal((await f.service.conversation(thread)).available, true);
    assert.equal(current.archived, true); assert.equal(current.locked, true);
    const role = '664565054083170398'; f.settings.supportRoleId = role;
    f.service.client.channels = { fetch: async () => current };
    await f.service.action(thread, 'reopen', { id: author, guild: { id: guild, members: { fetch: async () => ({ id: author, roles: { cache: new Map([[role, {}]]) } }) } } });
    assert.equal(current.archived, false); assert.equal(current.locked, false);
});

test('reconciliation never adds or removes the reader from existing tickets', async t => {
    const f = fixture(t, () => assert.fail('Reconciliation does not read content through the reader'));
    f.settings.discordReaderUserId = '664565054083170399';
    const current = { id: thread, guildId: guild, parentId: parent, type: ChannelType.PrivateThread, archived: false, locked: false,
        members: { add: async () => assert.fail('No reader invites'), remove: async () => assert.fail('No membership removals') },
        messages: { fetch: async () => new Collection() } };
    const channel = { id: parent, guildId: guild, threads: { fetchActive: async () => ({ threads: new Collection([[thread, current]]) }) },
        permissionsFor: () => ({ has: () => true }) };
    f.service.client.channels = { fetch: async id => id === parent ? channel : current };
    f.service.client.rest = { get: async () => ({ threads: [], has_more: false }) };
    await f.service.reconcile();
    assert.equal(f.service.sync.ready, true); assert.equal(f.service.sync.error, null);
});

test('reader access denial never triggers a fallback invite or an empty conversation', async t => {
    const f = fixture(t, () => assert.fail('Use the explicit denial below'));
    f.settings.discordReaderUserId = '664565054083170399';
    f.service.client.channels = { fetch: async () => assert.fail('No fallback invite or channel lookup') };
    const { DiscordReaderError } = require('../discord-reader');
    f.reader.messages = async () => { throw new DiscordReaderError(503, 'discord_access_denied', null, 'Discord denied access.', 403); };
    await assert.rejects(f.service.conversation(thread), error => error.readerStatus === 403);
    assert.equal(f.store.messages(thread).length, 0);
});


test('enabled timing preserves shared reader work and logs validated URLs without message text or credentials', async t => {
    const fs = require('node:fs/promises');
    const path = require('node:path');
    const os = require('node:os');
    const { createChatDebug } = require('../utils/chat-debug');
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'reader-debug-'));
    t.after(() => fs.rm(directory, { recursive: true, force: true }));
    await fs.writeFile(path.join(directory, 'chat-debug.enabled'), '');
    const debug = createChatDebug({ directory });
    const f = fixture(t, async () => { await new Promise(resolve => setImmediate(resolve)); return page([raw(1)]); });
    f.service.debug = debug; f.reader.debug = debug;
    const reads = await Promise.all([1, 2].map(() => debug.run({ op: 'messages' }, () => f.service.conversation(thread))));
    assert.equal(f.calls.length, 1); assert.deepEqual(reads[0], reads[1]);
    await debug.flush();
    const text = await fs.readFile(path.join(directory, 'chat-debug.ndjson'), 'utf8');
    const events = text.trim().split('\n').map(JSON.parse);
    for (const stage of ['ticket_queue', 'reader_queue', 'reader_response', 'persist', 'snapshot']) assert(events.some(event => event.event === stage), stage);
    assert.equal(new Set(events.filter(event => event.event === 'ticket_queue').map(event => event.requestId)).size, 2);
    assert(events.some(event => event.discordUrl === `https://discord.com/channels/${guild}/${thread}`));
    for (const secret of [author, 'message 1', 'test-key', 'reader.example']) assert(!text.includes(secret), secret);
    await debug.flush();
});

test('closed saved conversation remains readable after years without invoking the reader', async t => {
    let now = Date.now();
    const f = fixture(t, () => assert.fail('cached read must not call Discord'), { now: () => now });
    f.store.saveMessage(thread, { id: id(1), authorId: author, content: 'retained encrypted history', createdAt: now });
    f.store.upsert({ threadId: thread, archived: true, locked: true });
    now += 3650 * 86400000;
    f.store.expire();
    const result = await f.service.conversation(thread, { limit: 20, cached: true });
    assert.equal(result.messages[0].content, 'retained encrypted history');
    assert.equal(f.calls.length, 0);
});

test('mention snapshot resolves cached roles/users immediately and defers missing guild members', async t => {
    const f = fixture(t, () => assert.fail('cached snapshot must not use reader'));
    const role = '664565054083170377', mentioned = '664565054083170378', missing = '664565054083170379';
    let lookups = 0;
    const guildObject = { id: guild, roles: { cache: new Map([[role, { name: 'Support' }]]) }, members: { cache: new Map(), fetch: async ({ user }) => { lookups++; return { id: user, displayName: 'Resolved member' }; } } };
    f.service.client = { guilds: { cache: new Map([[guild, guildObject]]) }, users: { cache: new Map([[mentioned, { username: 'Cached member' }]]) } };
    f.store.saveMessage(thread, { id: id(1), authorId: author, content: `Hello <@&${role}> <@!${mentioned}> <@${missing}>`, createdAt: Date.now(), attachments: [], embeds: [] });
    const snapshot = await f.service.conversation(thread, { cached: true, limit: 20 });
    assert.equal(snapshot.mentions.roles[role], 'Support'); assert.equal(snapshot.mentions.users[mentioned], 'Cached member'); assert.equal(lookups, 0);
    const result = await f.service.resolveMentions(thread, { users: [missing], roles: [role] });
    assert.equal(result.users[missing], 'Resolved member'); assert.equal(result.roles[role], 'Support'); assert.equal(lookups, 1);
    await assert.rejects(f.service.resolveMentions(thread, { users: Array(5).fill(missing), roles: [] }), { status: 400 });
});

test('mention lookups share in-flight members and do not return names after exclusion', async t => {
    const f = fixture(t, () => page([])); const missing = '664565054083170379'; let release; let lookups = 0;
    const gate = new Promise(resolve => { release = resolve; });
    const guildObject = { id: guild, members: { cache: new Map(), fetch: async () => { lookups++; await gate; return { displayName: 'Hidden' }; } }, roles: { cache: new Map() } };
    f.service.client = { guilds: { cache: new Map([[guild, guildObject]]) } };
    const first = f.service.resolveMentions(thread, { users: [missing] }); const second = f.service.resolveMentions(thread, { users: [missing] });
    await new Promise(resolve => setImmediate(resolve)); assert.equal(lookups, 1);
    f.store.excludeUser(author); release();
    const results = await Promise.allSettled([first, second]); assert(results.every(result => result.status === 'rejected' && result.reason.status === 409));
});

test('a tombstoned message from an excluded author cannot erase unrelated retained content during batching', async t => {
    const f = fixture(t, () => page([])); const excluded = '664565054083170388';
    f.store.saveMessage(thread, { id: id(1), authorId: author, content: 'retained unrelated message' });
    f.store.deleteMessage(thread, id(2)); f.store.excludeUser(excluded);
    await f.service.saveReaderPage(thread, [{ ...raw(2), author: { id: excluded, username: 'Excluded' } }]);
    assert.equal(f.store.get(thread).contentExcluded, false);
    assert.equal(f.store.message(thread, id(1)).content, 'retained unrelated message');
    assert.equal(f.store.message(thread, id(2)), null);
});
