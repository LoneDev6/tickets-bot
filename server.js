const express = require('express');
const session = require('express-session');
const { EncryptedSessionStore, SESSION_MAX_AGE } = require('./session-store');
const { randomBytes, timingSafeEqual } = require('node:crypto');
const path = require('node:path');
const { existsSync } = require('node:fs');
const { ID, STATUSES, publicTicket } = require('./tickets');
const { privacyPolicy } = require('./privacy');

const asyncRoute = handler => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
function sameToken(a, b) {
    return typeof a === 'string' && typeof b === 'string' && Buffer.byteLength(a) === Buffer.byteLength(b) && timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function createApp({ service, settings, fetchImpl = fetch, sessionStore, logger = console, staticDir = path.join(__dirname, 'web', 'dist'), configureMockApi }) {
    if (configureMockApi && !settings.development) throw new Error('Mock APIs require development mode.');
    const serializeTicket = ticket => publicTicket(ticket, service.client.users?.cache?.get(ticket.openerId));
    const app = express();
    app.disable('x-powered-by');
    app.set('trust proxy', 'loopback');
    const store = sessionStore || new EncryptedSessionStore(service.store, { logger });
    const streams = new Set();
    const attempts = new Map();
    const memberChecks = new Map();
    const secure = !settings.development;
    const cookieName = secure ? '__Host-tickets' : 'tickets.dev';
    app.use((req, res, next) => {
        res.set({
            'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer',
            'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
            'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.discordapp.com https://media.discordapp.net; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
            'Cache-Control': 'no-store',
        });
        if (secure) res.set('Strict-Transport-Security', 'max-age=31536000');
        if (settings.publicBaseUrl && secure && (!req.secure || req.hostname !== new URL(settings.publicBaseUrl).hostname)) return res.status(421).json({ error: 'Use the public HTTPS address of the dashboard.' });
        next();
    });
    app.get('/health', (_req, res) => res.json({ ready: service.sync.ready }));
    app.get('/api/privacy', (_req, res) => res.json(privacyPolicy(settings)));
    app.get('/api/stats', (req, res) => {
        if (!settings.statsApiToken) return res.status(404).json({ error: 'The statistics API is disabled.' });
        const token = req.get('Authorization')?.match(/^Bearer ([^\s]{32,256})$/i)?.[1];
        if (!token || !sameToken(token, settings.statsApiToken)) return res.set('WWW-Authenticate', 'Bearer').status(401).json({ error: 'A valid statistics Bearer token is required.' });
        if (Object.keys(req.query).some(key => !['from', 'to', 'interval'].includes(key))) return res.status(400).json({ error: 'Invalid statistics parameters.' });
        service.store.expire();
        const result = service.store.statistics.query(req.query);
        res.json({ ...result, current: { ...service.store.counts(), escalated: service.store.all().filter(ticket => ticket.status === 'open' && ticket.escalatedAt).length }, sync: service.sync });
    });
    app.use(session({
        name: cookieName, secret: settings.sessionSecret || randomBytes(48).toString('hex'), store,
        resave: false, saveUninitialized: false, rolling: true,
        cookie: { secure, httpOnly: true, sameSite: 'lax', maxAge: SESSION_MAX_AGE, path: '/' },
    }));
    app.use(express.json({ limit: '16kb', strict: true }));

    async function discord(endpoint, token, options = {}) {
        const response = await fetchImpl(`https://discord.com/api/v10${endpoint}`, { ...options,
            headers: { ...options.headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) }, signal: AbortSignal.timeout(10_000) });
        if (!response.ok) {
            const error = new Error('Discord authorization check failed.');
            error.status = [401, 403, 404].includes(response.status) ? (response.status === 401 ? 401 : 403) : 503;
            throw error;
        }
        return response.json();
    }
    async function authorized(data) {
        if (!data?.user || !ID.test(data.user.id || '')) {
            const error = new Error('Your session has expired.'); error.status = 401; throw error;
        }
        let check = memberChecks.get(data.user.id);
        if (!check) {
            check = Promise.resolve().then(async () => {
                const guild = await service.client.guilds.fetch(settings.guildId);
                if (guild.id !== settings.guildId) throw new Error('Unexpected authorization guild.');
                return guild.members.fetch({ user: data.user.id, force: true, cache: false });
            }).finally(() => memberChecks.delete(data.user.id));
            memberChecks.set(data.user.id, check);
        }
        let member;
        try { member = await check; }
        catch (error) {
            logger.warn('Dashboard Discord member verification failed.', { status: Number.isFinite(error.status) ? error.status : 503, ...(Number.isFinite(error.code) ? { code: error.code } : {}) });
            throw Object.assign(new Error('Discord member verification unavailable.'), { status: Number(error.code) === 10007 ? 403 : 503 });
        }
        if (member.id !== data.user.id || !member.roles?.cache?.has(settings.supportRoleId)) {
            const error = new Error('Staff authorization required.'); error.status = 403; throw error;
        }
    }
    const requireStaff = asyncRoute(async (req, res, next) => {
        try { await authorized(req.session); next(); }
        catch (error) {
            if ([401, 403].includes(error.status)) req.session.destroy(() => {});
            res.status(error.status || 503).json({ error: error.status === 403 ? 'Only authorized support staff can access this dashboard.' : error.status === 401 ? 'Your session has expired. Sign in with Discord.' : 'Could not verify Discord permissions. Please retry.' });
        }
    });
    function csrf(req, res, next) {
        if (!sameToken(req.get('X-CSRF-Token'), req.session.csrfToken) || req.get('origin') !== settings.publicBaseUrl) return res.status(403).json({ error: 'Invalid request. Reload the dashboard and retry.' });
        next();
    }

    app.get('/auth/discord', (req, res) => {
        if (!settings.publicBaseUrl) return res.status(503).json({ error: 'Configure the HTTPS domain and Discord OAuth.' });
        const time = Date.now();
        for (const [ip, value] of attempts) if (value.until <= time) attempts.delete(ip);
        const attempt = attempts.get(req.ip) || { count: 0, until: time + 60_000 };
        if (attempt.count >= 10 || (!attempts.has(req.ip) && attempts.size >= 1000)) return res.status(429).json({ error: 'Too many attempts. Please retry in a minute.' });
        attempt.count += 1; attempts.set(req.ip, attempt);
        req.session.oauthState = randomBytes(32).toString('hex');
        req.session.oauthStartedAt = time;
        const query = new URLSearchParams({ client_id: settings.clientId, response_type: 'code', redirect_uri: `${settings.publicBaseUrl}/auth/discord/callback`, scope: 'identify', state: req.session.oauthState });
        req.session.save(error => error ? res.status(503).json({ error: 'Could not start sign-in.' }) : res.redirect(`https://discord.com/oauth2/authorize?${query}`));
    });
    app.get('/auth/discord/callback', asyncRoute(async (req, res) => {
        if (!settings.publicBaseUrl || !sameToken(req.query.state, req.session.oauthState) || !Number.isFinite(req.session.oauthStartedAt)
            || Date.now() - req.session.oauthStartedAt > 5 * 60_000 || typeof req.query.code !== 'string' || req.query.code.length > 2048) return res.status(400).json({ error: 'Invalid or expired sign-in. Please retry.' });
        delete req.session.oauthState;
        await new Promise((resolve, reject) => req.session.save(error => error ? reject(error) : resolve()));
        const token = await discord('/oauth2/token', null, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ client_id: settings.clientId, client_secret: settings.clientSecret, grant_type: 'authorization_code', code: req.query.code, redirect_uri: `${settings.publicBaseUrl}/auth/discord/callback` }) });
        if (typeof token.access_token !== 'string' || !Number.isFinite(token.expires_in) || token.expires_in <= 0) throw new Error('Invalid OAuth response.');
        const user = await discord('/users/@me', token.access_token);
        if (!ID.test(user.id || '')) throw new Error('Invalid OAuth identity.');
        const data = { user: { id: user.id, username: user.username } };
        await authorized(data);
        await new Promise((resolve, reject) => req.session.regenerate(error => error ? reject(error) : resolve()));
        Object.assign(req.session, data, { csrfToken: randomBytes(32).toString('hex') });
        await new Promise((resolve, reject) => req.session.save(error => error ? reject(error) : resolve()));
        res.redirect('/');
    }));
    app.post('/auth/logout', csrf, (req, res) => {
        const sessionId = req.sessionID;
        req.session.destroy(error => {
            if (error) return res.status(503).json({ error: 'Sign-out failed. Please retry.' });
            for (const stream of [...streams]) if (stream.sessionId === sessionId) stream.close();
            res.clearCookie(cookieName, { secure, httpOnly: true, sameSite: 'lax', path: '/' }).status(204).end();
        });
    });
    app.get('/api/session', requireStaff, (req, res) => res.json({ user: req.session.user, csrfToken: req.session.csrfToken, capabilities: service.capabilities(), sync: service.sync }));
    app.use('/api', requireStaff, (_req, _res, next) => { service.store.expire(); next(); });
    app.get('/api/tickets', (req, res) => {
        const { status = 'open', type = 'all', q = '', opener = '', sort = 'updated', page = '1', pageSize = '25', cursor, revision } = req.query;
        if (![...STATUSES, 'all'].includes(status) || !['all', 'Generic', 'Payment'].includes(type) || !['updated', 'created', 'priority'].includes(sort)
            || typeof opener !== 'string' || opener.length > 100 || (cursor !== undefined && (typeof cursor !== 'string' || !ID.test(cursor)))
            || (revision !== undefined && (typeof revision !== 'string' || !/^\d{1,16}$/.test(revision))) || (cursor && revision === undefined)
            || typeof q !== 'string' || q.length > 200 || typeof page !== 'string' || typeof pageSize !== 'string'
            || !/^\d{1,6}$/.test(page) || !/^\d{1,3}$/.test(pageSize) || Number(page) < 1 || Number(pageSize) < 1 || Number(pageSize) > 100) return res.status(400).json({ error: 'Invalid filters.' });
        if (cursor && Number(revision) !== service.store.revision) return res.status(409).json({ error: 'The ticket list changed. Reload the results.' });
        const result = service.store.list({ status, type, q, opener, sort, page: Number(page), pageSize: Number(pageSize), cursor });
        res.json({ ...result, tickets: result.tickets.map(serializeTicket), sync: service.sync });
    });
    app.param('ticketId', (req, res, next, value) => {
        if (!ID.test(value)) return res.status(400).json({ error: 'Invalid ticket ID.' });
        const ticket = service.store.get(value);
        if (!ticket || ticket.guildId !== settings.guildId || !(settings.ticketParentIds || [settings.ticketParentId]).includes(ticket.parentId)) return res.status(404).json({ error: 'Ticket not found or no longer retained.' });
        req.ticket = ticket; next();
    });
    app.get('/api/tickets/:ticketId', (req, res) => res.json({ ticket: serializeTicket(req.ticket) }));
    app.get('/api/tickets/:ticketId/messages', (req, res) => {
        if (!service.capabilities().canReadConversation || req.ticket.contentExcluded) return res.status(409).json({ error: req.ticket.contentExcluded ? 'Web chat is excluded for this ticket.' : service.capabilities().reason });
        if (req.query.before !== undefined && !ID.test(req.query.before)) return res.status(400).json({ error: 'Invalid message cursor.' });
        const messages = service.store.messages(req.ticket.threadId, { before: req.query.before, limit: 51 });
        res.json({ messages: messages.slice(0, 50), nextBefore: messages.length > 50 ? messages[49].id : null, available: true, reason: null });
    });
    app.post('/api/tickets/:ticketId/actions', csrf, asyncRoute(async (req, res) => {
        const { action, reason = '' } = req.body || {};
        if (!['close', 'close-lock', 'reopen', 'escalate', 'resolve-escalation'].includes(action) || typeof reason !== 'string' || reason.length > 500) return res.status(400).json({ error: 'Invalid ticket action or reason.' });
        if (req.ticket.status === 'deleted') return res.status(409).json({ error: 'Deleted tickets cannot be modified.' });
        const guild = await service.client.guilds.fetch(settings.guildId);
        await service.action(req.ticket.threadId, action, { id: req.session.user.id, guild }, reason.trim());
        res.json({ ticket: serializeTicket(service.store.get(req.ticket.threadId)) });
    }));
    app.post('/api/tickets/:ticketId/read', csrf, (req, res, next) => {
        try {
            const { messageAt, messageId } = req.body || {};
            const ticket = service.store.markRead(req.ticket.threadId, { messageAt, messageId });
            res.json({ ticket: serializeTicket(ticket) });
        } catch (error) { next(error); }
    });
    app.post('/api/tickets/:ticketId/reply', csrf, asyncRoute(async (req, res) => {
        if (!service.capabilities().canReply) return res.status(409).json({ error: service.capabilities().reason });
        if (!req.body || Object.keys(req.body).some(key => key !== 'content') || typeof req.body.content !== 'string' || !req.body.content.trim() || req.body.content.length > 2000) return res.status(400).json({ error: 'A reply must contain only content, between 1 and 2000 characters.' });
        const guild = await service.client.guilds.fetch(settings.guildId);
        const messageId = await service.reply(req.ticket.threadId, { id: req.session.user.id, guild }, req.body.content);
        res.status(201).json({ messageId });
    }));
    app.all('/api/tickets/:ticketId/:action', csrf, (_req, res) => res.status(409).json({ error: 'Replies are currently available in Discord.' }));
    app.get('/api/events', asyncRoute(async (req, res) => {
        if (streams.size >= 100 || [...streams].filter(item => item.sessionId === req.sessionID).length >= 3) return res.status(429).json({ error: 'Too many open connections.' });
        res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' }); res.flushHeaders();
        let updateTimer; let closed = false;
        const send = (event, value) => { if (!closed && !res.writableEnded) res.write(`event: ${event}\ndata: ${JSON.stringify(value)}\n\n`); };
        const invalidate = () => { if (!updateTimer) updateTimer = setTimeout(() => { updateTimer = null; send('tickets', { revision: service.store.revision }); }, 250); };
        const sync = value => send('sync', value);
        const entry = { sessionId: req.sessionID, close };
        function close() {
            if (closed) return;
            closed = true; clearInterval(heartbeat); clearTimeout(updateTimer);
            service.off('tickets', invalidate); service.off('sync', sync); streams.delete(entry); res.end();
        }
        let checking = false;
        const heartbeat = setInterval(async () => {
            if (checking) return; checking = true;
            try {
                const current = await new Promise((resolve, reject) => store.get(entry.sessionId, (error, data) => error ? reject(error) : resolve(data)));
                if (closed) return;
                await authorized(current);
                if (closed) return;
                if (res.writableLength > 64 * 1024) return close();
                res.write(': heartbeat\n\n');
            } catch (error) {
                if ([401, 403].includes(error.status)) send('session-expired', { error: 'Session expired or access revoked.' });
                close();
            }
            finally { checking = false; }
        }, 15_000);
        service.on('tickets', invalidate); service.on('sync', sync); streams.add(entry);
        send('sync', service.sync); send('tickets', { revision: service.store.revision }); res.on('close', close);
    }));
    if (configureMockApi) configureMockApi(app, csrf);
    app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found.' }));
    if (existsSync(path.join(staticDir, 'index.html'))) {
        app.use(express.static(staticDir, { index: false, dotfiles: 'deny' }));
        app.get(['/', '/privacy', '/tickets/:id'], (_req, res) => res.sendFile(path.join(staticDir, 'index.html')));
    } else app.get(['/', '/privacy'], (_req, res) => res.status(503).type('text').send('Dashboard build missing. Build locally and distribute web/dist. Privacy policy: /api/privacy'));
    app.use((error, _req, res, _next) => {
        if (res.headersSent) return res.end();
        const status = [400, 401, 403, 404, 409, 413, 429, 503].includes(error.status) ? error.status : 500;
        res.status(status).json({ error: status === 500 ? 'An internal error occurred. Please retry.' : status === 403 ? 'Access denied.' : status === 409 ? 'The ticket or list changed, or another action is in progress. Refresh and retry.' : status === 400 ? 'Invalid request parameters.' : 'Request failed. Sign in again or reload the dashboard.' });
    });
    app.locals.close = () => { for (const stream of [...streams]) stream.close(); store.stopInterval?.(); };
    return app;
}
module.exports = { createApp, sameToken };
