const test = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const path = require('node:path');
const { TicketStore } = require('../tickets');
const { TicketService } = require('../ticket-service');
const { createApp, sameToken } = require('../server');
const { loadSettings } = require('../settings');

const ids = { ticket: '120000000000000001', user: '120000000000000002', guild: '120000000000000004', parent: '120000000000000005', role: '120000000000000008' };
async function fixture(t, staticDir = '/nonexistent-test-fixture', debug) {
    const settings = { development: true, publicBaseUrl: 'http://127.0.0.1', guildId: ids.guild, ticketParentId: ids.parent, supportRoleId: ids.role, ownerId: '120000000000000009', sessionSecret: randomBytes(48).toString('hex'), clientId: 'test', clientSecret: 'test', messageContentApproved: false };
    let staff = true;
    const provider = async url => {
        if (url.endsWith('/oauth2/token')) return Response.json({ access_token: 'test-token', expires_in: 3600 });
        if (url.endsWith('/users/@me')) return Response.json({ id: ids.user, username: 'Synthetic staff' });
        return Response.json({ message: 'OAuth member lookup must not be used' }, { status: 429 });
    };
    const store = new TicketStore(new Map(), randomBytes(32).toString('base64'));
    store.upsert({ threadId: ids.ticket, guildId: ids.guild, parentId: ids.parent, openerId: ids.user, description: '<script>private</script>' });
    const guild = { id: ids.guild, members: { fetch: async ({ user, force }) => {
        assert.equal(force, true);
        return { id: user, roles: { cache: new Map(staff ? [[ids.role, {}]] : []) } };
    } } };
    const service = new TicketService({ guilds: { fetch: async () => guild } }, store, settings, { debug });
    const logs = [];
    const app = createApp({ service, settings, fetchImpl: provider, staticDir, logger: { warn: (...args) => logs.push(args) }, debug });
    const server = app.listen(0, '127.0.0.1');
    await new Promise((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
    settings.publicBaseUrl = `http://127.0.0.1:${server.address().port}`;
    t.after(async () => { service.stop(); app.locals.close(); await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }); });
    let cookie;
    async function request(route, options = {}) {
        const response = await fetch(`${settings.publicBaseUrl}${route}`, { ...options, redirect: 'manual', headers: { ...(cookie ? { Cookie: cookie } : {}), ...options.headers } });
        const setCookie = response.headers.getSetCookie();
        if (setCookie.length) cookie = setCookie.at(-1).split(';')[0];
        return response;
    }
    async function login() {
        const start = await request('/auth/discord');
        const state = new URL(start.headers.get('location')).searchParams.get('state');
        return request(`/auth/discord/callback?state=${state}&code=test`);
    }
    return { request, login, settings, store, service, app, guild, logs, cookie: () => cookie, revoke: () => { staff = false; } };
}

