const test = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const { Collection, ChannelType } = require('discord.js');
const { TicketStore } = require('../tickets');
const { TicketService } = require('../ticket-service');

const ids = { ticket: '120000000000000001', user: '120000000000000002', guild: '120000000000000004', parent: '120000000000000005', bot: '120000000000000007', role: '120000000000000008' };
const settings = { guildId: ids.guild, ticketParentId: ids.parent, supportRoleId: ids.role, ownerId: ids.user, messageContentApproved: false };
const quiet = { error() {}, warn() {} };
function setup(client = {}) {
    const store = new TicketStore(new Map(), randomBytes(32).toString('base64'));
    const service = new TicketService(client, store, settings, { logger: quiet });
    return { store, service };
}
function thread() { return { id: ids.ticket, guildId: ids.guild, parentId: ids.parent, name: 'test', type: ChannelType.PrivateThread, createdTimestamp: Date.now(), archived: false, locked: false }; }

test('stopping reconciliation ignores a late inventory response and schedules no more Discord work', async () => {
    let release; let reads = 0;
    const pending = new Promise(resolve => { release = resolve; });
    const parent = { guildId: ids.guild, threads: { fetchActive: () => pending } };
    const { store, service } = setup({ channels: { fetch: async () => { reads++; return parent; } } });
    const syncing = service.reconcile();
    await new Promise(resolve => setImmediate(resolve));
    service.stop();
    release({ threads: new Collection([[ids.ticket, thread()]]) });
    await syncing;
    assert.equal(store.get(ids.ticket), null);
    assert.equal(reads, 1);
    assert.equal(service.reconciling, false);
    assert.equal(service.summaryTimer, null);
});

test('a failed setup preserves the created ticket; concurrent duplicate creation is rejected', async () => {
    const { store, service } = setup();
    let release;
    const active = new Promise(resolve => { release = resolve; });
    const created = { ...thread(), members: { add: async () => { throw new Error('Permission error'); } } };
    const interaction = { guildId: ids.guild, channelId: ids.parent, user: { id: ids.user, username: 'test' }, channel: { threads: { fetchActive: () => active, create: async () => created } } };
    const creating = service.create(interaction, 'Generic', 'A'.repeat(1500));
    await assert.rejects(service.create(interaction, 'Generic', 'A'.repeat(1500)), /already being created/);
    release({ threads: new Collection() });
    assert.equal(await creating, created);
    assert.equal(store.get(ids.ticket).description.length, 1500);
    assert.equal(store.get(ids.ticket).setupComplete, false);
    assert.equal(store.counts().open, 1);
    await assert.rejects(service.create(interaction, 'Generic', 'A'.repeat(3501)), /between/);
});

test('message metadata works without privileged content; bot messages are distinct from human replies', async () => {
    const { store, service } = setup(); service.recordThread(thread());
    const message = (id, bot = false) => ({ id, channelId: ids.ticket, guildId: ids.guild, createdTimestamp: Date.now(), author: { id: bot ? ids.bot : ids.user, username: 'test', bot }, content: 'must not be stored', system: false, embeds: [], attachments: new Collection() });
    await service.handleMessage(message('120000000000000099', true));
    await service.handleMessage(message('120000000000000050'));
    assert.equal(store.get(ids.ticket).lastMessageAuthorId, ids.bot);
    assert.equal(store.get(ids.ticket).lastHumanMessageAuthorId, ids.user);
    assert.deepEqual(store.messages(ids.ticket), []);
    service.stop();
});

