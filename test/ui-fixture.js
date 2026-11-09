// Synthetic local fixture only; this module is never imported by the bot.
if (process.env.NODE_ENV !== 'development') throw new Error('UI fixture requires NODE_ENV=development.');
const { randomBytes } = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { createServer } = require('node:http');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { TicketStore } = require('../tickets');
const { TicketService } = require('../ticket-service');
const { createApp } = require('../server');
const { createChatDebug } = require('../utils/chat-debug');
const { Collection, ChannelType, WebhookType } = require('discord.js');
const webRoot = path.join(__dirname, '..', 'web');
const dev = process.argv.includes('--dev');
const mockChatEnabled = process.env.UI_FIXTURE_CHAT === 'true' || (dev && process.env.UI_FIXTURE_CHAT !== 'false');
const tailscale = process.argv.includes('--tailscale');
const configuredPort = process.env.UI_FIXTURE_PORT ?? (tailscale ? '8766' : dev ? '4173' : '0');
if (!/^\d+$/.test(configuredPort) || Number(configuredPort) > 65535) throw new Error('UI_FIXTURE_PORT must be a port from 0 to 65535.');
const httpsPort = process.env.UI_FIXTURE_HTTPS_PORT ?? '9443';
if (!/^\d+$/.test(httpsPort) || Number(httpsPort) < 1 || Number(httpsPort) > 65535) throw new Error('UI_FIXTURE_HTTPS_PORT must be a port from 1 to 65535.');
const ids = { guild: '120000000000000004', parent: '120000000000000005', user: '120000000000000002', bot: '120000000000000003', role: '120000000000000008' };
const settings = { development: true, publicBaseUrl: 'http://127.0.0.1', guildId: ids.guild, ticketParentId: ids.parent, supportRoleId: ids.role, ownerId: ids.user, sessionSecret: randomBytes(48).toString('hex'), clientId: 'synthetic', clientSecret: 'synthetic', messageContentApproved: false };
const store = new TicketStore(new Map(), randomBytes(32).toString('base64'));
const descriptions = [
    'A customer cannot find the invoice for a recent order.', 'Payment appears twice in the account history.',
    'Please update the email address on the membership.', 'The checkout page stops after confirming the address.',
    'A refund was approved but has not arrived yet.', 'The welcome message links to an expired page.',
    'Requesting help changing the delivery date.', 'Card verification keeps returning an error.',
    'The account shows an unfamiliar subscription.', 'A receipt is needed for expense reporting.',
    'The discount code is not applied at checkout.', 'Please correct the spelling of the account name.',
    'The order arrived with one item missing.', 'The payment page is blank on mobile.',
    'Need help understanding the latest charge.', 'The password reset email has not arrived.',
    'A cancelled plan is still listed as active.', 'The billing country needs to be corrected.',
    'The confirmation page shows the wrong total.', 'Please resend the purchase receipt.',
    'The saved card cannot be removed from settings.', 'A payment was declined despite sufficient funds.',
    'The account has two copies of the same order.', 'The tax amount differs from the invoice.',
    'Need to change the contact person on this request.', 'The checkout session expires before payment.',
    'A refund request needs an update.', 'The account is locked after a device change.',
    'The invoice download returns an error.', 'Please clarify the renewal date.',
    'A duplicate order should be cancelled.', 'The support page does not load after sign-in.',
];
const names = ['Alex Morgan', 'Jamie Chen', 'Taylor Reed', 'Riley Patel', 'Jordan Kim', 'Casey Rivera', 'Sam Brooks', 'Morgan Lee'];
const types = ['Generic', 'Payment'];
const now = Date.now();
for (let index = 0; index < 32; index++) {
    const createdAt = now - (index + 2) * 3_600_000;
    store.upsert({
        threadId: String(120000000000000100n + BigInt(index)), guildId: ids.guild, parentId: ids.parent,
        name: index === 0 ? 'Generic: legacy.requester (120000000000000099)' : `${types[index % 2]}: ${names[index % names.length]}`,
        openerId: index === 0 ? '120000000000000099' : String(120000000000001000n + BigInt(index % names.length)),
        openerName: index === 0 ? null : names[index % names.length], type: types[index % 2],
        description: descriptions[index] + (index % 4 === 0 ? ' I already tried signing out and checking the account from another browser, but the issue still occurs. Could you help me check what happened?' : ''), createdAt, lastMessageAt: now - index * 47 * 60_000,
        archived: index > 25,
        locked: index > 28, deletedAt: index === 31 ? createdAt + 20_000 : null,
    });
}
const guild = { id: ids.guild, members: { fetch: async ({ user }) => ({ id: user, guild, user: { id: user, username: 'Synthetic staff' }, displayName: user === ids.user ? 'Synthetic staff' : cachedUsers.get(user)?.username || 'Resolved mentioned user', displayAvatarURL: () => mockAvatar(user), roles: { cache: new Collection([[ids.role, {}]]) } }) } };
const cachedUsers = new Map(names.map((name, index) => [String(120000000000001000n + BigInt(index)), { username: name, displayAvatarURL: () => `https://cdn.discordapp.com/embed/avatars/${index % 6}.png` }]));
guild.roles = { cache: new Map([[ids.role, { name: 'Support', hexColor: '#5865f2' }]]) };
guild.members.cache = new Map();
const client = { user: { id: ids.bot }, users: { cache: cachedUsers }, guilds: { cache: new Map([[ids.guild, guild]]), fetch: async () => guild }, channels: { cache: new Map([[ids.parent, { name: 'urgent-tickets' }]]), fetch: async id => {
    if (id === ids.parent) return { id, guildId: ids.guild, type: ChannelType.GuildText, permissionsFor: () => ({ has: () => true }), fetchWebhooks: async () => new Collection([[mockWebhook.id, mockWebhook]]) };
    const ticket = store.get(id);
    if (!ticket) throw Object.assign(new Error('Unknown synthetic ticket'), { code: 10003 });
    const thread = { ...ticket, id, type: ChannelType.PrivateThread, permissionsFor: () => ({ has: () => true }), members: { add: async () => {} }, send: async () => ({ id: '120000000000000999' }) };
    thread.edit = async update => Object.assign(thread, update);
    return thread;
} } };
const mockWebhook = { id: '120000000000000009', guildId: ids.guild, channelId: ids.parent, owner: { id: ids.bot }, type: WebhookType.Incoming, name: 'Ticket staff replies', token: 'synthetic', send: async payload => {
    const createdAt = Date.now();
    const message = { id: String((BigInt(createdAt - 1_420_070_400_000) << 22n) | (++messageSequence % 4_194_304n)), channelId: payload.threadId, guildId: ids.guild,
        webhookId: mockWebhook.id, author: { id: mockWebhook.id, username: payload.username, bot: true, displayAvatarURL: () => payload.avatarURL },
        content: payload.content, createdTimestamp: createdAt, editedTimestamp: null, partial: false, system: false, embeds: [], attachments: new Collection() };
    const timer = setTimeout(() => {
        pendingReplies.delete(timer);
        const ticket = store.get(payload.threadId);
        if (ticket?.status === 'open' && !ticket.contentExcluded) addMockMessage(ticket, 'Thanks! I can confirm the update. Please let me know if you need anything else.', 'requester');
    }, 1200);
    pendingReplies.add(timer);
    return message;
} };
if (mockChatEnabled) {
    settings.messageContentApproved = true; settings.webChatEnabled = true; settings.webRepliesEnabled = true;
}
const debug = process.env.UI_FIXTURE_DEBUG_DIR ? createChatDebug({ directory: process.env.UI_FIXTURE_DEBUG_DIR }) : undefined;
const service = new TicketService(client, store, settings, { debug });
if (mockChatEnabled) {
    const capabilities = service.capabilities.bind(service);
    service.capabilities = () => ({ ...capabilities(), mockChat: true });
}
service.scheduleSummary = () => {}; // The fixture dashboard does not need the live summary job.
service.sync = { ready: true, updatedAt: Date.now(), error: null };
const provider = async url => url.endsWith('/oauth2/token') ? Response.json({ access_token: 'fixture', expires_in: 3600 }) : url.endsWith('/users/@me') ? Response.json({ id: ids.user, username: 'Synthetic staff' }) : Response.json({ user: { id: ids.user }, roles: [ids.role] });
const pendingReplies = new Set();
let messageSequence = 0n;
const app = createApp({ service, settings, fetchImpl: provider, debug, ...(mockChatEnabled ? { configureMockApi } : {}) });
let backend;
let vite;
let closing;

