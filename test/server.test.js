const test = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const { TicketStore } = require('../tickets');
const { TicketService } = require('../ticket-service');
const { createApp, sameToken } = require('../server');
const { loadSettings } = require('../settings');

const ids = { ticket: '120000000000000001', user: '120000000000000002', guild: '120000000000000004', parent: '120000000000000005', role: '120000000000000008' };
async function fixture(t) {
    const settings = { development: true, publicBaseUrl: 'http://127.0.0.1', guildId: ids.guild, ticketParentId: ids.parent, supportRoleId: ids.role, ownerId: '120000000000000009', sessionSecret: randomBytes(48).toString('hex'), clientId: 'test', clientSecret: 'test', messageContentApproved: false };
    let staff = true;
    const provider = async url => {
        if (url.endsWith('/oauth2/token')) return Response.json({ access_token: 'test-token', expires_in: 3600 });
        if (url.endsWith('/users/@me')) return Response.json({ id: ids.user, username: 'Synthetic staff' });
        return Response.json({ user: { id: ids.user }, roles: staff ? [ids.role] : [] });
    };
    const store = new TicketStore(new Map(), randomBytes(32).toString('base64'));
    store.upsert({ threadId: ids.ticket, guildId: ids.guild, parentId: ids.parent, openerId: ids.user, description: '<script>private</script>' });
    const service = new TicketService({}, store, settings);
    const app = createApp({ service, settings, fetchImpl: provider, staticDir: '/nonexistent-test-fixture' });
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
    return { request, login, settings, store, service, app, revoke: () => { staff = false; } };
}

test('public privacy, staff OAuth, protected APIs, CSRF and disabled writes', async t => {
    const f = await fixture(t);
    assert.equal((await f.request('/api/tickets')).status, 401);
    assert.equal((await f.request('/api/privacy')).status, 200);
    assert.equal((await f.request('/auth/discord/callback?state=forged&code=x')).status, 400);
    assert.equal((await f.login()).status, 302);
    const session = await (await f.request('/api/session')).json();
    assert.equal(session.user.id, ids.user); assert.equal(session.capabilities.canReply, false);
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

test('a non-staff identity is rejected at the OAuth callback', async t => {
    const f = await fixture(t); f.revoke();
    assert.equal((await f.login()).status, 403);
    assert.equal((await f.request('/api/session')).status, 401);
});

test('role revocation invalidates an existing session after its bounded authorization cache', async t => {
    const f = await fixture(t); await f.login(); f.revoke();
    const realNow = Date.now;
    try {
        Date.now = () => realNow() + 16_000;
        assert.equal((await f.request('/api/tickets')).status, 403);
        assert.equal((await f.request('/api/session')).status, 401);
    } finally { Date.now = realNow; }
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

test('configuration rejects unsafe origins and cryptographic comparison handles unicode safely', () => {
    const config = { guild: ids.guild, channels: { tickets: ids.parent }, roles: { support_team: ids.role } };
    assert.throws(() => loadSettings({ PUBLIC_BASE_URL: 'http://public.example.com' }, config));
    assert.throws(() => loadSettings({ PUBLIC_BASE_URL: 'https://user:pass@example.com' }, config));
    assert.equal(sameToken('é', 'a'), false); assert.equal(sameToken('abc', 'abc'), true);
    assert.equal(loadSettings({}, config).port, 7777);
});