test('staff escalation notifies only the owner once; close and lock is one Discord operation', async t => {
    const edits = []; const notices = []; const members = [];
    const current = { ...thread(), members: { add: async id => members.push(id) }, send: async payload => notices.push(payload),
        edit: async update => { edits.push(update); Object.assign(current, update); return current; } };
    const { service, store } = setup({ channels: { fetch: async () => current } });
    t.after(() => service.stop());
    store.upsert({ ...thread(), threadId: ids.ticket });
    const guild = { id: ids.guild, members: { fetch: async ({ user }) => ({ id: user, roles: { cache: new Collection(user === ids.role ? [[ids.role, {}]] : []) } }) } };
    const staff = { id: ids.role, guild };
    assert.equal(await service.staff({ id: settings.ownerId, guild }), false);
    await assert.rejects(service.action(ids.ticket, 'escalate', { id: '120000000000000099', guild }), /not authorized/);
    await service.action(ids.ticket, 'escalate', staff, 'Needs owner review');
    await service.action(ids.ticket, 'escalate', staff);
    assert.equal(notices.length, 1); assert.deepEqual(members, [ids.user]);
    assert.deepEqual(notices[0].allowedMentions, { parse: [], users: [ids.user] });
    assert.equal(store.get(ids.ticket).escalatedBy, staff.id);
    assert.equal(store.statistics.query().totals.escalated, 1);
    await service.action(ids.ticket, 'close-lock', staff, 'Resolved');
    assert.equal(notices.length, 2);
    assert.equal(notices[1].embeds[0].data.title, 'Ticket Locked');
    assert.match(notices[1].embeds[0].data.description, /Reason: Resolved/);
    assert.deepEqual(edits, [{ archived: true, locked: true }]);
    assert.equal(store.get(ids.ticket).status, 'locked');
    assert.equal(store.get(ids.ticket).escalatedAt, null);
    await assert.rejects(service.action(ids.ticket, 'escalate', staff), /Reopen/);
    await service.action(ids.ticket, 'reopen', staff);
    await service.action(ids.ticket, 'escalate', staff);
    await service.action(ids.ticket, 'resolve-escalation', staff);
    assert.equal(store.get(ids.ticket).escalatedAt, null);
    assert.equal(store.statistics.query().totals.closed, 1);
    assert.equal(store.statistics.query().totals.locked, 1);
    assert.equal(store.statistics.query().totals.reopened, 1);
    await assert.rejects(service.action(ids.ticket, 'close', staff, 'x'.repeat(501)), /Invalid action reason/);
    let release;
    const authorization = new Promise(resolve => { release = resolve; });
    guild.members.fetch = () => authorization;
    const closing = service.action(ids.ticket, 'close', staff);
    try { await assert.rejects(service.action(ids.ticket, 'reopen', staff), error => error.status === 409); }
    finally { release({ id: staff.id, roles: { cache: new Collection([[ids.role, {}]]) } }); }
    await closing;
});