test('public privacy, staff OAuth, protected APIs, CSRF and disabled writes', async t => {
    const f = await fixture(t);
    assert.equal((await f.request('/api/tickets')).status, 401);
    assert.equal((await f.request('/api/privacy')).status, 200);
    assert.equal((await f.request('/auth/discord/callback?state=forged&code=x')).status, 400);
    assert.equal((await f.login()).status, 302);
    const session = await (await f.request('/api/session')).json();
    assert.equal(session.user.id, ids.user); assert.equal(session.capabilities.canReply, false);
    assert.equal((await f.request(`/api/mock/tickets/${ids.ticket}/messages`, { method: 'POST' })).status, 404);
    assert.equal((await f.request('/api/tickets?page=0')).status, 400);
    assert.equal((await f.request('/api/tickets?status[]=open')).status, 400);
    const list = await (await f.request('/api/tickets')).json();
    assert.equal(list.total, 1); assert.equal(list.tickets[0].threadId, ids.ticket);
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages`)).status, 409);
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/reply`, { method: 'POST' })).status, 403);
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/reply`, { method: 'POST', headers: { Origin: f.settings.publicBaseUrl, 'X-CSRF-Token': session.csrfToken } })).status, 409);
    assert.equal((await f.request('/auth/logout', { method: 'POST' })).status, 403);
    assert.equal((await f.request('/auth/logout', { method: 'POST', headers: { Origin: f.settings.publicBaseUrl, 'X-CSRF-Token': session.csrfToken } })).status, 204);
    assert.equal((await f.request('/api/tickets')).status, 401);
});

test('mock API registration is rejected outside development', () => {
    assert.throws(() => createApp({ settings: { development: false }, configureMockApi: () => {} }), /Mock APIs require development mode/);
});

test('detail and cached chat avoid global expiry scans while expired ticket access still fails closed', async t => {
    const f = await fixture(t); await f.login();
    Object.assign(f.settings, { messageContentApproved: true, webChatEnabled: true });
    const all = f.store.all.bind(f.store);
    f.store.all = () => assert.fail('Single-ticket requests must not scan the full archive');
    assert.equal((await f.request(`/api/tickets/${ids.ticket}`)).status, 200);
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages?cached=1&limit=20`)).status, 200);
    f.store.upsert({ threadId: ids.ticket, deletedAt: Date.now() - 31 * 86_400_000, statusChangedAt: Date.now() - 31 * 86_400_000 });
    f.store.now = () => Date.now() + 31 * 86_400_000;
    assert.equal((await f.request(`/api/tickets/${ids.ticket}`)).status, 404);
    assert.equal(f.store.get(ids.ticket), null);
    f.store.all = all;
    assert.equal((await f.request('/api/tickets')).status, 200);
});

test('list and detail serve stored requester avatars without profile requests', async t => {
    const f = await fixture(t); await f.login();
    const avatar = 'https://cdn.discordapp.com/avatars/120000000000000002/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.webp?size=128';
    f.store.upsert({ threadId: ids.ticket, openerAvatarUrl: avatar });
    f.service.client.users = { cache: new Map(), fetch: () => assert.fail('Ticket rendering must not fetch user profiles') };
    f.service.client.channels = { cache: new Map([[ids.parent, { name: 'support-tickets' }]]), fetch: () => assert.fail('Ticket rendering must not fetch parent channels') };
    const list = await (await f.request('/api/tickets')).json();
    const detail = await (await f.request(`/api/tickets/${ids.ticket}`)).json();
    assert.equal(list.tickets[0].openerAvatarUrl, avatar);
    assert.equal(detail.ticket.openerAvatarUrl, avatar);
    assert.equal(list.tickets[0].parentName, 'support-tickets');
    assert.equal(detail.ticket.parentName, 'support-tickets');
});

test('webhook reply API accepts only content and derives the staff actor from the protected session', async t => {
    const f = await fixture(t); await f.login();
    Object.assign(f.settings, { messageContentApproved: true, webChatEnabled: true, webRepliesEnabled: true });
    const session = await (await f.request('/api/session')).json();
    assert.equal(session.capabilities.canReply, true);
    assert.equal(session.capabilities.replyClientNonce, true);
    assert.equal(session.capabilities.mentionNames, true);
    const calls = [];
    f.service.reply = async (id, member, content) => { calls.push({ id, actor: member.id, content }); return '120000000000000099'; };
    const headers = { Origin: f.settings.publicBaseUrl, 'X-CSRF-Token': session.csrfToken, 'Content-Type': 'application/json' };
    const send = (body, extra = {}) => f.request(`/api/tickets/${ids.ticket}/reply`, { method: 'POST', headers: { ...headers, ...extra }, body: JSON.stringify(body) });
    for (const forged of [{ username: 'Another staff' }, { avatarURL: 'https://untrusted.invalid/a.png' }, { actorId: '120000000000000999' }, { webhookURL: 'https://untrusted.invalid' }, { threadId: '120000000000000999' }]) {
        assert.equal((await send({ content: 'Reply', ...forged })).status, 400);
    }
    assert.equal((await send({ content: 'Reply' }, { Origin: 'https://untrusted.invalid' })).status, 403);
    assert.equal((await send({ content: 'Reply' }, { 'X-CSRF-Token': 'wrong' })).status, 403);
    const response = await send({ content: 'Authenticated reply' });
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { messageId: '120000000000000099' });
    assert.deepEqual(calls, [{ id: ids.ticket, actor: session.user.id, content: 'Authenticated reply' }]);
    f.revoke();
    assert.equal((await send({ content: 'Revoked' })).status, 403);
    assert.equal(calls.length, 1);
});