function addMockMessage(ticket, content, sender) {
    const createdAt = Date.now();
    const staff = sender === 'staff';
    const message = {
        id: String((BigInt(createdAt - 1_420_070_400_000) << 22n) | (++messageSequence % 4_194_304n)),
        authorId: staff ? ids.user : ticket.openerId,
        authorName: staff ? 'Synthetic staff' : ticket.openerName || 'Synthetic requester',
        authorAvatarUrl: mockAvatar(staff ? ids.user : ticket.openerId),
        authorRoleColor: staff ? '#5865f2' : null, bot: false,
        content, createdAt, editedAt: null, attachments: [], embeds: [], reactions: [],
    };
    store.saveMessage(ticket.threadId, message);
    store.upsert({ threadId: ticket.threadId, lastMessageId: message.id, lastMessageAt: createdAt, lastMessageAuthorId: message.authorId, lastMessageAuthorName: message.authorName });
    return message;
}

function mockAvatar(userId) {
    return cachedUsers.get(userId)?.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(userId) % 6n)}.png`;
}

function configureMockApi(app, csrf) {
    app.post('/api/mock/tickets', csrf, (req, res) => {
        const threadId = String(120000000000002000n + (++messageSequence));
        const ticket = store.upsert({ threadId, guildId: ids.guild, parentId: ids.parent, openerId: ids.user, openerName: 'Synthetic requester', name: 'Generic: Synthetic new ticket', type: 'Generic', description: 'Synthetic ticket created to test live list stability.', createdAt: Date.now(), lastMessageAt: Date.now() });
        res.status(201).json({ threadId: ticket.threadId });
    });
    app.post('/api/mock/tickets/:ticketId/messages', csrf, async (req, res, next) => {
        const { content, sender = 'staff' } = req.body || {};
        if (typeof content !== 'string' || !content.trim() || content.length > 2000 || !['staff', 'requester'].includes(sender)) return res.status(400).json({ error: 'Invalid mock message.' });
        if (req.ticket.status !== 'open' || req.ticket.contentExcluded) return res.status(409).json({ error: 'This mock ticket is not open for messages.' });
        try {
            const message = sender === 'staff' ? store.message(req.ticket.threadId, await service.reply(req.ticket.threadId, { id: req.session.user.id, guild }, content)) : addMockMessage(req.ticket, content.trim(), sender);
            res.status(201).json({ message });
        } catch (error) { next(error); }
    });
}

function seedConversations() {
    if (!mockChatEnabled) return;
    const epoch = 1_420_070_400_000;
    const snowflake = timestamp => String((BigInt(timestamp - epoch) << 22n) | 1n);
    const tickets = store.all().filter(ticket => ticket.status !== 'deleted' && !ticket.deletedAt);
    for (const ticket of tickets) {
        const count = ticket.threadId === '120000000000000100' ? 64 : 8;
        const newestAt = Date.now() - 30_000;
        for (let index = 0; index < count; index++) {
            const createdAt = newestAt - (count - index - 1) * 60_000;
            const requester = index % 3 !== 1;
            const staff = index % 3 === 1;
            const bot = index === 1;
            const authorId = bot ? ids.bot : requester ? ticket.openerId : ids.user;
            const content = index === 0
                ? `Hi! **Bold**, *italic*, __underline__, ~~strike~~, ||spoiler||, \`code\`, <@${ticket.openerId}>, and https://example.com/help.`
                : index === 1 ? 'Thanks for the details. I have checked the order and will follow up shortly.'
                    : index % 3 === 0 ? 'Replying to your earlier note with an update.' : `Synthetic conversation message ${index + 1}.`;
            store.saveMessage(ticket.threadId, {
                id: snowflake(createdAt), authorId,
                authorName: bot ? 'Ticket assistant' : requester ? ticket.openerName || 'Synthetic requester' : 'Synthetic staff',
                authorAvatarUrl: mockAvatar(authorId),
                authorRoleColor: staff ? '#5865f2' : null, bot,
                content: content + (index === count - 1 ? ` Hello <@&${ids.role}> <@!120000000000009999> <@120000000000001000>.` : ''), createdAt, editedAt: null,
                ...(index === 2 ? { replyTo: { id: snowflake(createdAt - 60_000), authorId: ids.bot, authorName: 'Ticket assistant', content: 'Thanks for the details. I have checked the order and will follow up shortly.', bot: true } } : {}),
                reactions: index === 3 ? [{ emoji: '👍', count: 2, reacted: true }, { emoji: '✅', count: 1 }] : [],
                embeds: index === 4 ? [{ url: `${settings.publicBaseUrl}/fixture/example-log.txt`, color: 5793266, title: 'Order status', description: 'A synthetic status update.', image: 'https://cdn.discordapp.com/embed/avatars/2.png', thumbnail: 'https://cdn.discordapp.com/embed/avatars/3.png', footer: { text: 'Synthetic support', iconUrl: 'https://cdn.discordapp.com/embed/avatars/1.png' }, author: { name: 'Support update', url: 'https://example.com/help', iconUrl: 'https://cdn.discordapp.com/embed/avatars/0.png' }, fields: [{ name: 'Order', value: 'Example #1042', inline: true }, { name: 'Status', value: 'In transit', inline: true }] }] : [],
                attachments: index === 5 ? [{ name: 'example-log.txt', url: `${settings.publicBaseUrl}/fixture/example-log.txt`, contentType: 'text/plain', size: 38 }] : index === 6 ? [{ name: 'example-image.png', url: 'https://cdn.discordapp.com/embed/avatars/4.png', contentType: 'image/png', size: 1234 }] : [],
            });
        }
        const newest = store.messages(ticket.threadId, { limit: 1 })[0];
        if (newest) store.upsert({ threadId: ticket.threadId, lastMessageId: newest.id, lastMessageAt: newest.createdAt, lastMessageAuthorId: newest.authorId, lastMessageAuthorName: newest.authorName });
    }
}

