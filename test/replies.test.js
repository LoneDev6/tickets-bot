const test = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const { Collection, ChannelType, WebhookType } = require('discord.js');
const { TicketStore } = require('../tickets');
const { TicketService } = require('../ticket-service');

const ids = { ticket: '120000000000000001', staff: '120000000000000002', guild: '120000000000000004', parent: '120000000000000005', bot: '120000000000000007', role: '120000000000000008', hook: '120000000000000009' };
function fixture(t) {
    const settings = { guildId: ids.guild, ticketParentId: ids.parent, supportRoleId: ids.role, messageContentApproved: true, webChatEnabled: true, webRepliesEnabled: true };
    const store = new TicketStore(new Map(), randomBytes(32).toString('base64'));
    const sent = []; const hooks = new Collection(); const threads = new Map();
    let service; let sequence = 120000000000001000n;
    const guild = { id: ids.guild, members: { fetch: async ({ user, force }) => { assert.equal(force, true); return { id: user, guild, displayName: 'Alice on this server', user: { username: 'alice', globalName: 'Alice Global' }, displayAvatarURL: () => 'https://cdn.discordapp.com/avatars/120000000000000002/server-avatar.png', roles: { cache: new Collection([[ids.role, {}]]) } }; } } };
    const makeThread = id => {
        const thread = { id, guildId: ids.guild, parentId: ids.parent, type: ChannelType.PrivateThread, archived: false, locked: false, permissionsFor: () => ({ has: () => true }), send: () => { throw new Error('Must not fall back to a bot message.'); } };
        threads.set(id, thread); store.upsert({ threadId: id, guildId: ids.guild, parentId: ids.parent }); return thread;
    };
    const thread = makeThread(ids.ticket);
    const hook = { id: ids.hook, guildId: ids.guild, channelId: ids.parent, owner: { id: ids.bot }, type: WebhookType.Incoming, name: 'Ticket staff replies', token: 'synthetic-secret', send: async payload => {
        sent.push(payload);
        const message = { id: String(sequence++), channelId: payload.threadId, guildId: ids.guild, webhookId: hook.id, author: { id: hook.id, username: payload.username, bot: true, displayAvatarURL: () => payload.avatarURL }, content: payload.content, createdTimestamp: Date.now(), editedTimestamp: null, partial: false, system: false, embeds: [], attachments: new Collection() };
        if (hook.beforeReturn) await hook.beforeReturn(message);
        hook.lastMessage = message;
        return message;
    } };
    let creates = 0;
    const parent = { id: ids.parent, guildId: ids.guild, type: ChannelType.GuildText, permissionsFor: () => ({ has: () => true }), fetchWebhooks: async () => hooks, createWebhook: async () => { creates++; hooks.set(hook.id, hook); return hook; } };
    const client = { user: { id: ids.bot }, channels: { fetch: async id => id === ids.parent ? parent : threads.get(id) } };
    const logs = [];
    service = new TicketService(client, store, settings, { logger: { warn: (...args) => logs.push(args) } });
    service.scheduleSummary = () => {};
    t.after(() => service.stop());
    return { service, store, settings, thread, parent, hook, hooks, sent, guild, member: { id: ids.staff, guild }, makeThread, creates: () => creates, logs };
}

test('staff replies use an owned parent webhook, authenticated server name/avatar and only the target private thread', async t => {
    const f = fixture(t);
    const id = await f.service.reply(ids.ticket, f.member, '  Hello @everyone <@120000000000000099>  ');
    assert.equal(f.creates(), 1);
    assert.deepEqual(f.sent[0], { content: 'Hello @everyone <@120000000000000099>', username: 'Alice on this server', avatarURL: 'https://cdn.discordapp.com/avatars/120000000000000002/server-avatar.png', threadId: ids.ticket, allowedMentions: { parse: [], repliedUser: false } });
    const archived = f.store.message(ids.ticket, id);
    assert.equal(archived.authorId, ids.staff); assert.equal(archived.staffAuthorId, ids.staff);
    assert.equal(archived.authorName, f.sent[0].username); assert.equal(archived.authorAvatarUrl, f.sent[0].avatarURL);
    assert.equal(archived.webhookId, ids.hook); assert.equal(archived.bot, true);
    assert.equal(f.store.get(ids.ticket).lastAction.actorId, ids.staff);
    assert.equal(f.store.get(ids.ticket).lastHumanMessageAuthorId, ids.staff);
    assert(!JSON.stringify(archived).includes('synthetic-secret'));
    await f.service.reply(ids.ticket, f.member, 'Second reply');
    assert.equal(f.creates(), 1);
});