test('staff can mark a ticket read only with the dashboard origin and CSRF token', async t => {
    const f = await fixture(t); await f.login();
    f.store.upsert({ threadId: ids.ticket, lastMessageAt: 100, lastMessageId: '120000000000000010' });
    const session = await (await f.request('/api/session')).json();
    const body = JSON.stringify({ messageAt: 100, messageId: '120000000000000010' });
    const headers = { 'Content-Type': 'application/json', Origin: f.settings.publicBaseUrl, 'X-CSRF-Token': session.csrfToken };
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/read`, { method: 'POST', headers: { ...headers, 'X-CSRF-Token': 'wrong' }, body })).status, 403);
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/read`, { method: 'POST', headers: { ...headers, Origin: 'https://elsewhere.example' }, body })).status, 403);
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/read`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: f.settings.publicBaseUrl }, body })).status, 403);
    const response = await f.request(`/api/tickets/${ids.ticket}/read`, { method: 'POST', headers, body });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.ticket.unread, false);
    assert.equal(result.ticket.teamReadAt, 100);
    f.revoke();
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/read`, { method: 'POST', headers, body })).status, 403);
});

test('distributed panel and its compiled assets are served without frontend tooling while ticket APIs remain protected', async t => {
    const f = await fixture(t, path.join(__dirname, '../web/dist'));
    const response = await f.request('/');
    assert.equal(response.status, 200);
    const html = await response.text();
    const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)];
    assert(assets.length >= 2);
    for (const [, asset] of assets) assert.equal((await f.request(asset)).status, 200, asset);
    assert.equal((await f.request('/privacy')).status, 200);
    assert.equal((await f.request('/api/tickets')).status, 401);
});

test('a non-staff identity is rejected at the OAuth callback', async t => {
    const f = await fixture(t); f.revoke();
    assert.equal((await f.login()).status, 403);
    assert.equal((await f.request('/api/session')).status, 401);
});

test('the configured owner has no dashboard access without the support role', async t => {
    const f = await fixture(t);
    f.settings.ownerId = ids.user;
    f.revoke();
    assert.equal((await f.login()).status, 403);
    assert.equal((await f.request('/api/session')).status, 401);
    assert.equal((await f.request('/api/tickets')).status, 401);
    assert.equal((await f.request('/api/events')).status, 401);
    assert.equal((await f.request('/api/privacy')).status, 200);
});

test('role revocation invalidates an existing session on its next protected request', async t => {
    const f = await fixture(t); await f.login(); f.revoke();
    assert.equal((await f.request('/api/tickets')).status, 403);
    assert.equal((await f.request('/api/session')).status, 401);
});

test('parallel protected requests share only the pending bot member lookup, never a stale role result', { timeout: 3000 }, async t => {
    const f = await fixture(t); await f.login();
    const original = f.guild.members.fetch;
    let calls = 0; let release; let started;
    const waiting = new Promise(resolve => { started = resolve; });
    const gate = new Promise(resolve => { release = resolve; });
    f.guild.members.fetch = async options => { calls++; started(); await gate; return original(options); };
    const requests = Promise.all(['/api/session', '/api/tickets', `/api/tickets/${ids.ticket}`].map(route => f.request(route)));
    await waiting;
    await new Promise(resolve => setTimeout(resolve, 40));
    try { assert.equal(calls, 1); } finally { release(); }
    assert((await requests).every(response => response.status === 200));
    const completedChecks = calls;
    f.revoke();
    assert.equal((await f.request('/api/tickets')).status, 403);
    assert.equal(calls, completedChecks + 1);
});

