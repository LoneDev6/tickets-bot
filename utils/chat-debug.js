const fs = require('node:fs/promises');
const { existsSync } = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { AsyncLocalStorage } = require('node:async_hooks');
const { performance, monitorEventLoopDelay } = require('node:perf_hooks');

const EVENTS = new Set(['process_start', 'http_start', 'http_end', 'staff_auth', 'staff_recheck', 'ticket_queue', 'reader_sync', 'reader_queue', 'reader_response', 'reader_error', 'reader_retry', 'persist', 'snapshot', 'browser_ready', 'shutdown_requested', 'shutdown_complete', 'shutdown_timeout', 'shutdown_error']);
const OPS = new Set(['session', 'list', 'detail', 'messages', 'browser', 'lifecycle', 'reply', 'mentions']);
const TRIGGERS = new Set(['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT', 'console stop', 'console interrupt', 'startup failure']);
const MODES = new Set(['latest', 'before', 'after', 'exact']);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const BOOLEANS = ['cached', 'syncing', 'shared', 'failed', 'visible', 'aborted'];
const NUMBERS = { ms: 600000, firstDataMs: 600000, moduleMs: 600000, readyMs: 600000, loopMaxMs: 600000, loopMeanMs: 600000, contentBytes: 20_000_000, count: 10000, limit: 100, depth: 51, attempt: 3, status: 599, upstreamStatus: 599 };

function createChatDebug({ directory = path.join(__dirname, '..', '.runtime'), maxBytes = 2 * 1024 * 1024 } = {}) {
    const storage = new AsyncLocalStorage();
    let queue = Promise.resolve();
    let pending = 0;
    let warned = false;
    let loop;
    const enabled = () => {
        const on = existsSync(path.join(directory, 'chat-debug.enabled'));
        if (on && !loop) { loop = monitorEventLoopDelay({ resolution: 20 }); loop.enable(); }
        if (!on && loop) { loop.disable(); loop = undefined; }
        return on;
    };
    const warn = () => {
        if (warned) return;
        warned = true;
        console.warn('Chat debug logging unavailable.');
    };
    const append = async line => {
        await fs.mkdir(directory, { recursive: true, mode: 0o700 });
        const file = path.join(directory, 'chat-debug.ndjson');
        let size = 0;
        try { size = (await fs.stat(file)).size; } catch (error) { if (error.code !== 'ENOENT') throw error; }
        if (size + Buffer.byteLength(line) > maxBytes) {
            try { await fs.unlink(`${file}.1`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
            try { await fs.rename(file, `${file}.1`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
        }
        await fs.appendFile(file, line, { mode: 0o600 });
        await fs.chmod(file, 0o600);
    };
    const write = (event, fields = {}) => {
        if (!EVENTS.has(event) || !enabled()) return;
        if (event === 'http_end' && loop) {
            fields = { ...fields, loopMaxMs: loop.max / 1e6, loopMeanMs: loop.mean / 1e6 };
            loop.reset();
        }
        const context = storage.getStore() || {};
        const safe = {};
        for (const [key, value] of Object.entries({ ...context, ...fields })) {
            if (key === 'requestId' || key === 'viewId') { if (typeof value === 'string' && UUID.test(value)) safe[key] = value; }
            else if (['ticketId', 'messageId', 'cursor'].includes(key)) { if (typeof value === 'string' && /^\d{16,22}$/.test(value)) safe[key] = value; }
            else if (key === 'discordUrl') { if (typeof value === 'string' && /^https:\/\/discord\.com\/channels\/\d{16,22}\/\d{16,22}(?:\/\d{16,22})?$/.test(value)) safe[key] = value; }
            else if (key === 'requestPath') { if (typeof value === 'string' && /^\/api\/(?:session|tickets(?:\/\d{16,22}(?:\/(?:messages|mentions|reply|read|actions))?)?|debug\/chat)$/.test(value)) safe[key] = value; }
            else if (key === 'op') { if (OPS.has(value)) safe[key] = value; }
            else if (key === 'mode') { if (MODES.has(value)) safe[key] = value; }
            else if (key === 'trigger') { if (TRIGGERS.has(value)) safe[key] = value; }
            else if (Object.hasOwn(NUMBERS, key)) {
                const min = key === 'status' || key === 'upstreamStatus' ? 100 : 0;
                if (typeof value === 'number' && Number.isFinite(value) && value >= min && value <= NUMBERS[key]) safe[key] = value;
            } else if (BOOLEANS.includes(key) && typeof value === 'boolean') safe[key] = value;
        }
        const line = `${JSON.stringify({ ts: new Date().toISOString(), event, ...safe })}\n`;
        if (pending >= 200) { warn(); return; }
        pending++;
        queue = queue.then(async () => {
            if (enabled()) await append(line);
        }).catch(warn).finally(() => { pending--; });
    };
    const api = {
        enabled,
        run(context, fn) {
            if (!context || typeof fn !== 'function') return fn?.();
            if (!enabled()) return fn();
            const store = { requestId: randomUUID(), op: context.op, viewId: context.viewId, ticketId: context.ticketId, requestPath: context.requestPath };
            return storage.run(store, fn);
        },
        current: () => storage.getStore(),
        write,
        time(event, fn, fields = {}) {
            if (!enabled()) return fn();
            const start = performance.now();
            const log = (failed, error) => write(event, { ...fields, ...(error && { status: error.status, upstreamStatus: error.readerStatus ?? error.upstreamStatus }), ms: Math.min(performance.now() - start, 600000), failed });
            try {
                const result = fn();
                if (result && typeof result.then === 'function') return result.then(value => { log(false); return value; }, error => { log(true, error); throw error; });
                log(false);
                return result;
            } catch (error) { log(true, error); throw error; }
        },
        flush: () => queue,
    };
    if (enabled()) write('process_start');
    return api;
}

const chatDebug = createChatDebug();
module.exports = { chatDebug, createChatDebug };
