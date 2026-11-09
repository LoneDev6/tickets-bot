'use strict';

const MAX_ID = 18446744073709551615n;
const SAFE_CODE = /^[a-z][a-z0-9_]{0,63}$/;
const MAX_TIMER = 2147483647;
const { setTimeout: timerSleep } = require('node:timers/promises');
const { chatDebug } = require('./utils/chat-debug');
const validId = value => typeof value === 'string' && /^\d{16,20}$/.test(value) && BigInt(value) > 0n && BigInt(value) <= MAX_ID;

class DiscordReaderError extends Error {
    constructor(status, code, retryAfter, message, readerStatus = null) {
        super(message); this.name = 'DiscordReaderError'; this.status = status;
        this.readerStatus = readerStatus; this.readerCode = code; this.retryAfter = retryAfter;
    }
}

class DiscordReader {
    constructor({ baseUrl, apiKey }, { fetchImpl = fetch, sleep = defaultSleep, debug = chatDebug } = {}) {
        this.baseUrl = new URL(baseUrl); this.baseUrl.pathname = this.baseUrl.pathname.replace(/\/$/, '');
        this.apiKey = apiKey; this.fetch = fetchImpl; this.sleep = sleep;
        this.debug = debug;
        this.pending = 0; this.tail = Promise.resolve(); this.closed = false;
        this.controller = new AbortController();
    }
    messages(guildId, threadId, { before, after, limit = 100 } = {}) {
        if (!validId(guildId) || !validId(threadId) || !Number.isInteger(limit) || limit < 1 || limit > 100 || (before !== undefined && after !== undefined) || (before !== undefined && !validId(before)) || (after !== undefined && !validId(after))) return Promise.reject(invalidInput());
        const query = { url: `https://discord.com/channels/${guildId}/${threadId}`, limit, ...(before ? { before } : {}), ...(after ? { after } : {}) };
        return this.enqueue('/v1/messages', query, data => validatePage(data, guildId, threadId, { before, after, limit }));
    }
    message(guildId, threadId, messageId) {
        if (![guildId, threadId, messageId].every(validId)) return Promise.reject(invalidInput());
        return this.enqueue('/v1/message', { url: `https://discord.com/channels/${guildId}/${threadId}/${messageId}` }, data => {
            if (!data || !validMessage(data.message, guildId, threadId) || data.message.id !== messageId) throw invalidResponse();
            return { message: data.message };
        });
    }
    close() { if (!this.closed) { this.closed = true; this.controller.abort(); } }
    enqueue(path, params, validate) {
        if (this.closed) return Promise.reject(closedError());
        if (this.pending >= 51) return Promise.reject(new DiscordReaderError(429, 'queue_full', 1, 'Reader queue is full.'));
        this.pending++;
        const queuedAt = performance.now();
        const mode = path === '/v1/message' ? 'exact' : params.before ? 'before' : params.after ? 'after' : 'latest';
        const run = this.tail.then(() => {
            this.debug.write('reader_queue', { ms: performance.now() - queuedAt, depth: this.pending - 1, mode, limit: params.limit, discordUrl: params.url, cursor: params.before || params.after });
            return this.request(path, params, validate);
        });
        this.tail = run.catch(() => {}).finally(() => { this.pending--; });
        return run;
    }
    async request(path, params, validate) {
        if (this.closed) throw closedError();
        const url = new URL(this.baseUrl);
        url.pathname = `${url.pathname.replace(/\/$/, '')}${path}`;
        url.search = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString();
        for (let attempt = 0; attempt < 3; attempt++) {
            if (this.closed) throw closedError();
            const controller = new AbortController();
            const abort = () => controller.abort();
            this.controller.signal.addEventListener('abort', abort, { once: true });
            const timer = setTimeout(abort, 110000);
            const started = performance.now();
            try {
                const response = await this.fetch(url, { method: 'GET', headers: { Authorization: `Bearer ${this.apiKey}` }, redirect: 'error', signal: controller.signal });
                const isJson = response.headers.get('content-type')?.toLowerCase().split(';')[0].trim() === 'application/json';
                let data = null;
                if (isJson) { try { data = await response.json(); } catch {} }
                else { try { await response.body?.cancel(); } catch {} }
                this.debug.write('reader_response', { ms: performance.now() - started, status: response.status, attempt: attempt + 1, count: Array.isArray(data?.messages) ? data.messages.length : undefined });
                if (response.status === 429) {
                    const raw = response.headers.get('retry-after');
                    const seconds = raw && /^\d+$/.test(raw) ? Number(raw) : NaN;
                    const code = responseCode(data);
                    if (!Number.isSafeInteger(seconds) || seconds <= 0 || seconds * 1000 > MAX_TIMER || attempt === 2) throw httpError(429, code, Number.isSafeInteger(seconds) ? seconds : null, 'The reader service is rate limited.');
                    await this.debug.time('reader_retry', () => this.wait(seconds * 1000 + Math.random() * 250), { attempt: attempt + 1 });
                    continue;
                }
                if ([500, 502].includes(response.status)) {
                    const code = responseCode(data);
                    if (attempt === 2) throw httpError(response.status, code, null, 'The reader service is temporarily unavailable.');
                    await this.debug.time('reader_retry', () => this.wait((250 * 2 ** attempt) + Math.random() * 250), { attempt: attempt + 1 }); continue;
                }
                if (!response.ok) throw httpError(response.status, responseCode(data), null, statusMessage(response.status));
                if (!isJson || data === null) throw invalidResponse();
                try { return validate(data); } catch { throw invalidResponse(); }
            } catch (error) {
                this.debug.write('reader_error', { ms: performance.now() - started, attempt: attempt + 1, status: error.status, upstreamStatus: error.readerStatus, aborted: controller.signal.aborted });
                if (error instanceof DiscordReaderError) throw error;
                if (this.closed) throw closedError();
                if (controller.signal.aborted) throw timeoutError();
                throw new DiscordReaderError(503, 'reader_network_error', null, 'The reader service could not be reached.');
            } finally {
                clearTimeout(timer); this.controller.signal.removeEventListener('abort', abort);
            }
        }
        throw invalidResponse();
    }
    async wait(ms) {
        if (this.closed) throw closedError();
        try { await this.sleep(ms, { signal: this.controller.signal }); if (this.closed) throw closedError(); }
        catch { if (this.closed) throw closedError(); throw new DiscordReaderError(503, 'reader_retry_wait_failed', null, 'The reader service is temporarily unavailable.'); }
    }
}