test('temporary bot membership failures deny access without losing the signed-in session', async t => {
    const f = await fixture(t); await f.login();
    const original = f.guild.members.fetch;
    f.guild.members.fetch = async () => { throw Object.assign(new Error('private response with secret-token'), { code: 50001, status: 403 }); };
    assert.equal((await f.request('/api/session')).status, 503);
    assert.equal(f.logs.at(-1)[1].code, 50001);
    assert(!JSON.stringify(f.logs).includes('secret-token'));
    f.guild.members.fetch = original;
    const session = await (await f.request('/api/session')).json();
    assert.equal(session.user.id, ids.user);
    f.guild.members.fetch = async () => { throw new Error('Discord temporarily unavailable'); };
    assert.equal((await f.request('/auth/logout', { method: 'POST', headers: { Origin: f.settings.publicBaseUrl, 'X-CSRF-Token': session.csrfToken } })).status, 204);
});

test('private-data erasure revokes the user persistent dashboard sessions', async t => {
    const f = await fixture(t); await f.login();
    f.store.deleteUser(ids.user);
    assert.equal((await f.request('/api/session')).status, 401);
});

test('persistent login survives app restart with no stored OAuth token or repeat consent', async t => {
    const f = await fixture(t);
    const login = await f.login();
    const cookieHeader = login.headers.getSetCookie().at(-1);
    assert(cookieHeader.includes('HttpOnly')); assert(cookieHeader.includes('SameSite=Lax'));
    const expires = Date.parse(cookieHeader.match(/Expires=([^;]+)/)[1]);
    assert(expires > Date.now() + 29 * 86_400_000);
    const sessionKeys = f.store.keys().filter(key => key.startsWith('session:'));
    const stored = sessionKeys.map(key => f.store.read(key)).find(row => row.data?.user);
    assert.equal(stored.data.user.id, ids.user);
    assert.equal(stored.data.accessToken, undefined);
    assert.equal(stored.data.refreshToken, undefined);
    f.app.locals.close();
    const restarted = createApp({ service: f.service, settings: f.settings, fetchImpl: async () => assert.fail('A remembered login must not call OAuth'), logger: { warn() {} } });
    const server = restarted.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    t.after(async () => { restarted.locals.close(); await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }); });
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/session`, { headers: { Cookie: f.cookie() } });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).user.id, ids.user);
    f.revoke();
    assert.equal((await fetch(`http://127.0.0.1:${server.address().port}/api/tickets`, { headers: { Cookie: f.cookie() } })).status, 403);
});

test('SSE sends a snapshot revision and is cleaned up when the client disconnects', async t => {
    const f = await fixture(t); await f.login();
    const controller = new AbortController();
    const response = await f.request('/api/events', { signal: controller.signal });
    try {
        assert.equal(response.status, 200);
        const reader = response.body.getReader();
        const data = new TextDecoder().decode((await reader.read()).value);
        assert(data.includes('event: tickets')); assert(data.includes('revision'));
        f.store.upsert({ threadId: ids.ticket, name: 'changed after subscription' });
        const next = await Promise.race([reader.read(), new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('Live event did not arrive')), 2000); timer.unref(); })]);
        assert.equal(next.done, false);
        assert(new TextDecoder().decode(next.value).includes('event: tickets'));
    } finally { controller.abort(); }
});

test('a temporary stream authorization failure closes the stream without signing the user out', { timeout: 3000 }, async t => {
    t.mock.timers.enable({ apis: ['setInterval'] });
    const f = await fixture(t); await f.login();
    const controller = new AbortController();
    const response = await f.request('/api/events', { signal: controller.signal });
    try {
        const reader = response.body.getReader();
        let output = new TextDecoder().decode((await reader.read()).value);
        const original = f.guild.members.fetch;
        f.guild.members.fetch = async () => { throw Object.assign(new Error('Temporary Discord outage'), { status: 503 }); };
        t.mock.timers.tick(15_000);
        while (true) {
            const item = await reader.read();
            if (item.done) break;
            output += new TextDecoder().decode(item.value);
        }
        assert(!output.includes('session-expired'));
        f.guild.members.fetch = original;
        assert.equal((await f.request('/api/session')).status, 200);
    } finally { controller.abort(); }
});

