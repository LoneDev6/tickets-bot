const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const { randomBytes, timingSafeEqual } = require('node:crypto');
const path = require('node:path');
const { existsSync } = require('node:fs');
const { ID, STATUSES, publicTicket } = require('./tickets');
const { privacyPolicy } = require('./privacy');

const asyncRoute = handler => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
function sameToken(a, b) {
    return typeof a === 'string' && typeof b === 'string' && Buffer.byteLength(a) === Buffer.byteLength(b) && timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function createApp({ service, settings, fetchImpl = fetch, sessionStore, staticDir = path.join(__dirname, 'web', 'dist') }) {
    const app = express();
    app.disable('x-powered-by');
    app.set('trust proxy', 'loopback');
    const store = sessionStore || new MemoryStore({ checkPeriod: 60_000, ttl: 24 * 60 * 60_000, max: 1000 });
    const streams = new Set();
    const attempts = new Map();
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
        if (settings.publicBaseUrl && secure && (!req.secure || req.hostname !== new URL(settings.publicBaseUrl).hostname)) return res.status(421).json({ error: 'Usa l’indirizzo HTTPS pubblico del pannello.' });
        next();
    });
    app.get('/health', (_req, res) => res.json({ ready: service.sync.ready }));
    app.get('/api/privacy', (_req, res) => res.json(privacyPolicy(settings)));
    app.use(session({
        name: cookieName, secret: settings.sessionSecret || randomBytes(48).toString('hex'), store,
        resave: false, saveUninitialized: false, rolling: true,
        cookie: { secure, httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60_000, path: '/' },
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
    async function authorized(data, force = false) {
        if (!data?.user || !data.accessToken || data.expiresAt <= Date.now()) {
            const error = new Error('Sessione scaduta.'); error.status = 401; throw error;
        }
        if (force || !data.checkedAt || Date.now() - data.checkedAt >= 15_000) {
            const member = await discord(`/users/@me/guilds/${settings.guildId}/member`, data.accessToken);
            if (member.user?.id !== data.user.id || (data.user.id !== settings.ownerId && !member.roles?.includes(settings.supportRoleId))) {
                const error = new Error('Staff authorization required.'); error.status = 403; throw error;
            }
            data.checkedAt = Date.now();
        }
    }
    const requireStaff = asyncRoute(async (req, res, next) => {
        try { await authorized(req.session); next(); }
        catch (error) {
            if ([401, 403].includes(error.status)) req.session.destroy(() => {});
            res.status(error.status || 503).json({ error: error.status === 403 ? 'Accesso consentito solo allo staff autorizzato.' : error.status === 401 ? 'Sessione scaduta. Accedi con Discord.' : 'Impossibile verificare i permessi Discord. Riprova.' });
        }
    });
    function csrf(req, res, next) {
        if (!sameToken(req.get('X-CSRF-Token'), req.session.csrfToken) || req.get('origin') !== settings.publicBaseUrl) return res.status(403).json({ error: 'Richiesta non autorizzata. Ricarica il pannello.' });
        next();
    }

    app.get('/auth/discord', (req, res) => {
        if (!settings.publicBaseUrl) return res.status(503).json({ error: 'Configurare il dominio HTTPS e OAuth Discord.' });
        const time = Date.now();
        for (const [ip, value] of attempts) if (value.until <= time) attempts.delete(ip);
        const attempt = attempts.get(req.ip) || { count: 0, until: time + 60_000 };
        if (attempt.count >= 10 || (!attempts.has(req.ip) && attempts.size >= 1000)) return res.status(429).json({ error: 'Troppi tentativi. Riprova tra un minuto.' });
        attempt.count += 1; attempts.set(req.ip, attempt);
        req.session.oauthState = randomBytes(32).toString('hex');
        req.session.oauthStartedAt = time;
        const query = new URLSearchParams({ client_id: settings.clientId, response_type: 'code', redirect_uri: `${settings.publicBaseUrl}/auth/discord/callback`, scope: 'identify guilds.members.read', state: req.session.oauthState });
        req.session.save(error => error ? res.status(503).json({ error: 'Impossibile iniziare il login.' }) : res.redirect(`https://discord.com/oauth2/authorize?${query}`));
    });
    app.get('/auth/discord/callback', asyncRoute(async (req, res) => {
        if (!settings.publicBaseUrl || !sameToken(req.query.state, req.session.oauthState) || !Number.isFinite(req.session.oauthStartedAt)
            || Date.now() - req.session.oauthStartedAt > 5 * 60_000 || typeof req.query.code !== 'string' || req.query.code.length > 2048) return res.status(400).json({ error: 'Login non valido o scaduto. Riprova.' });
        delete req.session.oauthState;
        await new Promise((resolve, reject) => req.session.save(error => error ? reject(error) : resolve()));
        const token = await discord('/oauth2/token', null, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ client_id: settings.clientId, client_secret: settings.clientSecret, grant_type: 'authorization_code', code: req.query.code, redirect_uri: `${settings.publicBaseUrl}/auth/discord/callback` }) });
        if (typeof token.access_token !== 'string' || !Number.isFinite(token.expires_in) || token.expires_in <= 0) throw new Error('Invalid OAuth response.');
        const user = await discord('/users/@me', token.access_token);
        if (!ID.test(user.id || '')) throw new Error('Invalid OAuth identity.');
        const data = { user: { id: user.id, username: user.username }, accessToken: token.access_token, expiresAt: Date.now() + Math.min(token.expires_in * 1000, 24 * 60 * 60_000) };
        await authorized(data, true);
        await new Promise((resolve, reject) => req.session.regenerate(error => error ? reject(error) : resolve()));
        Object.assign(req.session, data, { csrfToken: randomBytes(32).toString('hex') });
        await new Promise((resolve, reject) => req.session.save(error => error ? reject(error) : resolve()));
        res.redirect('/');
    }));
    app.post('/auth/logout', requireStaff, csrf, (req, res) => {
        const sessionId = req.sessionID;
        req.session.destroy(error => {
            if (error) return res.status(503).json({ error: 'Logout non riuscito. Riprova.' });
            for (const stream of [...streams]) if (stream.sessionId === sessionId) stream.close();
            res.clearCookie(cookieName, { secure, httpOnly: true, sameSite: 'lax', path: '/' }).status(204).end();
        });
    });
    app.get('/api/session', requireStaff, (req, res) => res.json({ user: req.session.user, csrfToken: req.session.csrfToken, capabilities: service.capabilities(), sync: service.sync }));
    app.use('/api', requireStaff, (_req, _res, next) => { service.store.expire(); next(); });
    app.get('/api/tickets', (req, res) => {
        const { status = 'open', type = 'all', q = '', sort = 'updated', page = '1', pageSize = '25' } = req.query;
        if (![...STATUSES, 'all'].includes(status) || !['all', 'Generic', 'Payment'].includes(type) || !['updated', 'created'].includes(sort)
            || typeof q !== 'string' || q.length > 200 || typeof page !== 'string' || typeof pageSize !== 'string'
            || !/^\d{1,6}$/.test(page) || !/^\d{1,3}$/.test(pageSize) || Number(page) < 1 || Number(pageSize) < 1 || Number(pageSize) > 100) return res.status(400).json({ error: 'Filtri non validi.' });
        const result = service.store.list({ status, type, q, sort, page: Number(page), pageSize: Number(pageSize) });
        res.json({ ...result, tickets: result.tickets.map(publicTicket), sync: service.sync });
    });
    app.param('ticketId', (req, res, next, value) => {
        if (!ID.test(value)) return res.status(400).json({ error: 'ID ticket non valido.' });
        const ticket = service.store.get(value);
        if (!ticket || ticket.guildId !== settings.guildId || !(settings.ticketParentIds || [settings.ticketParentId]).includes(ticket.parentId)) return res.status(404).json({ error: 'Ticket non trovato o non più conservato.' });
        req.ticket = ticket; next();
    });
    app.get('/api/tickets/:ticketId', (req, res) => res.json({ ticket: publicTicket(req.ticket) }));
    app.get('/api/tickets/:ticketId/messages', (req, res) => {
        if (!service.capabilities().canReadConversation || req.ticket.contentExcluded) return res.status(409).json({ error: req.ticket.contentExcluded ? 'Copia web esclusa per questo ticket.' : service.capabilities().reason });
        if (req.query.before !== undefined && !ID.test(req.query.before)) return res.status(400).json({ error: 'Pagina messaggi non valida.' });
        const messages = service.store.messages(req.ticket.threadId, { before: req.query.before, limit: 51 });
        res.json({ messages: messages.slice(0, 50), nextBefore: messages.length > 50 ? messages[49].id : null, available: true, reason: null });
    });
    app.all('/api/tickets/:ticketId/:action', csrf, (_req, res) => res.status(409).json({ error: 'Risposta e gestione dalla app non abilitate. Usa Discord.' }));
    app.get('/api/events', asyncRoute(async (req, res) => {
        if (streams.size >= 100 || [...streams].filter(item => item.sessionId === req.sessionID).length >= 3) return res.status(429).json({ error: 'Troppe connessioni aperte.' });
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
                await authorized(current, true);
                if (res.writableLength > 64 * 1024) return close();
                res.write(': heartbeat\n\n');
            } catch { send('session-expired', { error: 'Sessione scaduta o autorizzazione revocata.' }); close(); }
            finally { checking = false; }
        }, 15_000);
        service.on('tickets', invalidate); service.on('sync', sync); streams.add(entry);
        send('sync', service.sync); send('tickets', { revision: service.store.revision }); res.on('close', close);
    }));
    app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint non trovato.' }));
    if (existsSync(path.join(staticDir, 'index.html'))) {
        app.use(express.static(staticDir, { index: false, dotfiles: 'deny' }));
        app.get(['/', '/privacy', '/tickets/:id'], (_req, res) => res.sendFile(path.join(staticDir, 'index.html')));
    } else app.get(['/', '/privacy'], (_req, res) => res.status(503).type('text').send('Pannello non compilato. Eseguire npm run install:web e npm run build:web. Informativa: /api/privacy'));
    app.use((error, _req, res, _next) => {
        if (res.headersSent) return res.end();
        const status = [400, 401, 403, 413, 503].includes(error.status) ? error.status : 500;
        res.status(status).json({ error: status === 500 ? 'Errore interno. Riprova.' : status === 403 ? 'Accesso non autorizzato.' : 'Richiesta non riuscita. Riprova il login o ricarica il pannello.' });
    });
    app.locals.close = () => { for (const stream of [...streams]) stream.close(); store.stopInterval?.(); };
    return app;
}
module.exports = { createApp, sameToken };
