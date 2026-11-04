// Synthetic local fixture only; this module is never imported by the bot.
if (process.env.NODE_ENV !== 'development') throw new Error('UI fixture requires NODE_ENV=development.');
const { randomBytes } = require('node:crypto');
const { TicketStore } = require('../tickets');
const { TicketService } = require('../ticket-service');
const { createApp } = require('../server');
const { Collection, ChannelType } = require('discord.js');
const ids = { guild: '120000000000000004', parent: '120000000000000005', user: '120000000000000002', role: '120000000000000008' };
const settings = { development: true, publicBaseUrl: 'http://127.0.0.1', guildId: ids.guild, ticketParentId: ids.parent, supportRoleId: ids.role, ownerId: ids.user, sessionSecret: randomBytes(48).toString('hex'), clientId: 'synthetic', clientSecret: 'synthetic', messageContentApproved: false };
const store = new TicketStore(new Map(), randomBytes(32).toString('base64'));
for (let index = 0; index < 32; index++) store.upsert({
    threadId: String(120000000000000100n + BigInt(index)), guildId: ids.guild, parentId: ids.parent,
    name: `[Synthetic data] ${index % 2 ? 'Payment' : 'Generic'}: Ticket ${index + 1}`,
    openerId: ids.user, openerName: 'Test requester', type: index % 2 ? 'Payment' : 'Generic',
    description: 'Synthetic support request for testing the list, search, details and actions. No real ticket data is loaded.',
    createdAt: Date.now() - index * 3_600_000, archived: index > 25, locked: index > 28,
    deletedAt: index === 31 ? Date.now() : null,
});
const guild = { id: ids.guild, members: { fetch: async ({ user }) => ({ id: user, roles: { cache: new Collection([[ids.role, {}]]) } }) } };
const client = { guilds: { fetch: async () => guild }, channels: { fetch: async id => {
    const ticket = store.get(id);
    if (!ticket) throw Object.assign(new Error('Unknown synthetic ticket'), { code: 10003 });
    const thread = { ...ticket, id, type: ChannelType.PrivateThread, members: { add: async () => {} }, send: async () => ({ id: '120000000000000999' }) };
    thread.edit = async update => Object.assign(thread, update);
    return thread;
} } };
if (process.env.UI_FIXTURE_CHAT === 'true') {
    settings.messageContentApproved = true; settings.webChatEnabled = true;
    store.saveMessage('120000000000000100', { id: '120000000000001000', authorId: ids.user, authorName: 'Test requester', content: 'Synthetic conversation message. No real Discord data.', createdAt: Date.now(), editedAt: null, attachments: [] });
}
const service = new TicketService(client, store, settings);
service.sync = { ready: true, updatedAt: Date.now(), error: null };
const provider = async url => url.endsWith('/oauth2/token') ? Response.json({ access_token: 'fixture', expires_in: 3600 }) : url.endsWith('/users/@me') ? Response.json({ id: ids.user, username: 'Synthetic staff' }) : Response.json({ user: { id: ids.user }, roles: [ids.role] });
const app = createApp({ service, settings, fetchImpl: provider });
app.get('/fixture/login', async (_req, res, next) => {
    try {
        const first = await fetch(`${settings.publicBaseUrl}/auth/discord`, { redirect: 'manual' });
        const state = new URL(first.headers.get('location')).searchParams.get('state');
        const cookie = first.headers.getSetCookie().at(-1).split(';')[0];
        const result = await fetch(`${settings.publicBaseUrl}/auth/discord/callback?state=${state}&code=fixture`, { headers: { Cookie: cookie }, redirect: 'manual' });
        res.setHeader('Set-Cookie', result.headers.getSetCookie()); res.redirect('/');
    } catch (error) { next(error); }
});
const server = app.listen(0, '127.0.0.1', () => {
    settings.publicBaseUrl = `http://127.0.0.1:${server.address().port}`;
    console.log(JSON.stringify({ pid: process.pid, url: settings.publicBaseUrl, login: `${settings.publicBaseUrl}/fixture/login` }));
});
function stop() { service.stop(); app.locals.close(); server.close(() => process.exit(0)); server.closeAllConnections(); }
process.once('SIGTERM', stop); process.once('SIGINT', stop);