test('shutdown does not write to an ended SSE response when a permission check finishes late', { timeout: 3000 }, async t => {
    t.mock.timers.enable({ apis: ['setInterval'] });
    const f = await fixture(t); await f.login();
    const response = await f.request('/api/events');
    const reader = response.body.getReader();
    await reader.read();
    const member = await f.guild.members.fetch({ user: ids.user, force: true });
    let release; let entered; let endedWrites = 0;
    const checking = new Promise(resolve => { entered = resolve; });
    f.guild.members.fetch = () => { entered(); return new Promise(resolve => { release = resolve; }); };
    const prototype = require('node:http').ServerResponse.prototype;
    const write = prototype.write;
    t.mock.method(prototype, 'write', function (...args) {
        if (this.writableEnded) endedWrites++;
        return write.apply(this, args);
    });
    t.mock.timers.tick(15_000);
    await checking;
    f.app.locals.close();
    assert.equal((await reader.read()).done, true);
    release(member);
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(endedWrites, 0);
    assert.equal(f.service.listenerCount('tickets'), 0);
});

test('configuration rejects unsafe origins and cryptographic comparison handles unicode safely', () => {
    const config = { guild: ids.guild, channels: { tickets: ids.parent }, roles: { support_team: ids.role } };
    assert.throws(() => loadSettings({ PUBLIC_BASE_URL: 'http://public.example.com' }, config));
    assert.throws(() => loadSettings({ PUBLIC_BASE_URL: 'https://user:pass@example.com' }, config));
    assert.equal(sameToken('é', 'a'), false); assert.equal(sameToken('abc', 'abc'), true);
    assert.equal(loadSettings({}, config).port, 7777);
    assert.equal(loadSettings({ SUPPORT_TEAM_ROLE_ID: '784529945049038899' }, config).supportRoleId, '784529945049038899');
    assert.throws(() => loadSettings({ SUPPORT_TEAM_ROLE_ID: 'not-a-role' }, config));
    assert.equal(loadSettings({}, config).webChatEnabled, false);
    assert.equal(loadSettings({}, config).webRepliesEnabled, false);
    assert.throws(() => loadSettings({ WEB_REPLIES_ENABLED: 'yes' }, config));
    assert.throws(() => loadSettings({ WEB_CHAT_ENABLED: 'yes' }, config));
    assert.throws(() => loadSettings({ STATS_API_TOKEN: 'short' }, config));
    const reader = loadSettings({ DISCORD_READER_API_KEY: 'test-key' }, config);
    assert.equal(reader.discordReaderBaseUrl, 'https://ds-scrape-api.devs.beer');
    assert.equal(reader.discordReaderApiKey, 'test-key');
    assert.equal(reader.messageContentApproved, false);
    assert.equal('discordReaderUserId' in reader, false);
    assert.deepEqual(loadSettings({ DISCORD_READER_API_KEY: 'test-key', DISCORD_READER_USER_ID: ids.user }, config), reader);
    assert.equal(loadSettings({}, config).discordReaderApiKey, null);
    for (const base of ['http://reader.example', 'https://user:secret@reader.example', 'https://reader.example/path', 'https://reader.example?key=secret', 'invalid']) {
        assert.throws(() => loadSettings({ DISCORD_READER_BASE_URL: base }, config), /DISCORD_READER_BASE_URL/);
    }
    assert.throws(() => loadSettings({ DISCORD_READER_API_KEY: 'key\ninjected-header' }, config), /DISCORD_READER_API_KEY/);
    assert.equal(loadSettings({ NODE_ENV: 'development', DISCORD_READER_BASE_URL: 'http://127.0.0.1:3000' }, config).discordReaderBaseUrl, 'http://127.0.0.1:3000');
});