test('webhook attribution survives Gateway/backfill echoes and a newer edit arriving before the send response', async t => {
    const f = fixture(t);
    const nonce = '550e8400-e29b-41d4-a716-446655440000';
    f.hook.beforeReturn = message => f.service.handleMessage({ ...message, content: 'Newer edit', editedTimestamp: message.createdTimestamp + 100 });
    const id = await f.service.reply(ids.ticket, f.member, 'Original', nonce);
    assert.equal(f.store.message(ids.ticket, id).content, 'Newer edit');
    assert.equal(f.store.message(ids.ticket, id).authorId, ids.staff);
    assert.equal(f.store.message(ids.ticket, id).clientNonce, nonce);
    await f.service.handleMessage({ ...f.hook.lastMessage, content: 'Gateway edit', editedTimestamp: Date.now() + 500 });
    assert.equal(f.store.message(ids.ticket, id).content, 'Gateway edit');
    assert.equal(f.store.message(ids.ticket, id).authorId, ids.staff);
    assert.equal(f.store.message(ids.ticket, id).clientNonce, nonce);
    assert.equal(f.store.get(ids.ticket).lastMessageAuthorName, 'Alice on this server');
    const otherTicket = '120000000000000010'; f.makeThread(otherTicket);
    const untrusted = { ...f.hook.lastMessage, id: '120000000000002000', channelId: otherTicket };
    await f.service.handleMessage(untrusted);
    assert.equal(f.store.message(otherTicket, untrusted.id).staffAuthorId, undefined);
    assert.equal(f.store.message(otherTicket, untrusted.id).authorId, ids.hook);
    f.store.deleteUser(ids.staff);
    await f.service.handleMessage(f.hook.lastMessage);
    assert.deepEqual(f.store.messages(ids.ticket), []);
    assert.equal(f.store.get(ids.ticket).lastAction.actorId, null);
    assert.equal(f.store.get(ids.ticket).lastMessageAuthorName, null);
});

test('reply gates, fresh staff authorization, ticket state, scope and bot permissions fail before posting', async t => {
    const f = fixture(t);
    for (const flag of ['messageContentApproved', 'webChatEnabled', 'webRepliesEnabled']) {
        f.settings[flag] = false;
        assert.equal(f.service.capabilities().canReply, false);
        await assert.rejects(f.service.reply(ids.ticket, f.member, 'No'), { status: 409 });
        f.settings[flag] = true;
    }
    await assert.rejects(f.service.reply(ids.ticket, f.member, ' '), { status: 400 });
    await assert.rejects(f.service.reply(ids.ticket, f.member, 'x'.repeat(2001)), { status: 400 });
    const fetchMember = f.guild.members.fetch;
    f.guild.members.fetch = async () => ({ id: ids.staff, roles: { cache: new Collection() } });
    await assert.rejects(f.service.reply(ids.ticket, f.member, 'No role'), { status: 403 });
    f.guild.members.fetch = fetchMember;
    for (const state of ['archived', 'locked']) {
        f.thread[state] = true;
        await assert.rejects(f.service.reply(ids.ticket, f.member, 'Closed'), { status: 409 });
        f.thread[state] = false;
    }
    f.thread.type = ChannelType.PublicThread;
    await assert.rejects(f.service.reply(ids.ticket, f.member, 'Wrong scope'), /configured private/);
    f.thread.type = ChannelType.PrivateThread;
    f.parent.permissionsFor = () => ({ has: () => false });
    await assert.rejects(f.service.reply(ids.ticket, f.member, 'No webhook permission'), { status: 409 });
    assert.equal(f.creates(), 0); assert.equal(f.sent.length, 0);
});

test('parallel replies share webhook creation; concurrent actions are blocked and failures never fall back', async t => {
    const f = fixture(t);
    const second = '120000000000000010'; f.makeThread(second);
    await Promise.all([f.service.reply(ids.ticket, f.member, 'One'), f.service.reply(second, f.member, 'Two')]);
    assert.equal(f.creates(), 1);
    let release;
    const gate = new Promise(resolve => { release = resolve; });
    f.hook.beforeReturn = () => gate;
    const pending = f.service.reply(ids.ticket, f.member, 'Pending');
    await assert.rejects(f.service.reply(ids.ticket, f.member, 'Duplicate'), { status: 409 });
    await assert.rejects(f.service.action(ids.ticket, 'close', f.member), { status: 409 });
    release(); await pending;
    f.hook.send = async () => { throw Object.assign(new Error('token-sensitive Discord response'), { code: 50001, status: 403 }); };
    await assert.rejects(f.service.reply(ids.ticket, f.member, 'Discord denies'), { status: 503 });
    assert(!JSON.stringify(f.logs).includes('token-sensitive'));
    assert.equal(f.service.busyTickets.size, 0);
});

test('foreign webhooks are not reused and a ticket closed during lookup is never auto-reopened', async t => {
    const f = fixture(t);
    f.hooks.set('foreign', { ...f.hook, id: '120000000000000090', owner: { id: '120000000000000099' } });
    await f.service.reply(ids.ticket, f.member, 'Uses own webhook');
    assert.equal(f.creates(), 1);
    f.parent.fetchWebhooks = async () => { f.thread.archived = true; return f.hooks; };
    await assert.rejects(f.service.reply(ids.ticket, f.member, 'Closed during lookup'), { status: 409 });
    assert.equal(f.sent.length, 1);
});