function validMessage(m, guild, channel) {
    const expectedUrl = `https://discord.com/channels/${guild}/${channel}/${m?.id}`;
    return object(m) && validId(m.id) && m.channel_id === channel && m.guild_id === guild
        && m.url === expectedUrl && typeof m.content === 'string'
        && Array.isArray(m.attachments) && m.attachments.every(object)
        && Array.isArray(m.embeds) && m.embeds.every(object)
        && (m.author === null || (object(m.author)
            && (m.author.id === undefined || validId(m.author.id))
            && (m.author.username === undefined || typeof m.author.username === 'string')
            && typeof m.author.bot === 'boolean'
            && (m.author.avatar_url === undefined || validAvatarUrl(m.author.avatar_url))
            && (m.author.global_name === null || typeof m.author.global_name === 'string')))
        && (m.webhook_id === undefined || m.webhook_id === null || validId(m.webhook_id))
        && (!('timestamp' in m) || validTimestamp(m.timestamp))
        && ('edited_timestamp' in m && (m.edited_timestamp === null || validTimestamp(m.edited_timestamp)))
        && typeof m.pinned === 'boolean' && (!('type' in m) || Number.isInteger(m.type));
}
function validAvatarUrl(value) {
    return typeof value === 'string' && value === value.trim() && /^https:\/\/cdn\.discordapp\.com\/(?:avatars\/\d{16,20}\/(?:a_)?[a-f0-9]{32}\.webp\?size=128|embed\/avatars\/[0-5]\.png)$/.test(value);
}
function object(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function validatePage(data, guild, channel, { before, after, limit }) {
    const list = data?.messages, p = data?.pagination;
    if (data?.channel_id !== channel || !Array.isArray(list) || list.length > limit || p?.count !== list.length || p?.limit !== limit || list.some(m => !validMessage(m, guild, channel))) throw invalidResponse();
    for (let i = 1; i < list.length; i++) if (BigInt(list[i - 1].id) <= BigInt(list[i].id)) throw invalidResponse();
    if (before && list.some(m => BigInt(m.id) >= BigInt(before))) throw invalidResponse();
    if (after && list.some(m => BigInt(m.id) <= BigInt(after))) throw invalidResponse();
    const full = list.length === limit;
    if (p.next_before !== (full ? list.at(-1)?.id : null) || p.next_after !== (full ? list[0]?.id : null)) throw invalidResponse();
    return data;
}
function validTimestamp(v) { return typeof v === 'string' && Number.isFinite(Date.parse(v)); }
function safeCode(v) { return typeof v === 'string' && SAFE_CODE.test(v) ? v : null; }
function responseCode(data) { return safeCode(data?.error?.code); }
function httpError(status, code, retryAfter, message) { return new DiscordReaderError(status === 429 ? 429 : 503, code, retryAfter, message, status); }
function statusMessage(status) { return status === 401 ? 'The reader service rejected its credentials.' : status === 403 ? 'The reader service denied access to this Discord resource.' : status === 404 ? 'The requested Discord resource was not found.' : 'The reader service returned an error.'; }
function invalidInput() { return new DiscordReaderError(400, null, null, 'Invalid Discord reader request.'); }
function invalidResponse() { return new DiscordReaderError(503, 'reader_invalid_response', null, 'The reader service returned an invalid response.'); }
function closedError() { return new DiscordReaderError(503, 'reader_closed', null, 'The reader client is closed.'); }
function timeoutError() { return new DiscordReaderError(503, 'reader_timeout', null, 'The reader service timed out.'); }
function defaultSleep(ms, { signal } = {}) { return timerSleep(ms, undefined, { signal }); }

module.exports = { DiscordReader, DiscordReaderError, isSnowflake: validId };