test('reader errors preserve staff sign-in, Retry-After and private backend credentials', async t => {
    const { DiscordReaderError } = require('../discord-reader');
    const f = await fixture(t); await f.login();
    f.settings.webChatEnabled = true;
    f.service.reader = { close() {} };
    let reads = 0;
    f.service.conversation = async () => { reads++; throw new DiscordReaderError(503, 'unauthorized', null, 'The reader service rejected its credentials.', 401); };
    const denied = await f.request(`/api/tickets/${ids.ticket}/messages`);
    assert.equal(denied.status, 503);
    assert.match((await denied.json()).error, /reader service/);
    assert.equal((await f.request('/api/session')).status, 200);
    f.service.conversation = async () => { throw new DiscordReaderError(429, 'queue_full', 60, 'The reader service is rate limited.', 429); };
    const limited = await f.request(`/api/tickets/${ids.ticket}/messages`);
    assert.equal(limited.status, 429); assert.equal(limited.headers.get('retry-after'), '60');
    const malformed = await f.request(`/api/tickets/${ids.ticket}/messages?before[]=${ids.ticket}`);
    assert.equal(malformed.status, 400); assert.equal(reads, 1);
    for (const before of ['0000000000000000', '18446744073709551616', '123456789012345678901']) assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages?before=${before}`)).status, 400);
    for (const query of ['limit=0', 'limit=51', 'limit=1.5', 'limit=20&limit=20', 'cached=0', 'cached[]=1', 'unknown=1']) {
        assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages?${query}`)).status, 400);
    }
    f.service.conversation = async (_id, options) => {
        assert.deepEqual(options, { before: undefined, limit: 20, cached: true });
        return { messages: [], nextBefore: null, available: true, cached: true };
    };
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages?limit=20&cached=1`)).status, 200);
    f.revoke();
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages`)).status, 403);
});

test('long reader response rechecks staff role and ticket exclusion before returning data', async t => {
    for (const action of ['role', 'exclude', 'logout']) {
        const f = await fixture(t); await f.login();
        const session = await (await f.request('/api/session')).json();
        f.settings.webChatEnabled = true; f.service.reader = { close() {} };
        let release;
        f.service.conversation = () => new Promise(resolve => { release = resolve; });
        const response = f.request(`/api/tickets/${ids.ticket}/messages`);
        while (!release) await new Promise(resolve => setImmediate(resolve));
        if (action === 'role') f.revoke();
        if (action === 'exclude') f.store.excludeUser(ids.user);
        if (action === 'logout') assert.equal((await f.request('/auth/logout', { method: 'POST', headers: { Origin: f.settings.publicBaseUrl, 'X-CSRF-Token': session.csrfToken } })).status, 204);
        release({ messages: [{ content: 'must not leak' }], nextBefore: null });
        const result = await response;
        assert.equal(result.status, action === 'role' ? 403 : action === 'exclude' ? 409 : 401);
        assert.equal(JSON.stringify(await result.json()).includes('must not leak'), false);
    }
});

test('statistics use a separate header-only Bearer token and never expose ticket data', async t => {
    const f = await fixture(t);
    assert.equal((await f.request('/api/stats')).status, 404);
    f.settings.statsApiToken = 'test-only-statistics-token-with-48-characters-long';
    assert.equal((await f.request('/api/stats')).status, 401);
    assert.equal((await f.request(`/api/stats?token=${f.settings.statsApiToken}`)).status, 401);
    assert.equal((await f.request('/api/stats', { headers: { Authorization: 'Bearer incorrect-but-long-enough-test-token' } })).status, 401);
    const headers = { Authorization: `Bearer ${f.settings.statsApiToken}` };
    const response = await f.request('/api/stats?interval=week', { headers });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.timezone, 'UTC'); assert.equal(result.interval, 'week');
    assert.equal(result.current.open, 1);
    assert(!JSON.stringify(result).includes(ids.ticket));
    assert(!JSON.stringify(result).includes(ids.user));
    assert(!JSON.stringify(result).includes('private'));
    assert.equal((await f.request('/api/tickets', { headers })).status, 401);
    assert.equal((await f.request('/api/stats?interval[]=day', { headers })).status, 400);
    assert.equal((await f.request('/api/stats?from=2026-02-30', { headers })).status, 400);
    await f.login();
    assert.equal((await f.request('/api/stats')).status, 401);
});