test('closure notices precede archiving, preserve the reason and never ping mentioned users', async t => {
    const calls = [];
    const current = { ...thread(),
        send: async payload => { calls.push(['send', payload]); },
        edit: async change => { calls.push(['edit', change]); Object.assign(current, change); return current; },
    };
    const { service, store } = setup({ channels: { fetch: async () => current } });
    t.after(() => service.stop());
    const guild = { id: ids.guild, members: { fetch: async () => ({ id: ids.user, roles: { cache: new Collection([[ids.role, {}]]) } }) } };
    const staff = { id: ids.user, guild };
    const reason = '  Duplicate @everyone <@120000000000000099>  ';
    for (const action of ['close', 'lock', 'close-lock']) {
        Object.assign(current, { archived: false, locked: false });
        store.upsert({ ...current, threadId: ids.ticket });
        calls.length = 0;
        await service.action(ids.ticket, action, staff, reason);
        assert.deepEqual(calls.map(([name]) => name), ['send', 'edit']);
        const notice = calls[0][1];
        const locked = action !== 'close';
        assert.equal(notice.embeds[0].data.title, locked ? 'Ticket Locked' : 'Ticket Closed');
        assert.equal(notice.embeds[0].data.description, `This thread has been ${locked ? 'locked' : 'closed'} by <@${staff.id}>.\nReason: ${reason.trim()}`);
        assert.deepEqual(notice.allowedMentions, { parse: [] });
        assert.equal(notice.components[0].toJSON().components[0].custom_id, 'ticket_panel_reopen_thread');
        assert.equal(store.get(ids.ticket).status, locked ? 'locked' : 'closed');
        assert.equal(store.get(ids.ticket).lastAction.reason, reason);
        calls.length = 0;
        await service.action(ids.ticket, action, staff, reason);
        assert.deepEqual(calls.map(([name]) => name), ['edit'], 'already closed tickets must not be reopened to send another notice');
    }
    Object.assign(current, { archived: false, locked: false });
    calls.length = 0;
    await service.action(ids.ticket, 'close', staff);
    assert.match(calls[0][1].embeds[0].data.description, /Reason: No reason\.$/);

    Object.assign(current, { archived: false, locked: false });
    store.upsert({ ...current, threadId: ids.ticket });
    calls.length = 0;
    guild.members.fetch = async () => ({ id: ids.user, roles: { cache: new Collection() } });
    await assert.rejects(service.action(ids.ticket, 'lock', staff, 'Unauthorized'), { status: 403 });
    assert.deepEqual(calls, []);
    guild.members.fetch = async () => ({ id: ids.user, roles: { cache: new Collection([[ids.role, {}]]) } });
    current.send = async () => { throw new Error('Cannot send closure notice'); };
    await assert.rejects(service.action(ids.ticket, 'close', staff, 'Solved'), /Cannot send closure notice/);
    assert.deepEqual(calls, []);
    assert.equal(store.get(ids.ticket).status, 'open');
    assert.equal(service.busyTickets.size, 0);
});

test('403 errors keep existing tickets and do not prevent later records from reconciling', async () => {
    let later = false;
    const t = thread();
    const parent = { guildId: ids.guild, id: ids.parent, threads: { fetchActive: async () => ({ threads: new Collection() }) }, permissionsFor: () => ({ has: () => true }) };
    const client = { user: { id: ids.bot }, channels: { fetch: async id => {
        if (id === ids.parent) return parent;
        if (id === ids.ticket) throw Object.assign(new Error('Denied'), { code: 50001 });
        later = true; return { ...t, id, messages: { fetch: async () => new Collection() } };
    } }, rest: { get: async () => ({ threads: [], has_more: false }) } };
    const { store, service } = setup(client);
    store.upsert({ ...t, threadId: t.id }); store.upsert({ ...t, threadId: '120000000000000010' });
    await service.reconcile();
    assert.equal(store.get(ids.ticket).status, 'open'); assert(later); assert.equal(service.sync.ready, false);
    service.stop();
});

test('reconcile logs bounded safe failures and a later clean pass clears the sync error', async () => {
    const logs = [];
    let denied = true;
    const parent = { guildId: ids.guild, id: ids.parent, threads: { fetchActive: async () => ({ threads: new Collection() }) }, permissionsFor: () => ({ has: () => false }) };
    const client = { user: { id: ids.bot }, channels: { fetch: async id => {
        if (id === ids.parent) return parent;
        if (denied) throw Object.assign(new Error('private response payload'), { code: 50001 });
        return { ...thread(), id, messages: { fetch: async () => new Collection() } };
    } }, rest: { get: async () => ({ threads: [], has_more: false }) } };
    const store = new TicketStore(new Map(), randomBytes(32).toString('base64'));
    const service = new TicketService(client, store, settings, { logger: { error: (...args) => logs.push(args), warn() {} } });
    store.upsert({ ...thread(), threadId: ids.ticket });
    service.legacyIncomplete = true;
    await service.reconcile();
    const [message, detail] = logs.at(-1);
    assert.equal(message, 'Ticket reconciliation failed.');
    assert.equal(detail.legacyIncomplete, true);
    assert.equal(detail.failures[0].code, 50001);
    assert.equal(detail.failures[0].threadId, ids.ticket);
    assert(!JSON.stringify(detail).includes('private response payload'));
    assert.equal(store.get(ids.ticket).status, 'open');
    service.legacyIncomplete = false; denied = false;
    await service.reconcile();
    assert.equal(service.sync.ready, true);
    assert.equal(service.sync.error, null);
    service.stop();
});