function listen(server, port, host) {
    return new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, host, () => { server.removeListener('error', reject); resolve(server); });
    });
}

async function start() {
    try {
        backend = await listen(createServer(app), 0, '127.0.0.1');
        const backendUrl = `http://127.0.0.1:${backend.address().port}`;
        app.get('/fixture/login', async (_req, res, next) => {
            try {
                const first = await fetch(`${backendUrl}/auth/discord`, { redirect: 'manual' });
                const state = new URL(first.headers.get('location')).searchParams.get('state');
                const cookie = first.headers.getSetCookie().at(-1).split(';')[0];
                const result = await fetch(`${backendUrl}/auth/discord/callback?state=${state}&code=fixture`, { headers: { Cookie: cookie }, redirect: 'manual' });
                res.setHeader('Set-Cookie', result.headers.getSetCookie()); res.redirect('/');
            } catch (error) { next(error); }
        });
        app.get('/fixture/example-log.txt', (_req, res) => {
            res.type('text/plain').send('Synthetic example log for the local UI fixture.\n');
        });

        if (!dev) {
            settings.publicBaseUrl = backendUrl;
            seedConversations();
            await output({ port: backend.address().port }, false);
            return;
        }

        const modulePath = pathToFileURL(require.resolve('vite', { paths: [webRoot] })).href;
        const { createServer: createViteServer } = await import(modulePath);
        let canonicalHostname = '127.0.0.1';
        let host = '127.0.0.1';
        let publicOrigin;
        if (tailscale) {
            const status = JSON.parse(execFileSync('tailscale', ['status', '--json'], { encoding: 'utf8', timeout: 5000, maxBuffer: 2 * 1024 * 1024 }));
            if (status.BackendState !== 'Running' || status.Self?.Online !== true || !status.Self?.TailscaleIPs?.length) throw new Error('Tailscale is not running or this device is offline.');
            canonicalHostname = status.Self.DNSName?.replace(/\.$/, '');
            if (!canonicalHostname) throw new Error('Tailscale did not report a MagicDNS hostname.');
            const serve = JSON.parse(execFileSync('tailscale', ['serve', 'status', '--json'], { encoding: 'utf8', timeout: 5000, maxBuffer: 2 * 1024 * 1024 }));
            const authority = `${canonicalHostname}:${Number(httpsPort)}`;
            const target = `http://127.0.0.1:${Number(configuredPort)}`;
            if (serve.Web?.[authority]?.Handlers?.['/']?.Proxy !== target || serve.AllowFunnel?.[authority]) throw new Error(`A private Tailscale HTTPS route on port ${httpsPort} must point to ${target}.`);
            publicOrigin = `https://${canonicalHostname}${Number(httpsPort) === 443 ? '' : `:${Number(httpsPort)}`}`;
        }
        settings.publicBaseUrl = publicOrigin || `http://${canonicalHostname}:${Number(configuredPort)}`;
        vite = await createViteServer({
            root: webRoot, configFile: path.join(webRoot, 'vite.config.ts'), mode: 'development', envDir: false,
            logLevel: 'silent',
            server: {
                host, port: Number(configuredPort), strictPort: true, allowedHosts: [canonicalHostname], cors: false,
                ...(tailscale ? { ws: { protocol: 'wss', host: canonicalHostname, clientPort: Number(httpsPort) } } : {}),
                fs: { strict: true, allow: [webRoot] },
                proxy: Object.fromEntries(['/api', '/fixture', '/auth'].map(route => [route, {
                    target: backendUrl, changeOrigin: false,
                    rewrite: route === '/auth' ? requestPath => requestPath === '/auth/discord' ? '/fixture/login' : requestPath : undefined,
                }])),
            },
        });
        await vite.listen();
        const actualPort = vite.httpServer.address().port;
        settings.publicBaseUrl = publicOrigin || `http://${canonicalHostname}:${actualPort}`;
        seedConversations();
        await output({ port: actualPort }, true, backend.address().port);
    } catch (error) {
        await shutdown();
        throw error;
    }
}

async function output(address, hmr, backendPort) {
    const url = settings.publicBaseUrl;
    console.log(JSON.stringify({ pid: process.pid, url, login: `${url}/fixture/login`, mode: 'mock', hmr, ...(backendPort ? { backendPort, frontendPort: address.port } : {}) }));
}

function shutdown() {
    if (closing) return closing;
    closing = (async () => {
        for (const timer of pendingReplies) clearTimeout(timer);
        pendingReplies.clear();
        service.stop();
        app.locals.close();
        const tasks = [];
        if (vite) tasks.push(vite.close());
        if (backend?.listening) {
            backend.closeAllConnections();
            tasks.push(new Promise(resolve => backend.close(resolve)));
        }
        await Promise.allSettled(tasks);
    })();
    return closing;
}

process.once('SIGTERM', () => shutdown().then(() => process.exit(0)));
process.once('SIGINT', () => shutdown().then(() => process.exit(0)));
start().catch(error => { console.error(error.message); process.exitCode = 1; });