test('ticket cursor snapshots reject changed datasets and support owner filtering', async t => {
    const f = await fixture(t); await f.login();
    for (let i = 1; i <= 30; i++) f.store.upsert({ threadId: String(BigInt(ids.ticket) + 100n + BigInt(i)), guildId: ids.guild, parentId: ids.parent, openerId: ids.user, openerName: 'Synthetic owner' });
    const first = await (await f.request(`/api/tickets?opener=${ids.user}`)).json();
    assert.equal(first.tickets.length, 25); assert(first.nextCursor);
    const nextPath = `/api/tickets?opener=${ids.user}&cursor=${first.nextCursor}&revision=${first.revision}`;
    const next = await (await f.request(nextPath)).json();
    assert.equal(next.tickets.length, 6); assert.equal(next.nextCursor, null);
    assert.equal(new Set([...first.tickets, ...next.tickets].map(ticket => ticket.threadId)).size, 31);
    f.store.upsert({ threadId: ids.ticket, name: 'Live update' });
    assert.equal((await f.request(nextPath)).status, 409);
    assert.equal((await f.request('/api/tickets?opener[]=bad')).status, 400);
});

test('web chat requires both feature flags and respects ticket exclusions', async t => {
    const f = await fixture(t); await f.login();
    assert.equal(f.service.capabilities().canReadConversation, false);
    f.settings.webChatEnabled = true;
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages`)).status, 409);
    f.settings.messageContentApproved = true;
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages`)).status, 200);
    f.store.excludeUser(ids.user);
    assert.equal((await f.request(`/api/tickets/${ids.ticket}/messages`)).status, 409);
});

test('staff web actions enforce CSRF, fresh roles, scope and the fixed action allowlist', async t => {
    const f = await fixture(t); await f.login();
    const calls = [];
    const guild = f.guild;
    f.service.client.guilds = { fetch: async id => { assert.equal(id, ids.guild); return guild; } };
    f.service.action = async (...args) => { calls.push(args); f.store.upsert({ threadId: ids.ticket, archived: true }); };
    const session = await (await f.request('/api/session')).json();
    assert.equal(session.capabilities.canManageTicket, true);
    const route = `/api/tickets/${ids.ticket}/actions`;
    const headers = { 'Content-Type': 'application/json', Origin: f.settings.publicBaseUrl, 'X-CSRF-Token': session.csrfToken };
    const body = JSON.stringify({ action: 'close-lock', reason: 'Resolved' });
    assert.equal((await f.request(route, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })).status, 403);
    assert.equal((await f.request(route, { method: 'POST', body: JSON.stringify({ action: 'purge' }), headers })).status, 400);
    assert.equal((await f.request(route, { method: 'POST', body, headers })).status, 200);
    assert.equal(calls.length, 1); assert.equal(calls[0][1], 'close-lock'); assert.equal(calls[0][2].id, ids.user);
    assert.equal((await f.request('/api/tickets/120000000000000099/actions', { method: 'POST', body, headers })).status, 404);
    f.revoke();
    assert.equal((await f.request(route, { method: 'POST', body, headers })).status, 403);
    assert.equal(calls.length, 1);
});