test('summary updates recover an existing message and never duplicate it', async () => {
    let sends = 0; let edits = 0;
    const url = 'https://tickets.example.com';
    const message = { id: '120000000000000030', author: { id: ids.bot }, content: 'Open tickets: **0**', components: [{ components: [{ url }] }], edit: async payload => { edits++; message.content = payload.content; } };
    const channel = { guildId: ids.guild, isTextBased: () => true, messages: { fetch: async value => typeof value === 'string' ? message : new Collection([[message.id, message]]) }, send: async () => { sends++; return message; } };
    const client = { user: { id: ids.bot }, channels: { fetch: async () => channel } };
    const { service, store } = setup(client);
    service.settings = { ...settings, publicBaseUrl: url };
    service.sync.ready = true;
    store.upsert({ ...thread(), threadId: ids.ticket });
    await Promise.all([service.updateSummary(), service.updateSummary()]);
    assert.equal(sends, 0); assert.equal(edits, 1); assert.equal(store.read('meta:summary-id'), message.id);
    await service.updateSummary(); assert.equal(edits, 1);
    service.stop();
});

test('simulated Discord lifecycle imports old tickets, creates and manages a ticket, updates one summary and honors deletion', async t => {
    const { importLegacy } = require('../legacy');
    const staffId = '120000000000000020';
    const newId = '120000000000000900';
    const summaryId = '120000000000000030';
    const threads = new Collection();
    const summaries = new Collection();
    const calls = { created: 0, summarySends: 0, summaryEdits: 0 };
    let nextMessage = 120000000000001000n;
    function fakeThread(id, archived = false, name = 'Old private ticket') {
        const messages = new Collection();
        const members = new Set();
        return { ...thread(), id, name, archived, archiveTimestamp: Date.now(),
            members: { add: async userId => members.add(userId) },
            setRateLimitPerUser: async () => {},
            edit: async function (change) { Object.assign(this, change); return this; },
            setName: async function (value) { this.name = value; return this; },
            send: async payload => {
                const message = { id: String(nextMessage++), ...payload };
                messages.set(message.id, message); return message;
            },
            messages: { fetch: async () => new Collection() },
        };
    }
    threads.set(ids.ticket, fakeThread(ids.ticket, true));
    const parent = { id: ids.parent, guildId: ids.guild,
        permissionsFor: () => ({ has: () => true }),
        threads: {
            fetchActive: async () => ({ threads: threads.filter(value => !value.archived) }),
            create: async options => {
                calls.created++;
                const created = fakeThread(newId, false, options.name);
                threads.set(newId, created); return created;
            },
        },
    };
    const summary = { guildId: ids.guild, isTextBased: () => true,
        messages: { fetch: async value => typeof value === 'string' ? summaries.get(value) : summaries },
        send: async payload => {
            calls.summarySends++;
            const message = { id: summaryId, author: { id: ids.bot }, content: payload.content,
                components: payload.components.map(row => row.toJSON()),
                edit: async next => { calls.summaryEdits++; message.content = next.content; message.components = next.components.map(row => row.toJSON()); },
            };
            summaries.set(message.id, message); return message;
        },
    };
    const client = { user: { id: ids.bot }, channels: { fetch: async id => {
        const value = id === ids.parent ? parent : id === summaryId ? summary : threads.get(id);
        if (!value) throw Object.assign(new Error('Unknown channel'), { code: 10003 });
        return value;
    } }, rest: { get: async () => ({ threads: [...threads.values()].filter(value => value.archived).map(value => ({
        id: value.id, name: value.name, type: value.type, parent_id: ids.parent,
        thread_metadata: { archived: value.archived, locked: value.locked, archive_timestamp: new Date(value.archiveTimestamp).toISOString() },
    })), has_more: false }) } };
    const { store, service } = setup(client);
    t.after(() => service.stop());
    service.settings = { ...settings, ownerId: '120000000000000099', publicBaseUrl: 'https://tickets.example.com', summaryChannelId: summaryId };
    const legacy = { indexes: [] };
    const report = await importLegacy({ client, legacy, store, settings: service.settings, channels: [], apply: true });
    assert.equal(report.archivedThreads, 1);
    assert.equal(store.get(ids.ticket).status, 'closed');
    await service.reconcile();
    assert.equal(service.sync.ready, true);
    await service.updateSummary();
    assert.equal(summaries.get(summaryId).content, 'Open tickets: **0**');

    const guild = { id: ids.guild, channels: { cache: new Collection() }, members: { fetch: async ({ user }) => ({ id: user, roles: { cache: new Collection(user === staffId ? [[ids.role, {}]] : []) } }) } };
    const member = id => ({ id, guild, roles: { cache: new Collection() } });
    const interaction = { guildId: ids.guild, channelId: ids.parent, channel: parent, guild, member: member(ids.user), user: { id: ids.user, username: 'Synthetic requester' } };
    await service.create(interaction, 'Generic', 'Synthetic support request with enough detail for validation.');
    assert.equal(store.get(newId).setupComplete, true);
    await assert.rejects(service.create(interaction, 'Generic', 'Synthetic duplicate request with enough detail for validation.'), /already have an open ticket/);
    assert.equal(calls.created, 1);
    await service.join(newId, member(staffId));
    assert.deepEqual(store.get(newId).joinedUserIds, [staffId]);
    await assert.rejects(service.action(newId, 'lock', member(ids.user)), /not authorized/);
    await service.updateSummary();
    assert.equal(summaries.get(summaryId).content, 'Open tickets: **1**');

    for (const [action, expected] of [['close', 'closed'], ['reopen', 'open'], ['lock', 'locked'], ['reopen', 'open']]) {
        await service.action(newId, action, member(staffId), 'Synthetic staff action');
        assert.equal(store.get(newId).status, expected);
        await service.updateSummary();
        assert.equal(summaries.get(summaryId).content, `Open tickets: **${expected === 'open' ? 1 : 0}**`);
    }
    assert.equal(calls.summarySends, 1);
    assert.equal(calls.summaryEdits, 5);
    const message = { id: String(nextMessage++), channelId: newId, guildId: ids.guild, createdTimestamp: Date.now(),
        author: { id: ids.user, username: 'Synthetic requester', bot: false }, content: 'Synthetic conversation content', embeds: [], attachments: new Collection() };
    await service.handleMessage(message);
    assert.deepEqual(store.messages(newId), []);
    // Simulate approval only in this in-memory fixture; no real intent or client is started.
    service.settings.messageContentApproved = true;
    await service.handleMessage(message);
    assert.equal(store.messages(newId)[0].content, message.content);
    await service.handleMessage({ ...message, content: 'Synthetic edit', editedTimestamp: Date.now() });
    assert.equal(store.messages(newId)[0].content, 'Synthetic edit');
    await service.deletedMessage(newId, message.id);
    assert.deepEqual(store.messages(newId), []);
    store.excludeUser(ids.user);
    await service.handleMessage({ ...message, id: String(nextMessage++) });
    assert.deepEqual(store.messages(newId), []);
    assert.equal(store.get(newId).contentExcluded, true);
    store.deleteUser(ids.user);
    await service.reconcile();
    await importLegacy({ client, legacy, store, settings: service.settings, channels: [], apply: true });
    assert.equal(store.get(newId), null);
    assert.equal(store.counts().open, 0);
    await service.updateSummary();
    assert.equal(calls.summarySends, 1);
    assert.equal(summaries.get(summaryId).content, 'Open tickets: **0**');
});