test('chat timings correlate requests and accept only staff CSRF-protected numeric browser reports', async t => {
    const fs = require('node:fs/promises');
    const os = require('node:os');
    const { createChatDebug } = require('../utils/chat-debug');
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'chat-debug-http-'));
    t.after(() => fs.rm(directory, { recursive: true, force: true }));
    await fs.writeFile(path.join(directory, 'chat-debug.enabled'), '');
    const debug = createChatDebug({ directory });
    const f = await fixture(t, undefined, debug);
    const report = { viewId: 'bfb515a1-9011-4a35-8939-121299751877', readyMs: 125, firstDataMs: 90, moduleMs: 30,
        count: 1, cached: true, visible: true };
    assert.equal((await f.request('/api/debug/chat', { method: 'POST' })).status, 401);
    await f.login();
    const session = await (await f.request('/api/session')).json();
    assert.equal(session.capabilities.chatDebug, true);
    f.settings.webChatEnabled = true; f.settings.messageContentApproved = true;
    const response = await f.request(`/api/tickets/${ids.ticket}/messages?limit=20&cached=1`, { headers: { 'X-Chat-View': report.viewId } });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('x-chat-debug'), '1');
    const requestId = response.headers.get('x-chat-request-id');
    assert.match(requestId, /^[a-f0-9-]{36}$/);
    const send = body => f.request('/api/debug/chat', { method: 'POST', headers: { Origin: f.settings.publicBaseUrl,
        'Content-Type': 'application/json', 'X-CSRF-Token': session.csrfToken }, body: JSON.stringify(body) });
    assert.equal((await f.request('/api/debug/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(report) })).status, 403);
    for (const body of [{ ...report, readyMs: -1 }, { ...report, readyMs: 'slow' }, { ...report, viewId: 'private-name' },
        { ...report, moduleMs: null }, { ...report, count: 1.5 }, { ...report, content: 'secret-message' }]) assert.equal((await send(body)).status, 400);
    assert.equal((await send(report)).status, 204);
    await debug.flush();
    const raw = await fs.readFile(path.join(directory, 'chat-debug.ndjson'), 'utf8');
    const entries = raw.trim().split('\n').map(JSON.parse);
    const stages = entries.filter(entry => entry.requestId === requestId);
    assert(stages.some(entry => entry.event === 'http_start' && entry.op === 'messages' && entry.viewId === report.viewId));
    assert(stages.some(entry => entry.event === 'staff_auth'));
    assert(stages.some(entry => entry.event === 'staff_recheck'));
    assert(stages.some(entry => entry.event === 'snapshot' && entry.cached === true));
    assert(stages.some(entry => entry.event === 'http_end' && entry.status === 200));
    assert(entries.some(entry => entry.event === 'browser_ready' && entry.viewId === report.viewId && entry.readyMs === 125));
    assert(stages.some(entry => entry.ticketId === ids.ticket && entry.requestPath === `/api/tickets/${ids.ticket}/messages`));
    for (const sensitive of [ids.user, 'Synthetic staff', 'secret-message', 'test-token', session.csrfToken, '<script>private</script>']) assert(!raw.includes(sensitive), sensitive);
    await fs.unlink(path.join(directory, 'chat-debug.enabled'));
    assert.equal((await send(report)).status, 404);
    assert.equal((await (await f.request('/api/session')).json()).capabilities.chatDebug, undefined);
    await debug.flush();
});

test('reply correlation accepts UUID only and keeps sender identity server-derived', async t => {
    const f = await fixture(t); await f.login();
    Object.assign(f.settings, { messageContentApproved: true, webChatEnabled: true, webRepliesEnabled: true });
    const session = await (await f.request('/api/session')).json();
    const nonce = '550e8400-e29b-41d4-a716-446655440000'; const calls = [];
    f.service.reply = async (id, member, content, clientNonce) => { calls.push({ id, actor: member.id, content, clientNonce }); return '120000000000000099'; };
    const send = body => f.request(`/api/tickets/${ids.ticket}/reply`, { method: 'POST', headers: { Origin: f.settings.publicBaseUrl, 'X-CSRF-Token': session.csrfToken, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    for (const clientNonce of ['secret', null, 123, '550e8400-e29b-11d4-a716-446655440000']) assert.equal((await send({ content: 'Reply', clientNonce })).status, 400);
    assert.equal((await send({ content: 'Reply', clientNonce: nonce })).status, 201);
    assert.deepEqual(calls, [{ id: ids.ticket, actor: session.user.id, content: 'Reply', clientNonce: nonce }]);
});

test('deferred mention names require retained ticket/staff and are rechecked after lookup', async t => {
    const f = await fixture(t); const path = `/api/tickets/${ids.ticket}/mentions?users=${ids.user}`;
    assert.equal((await f.request(path)).status, 401); await f.login();
    Object.assign(f.settings, { messageContentApproved: true, webChatEnabled: true });
    let calls = 0;
    f.service.resolveMentions = async () => { calls++; return { users: { [ids.user]: 'Staff' }, roles: {} }; };
    for (const query of ['users=bad', `users=${Array(5).fill(ids.user).join(',')}`, `users=${ids.user}&users=${ids.user}`, `token=secret`]) assert.equal((await f.request(`/api/tickets/${ids.ticket}/mentions?${query}`)).status, 400);
    assert.equal((await f.request(path)).status, 200); assert.equal(calls, 1);
    f.service.resolveMentions = async () => { f.revoke(); return { users: { [ids.user]: 'Must not leak' }, roles: {} }; };
    assert.equal((await f.request(path)).status, 403);
});
