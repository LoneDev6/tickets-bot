const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const harness = `
if (process.env.TEST_CHAT_DEBUG_DIR) {
    const debug = require('./utils/chat-debug');
    debug.chatDebug = debug.createChatDebug({ directory: process.env.TEST_CHAT_DEBUG_DIR });
}
const { run } = require('./index');
const mode = process.argv[1];
if (mode.startsWith('bot-')) {
    const { EventEmitter } = require('node:events');
    const http = require('node:http');
    const sdk = require('discord.js');
    const replace = (file, exports) => { require.cache[require.resolve(file)] = { exports }; };
    class Database extends Map {
        constructor({ name }) { super(); this.name = name; this.db = { pragma() {} }; }
        close() { console.log('DB_CLOSED ' + this.name); }
    }
    class Client extends EventEmitter {
        constructor() {
            super();
            this.guilds = { fetch: async () => {
                console.log('INITIALIZING');
                await new Promise(resolve => setTimeout(resolve, 150));
                console.log('INITIALIZATION_RESOLVED');
                return { commands: { create: () => { throw new Error('Must not continue initialization after stop'); } } };
            } };
        }
        login() {
            console.log('LOGIN');
            if (mode === 'bot-initializing') { this.emit(sdk.Events.ClientReady); return Promise.resolve(); }
            return new Promise(() => {});
        }
        async destroy() {
            console.log('DISCORD_STOPPING');
            await new Promise(resolve => setTimeout(resolve, 30));
            console.log('DISCORD_STOPPED');
        }
    }
    class Service {
        stop() { console.log('SERVICE_STOPPED'); }
    }
    replace('dotenv', { config() {} });
    replace('enmap', Database);
    replace('discord.js', { ...sdk, Client });
    replace('./settings', { loadSettings: () => ({ discordToken: 'synthetic', encryptionKey: Buffer.alloc(32).toString('base64'), host: '127.0.0.1', port: Number(process.argv[2] || 0) }) });
    replace('./ticket-service', { TicketService: Service });
    replace('./server', { createApp: () => {
        let stream;
        return {
            locals: { close() { console.log('SSE_STOPPED'); stream?.end(); if (mode === 'bot-close-error') throw new Error('synthetic close error'); } },
            listen(port, host) {
                const server = http.createServer((_req, res) => { stream = res; res.writeHead(200); res.write('data: connected\\n\\n'); console.log('STREAM_OPEN'); });
                server.on('close', () => console.log('HTTP_STOPPED'));
                server.listen(port, host, () => {
                    console.log('PORT ' + server.address().port);
                    if (mode === 'bot-stream') {
                        http.get('http://' + host + ':' + server.address().port, res => res.resume()).on('error', () => {});
                    }
                });
                return server;
            },
        };
    } });
    replace('./tunnel', { startTunnel: () => ({ stop: async () => {
        console.log('TUNNEL_STOPPING');
        await new Promise(resolve => setTimeout(resolve, 60));
        console.log('TUNNEL_STOPPED');
    } }) });
    run({ start: options => require('./bot').main(options), shutdownTimeoutMs: 2000 });
} else {
    run({ shutdownTimeoutMs: mode === 'hung' ? 180 : 2000, start: async ({ signal, onShutdown }) => {
        if (mode === 'startup') {
            console.log('READY');
            await new Promise((_resolve, reject) => signal.addEventListener('abort', () => {
                console.log('STARTUP_CANCELLED'); reject(signal.reason);
            }, { once: true }));
        }
        onShutdown(async () => {
            console.log('CLEANUP_START');
            if (mode === 'hung') return new Promise(() => {});
            await new Promise(resolve => setTimeout(resolve, 80));
            if (mode === 'failure') throw new Error('synthetic cleanup failure');
            console.log('CLEANUP_DONE');
        });
        console.log('READY');
        return new Promise(() => {});
    } });
}
`;

function launch(t, mode, port = 0, debugDirectory) {
    const child = spawn(process.execPath, ['-e', harness, mode, String(port)], {
        cwd: root, env: { PATH: process.env.PATH, TMPDIR: process.env.TMPDIR, DATA_DIR: process.env.TMPDIR, ...(debugDirectory ? { TEST_CHAT_DEBUG_DIR: debugDirectory } : {}) },
        stdio: ['pipe', 'pipe', 'pipe'],
    });
    let output = '';
    const waiting = new Set();
    const finished = new Promise((resolve, reject) => {
        child.once('error', reject);
        child.once('close', (code, signal) => resolve({ code, signal }));
    });
    const collect = chunk => {
        output += chunk;
        for (const check of waiting) check();
    };
    child.stdout.on('data', collect); child.stderr.on('data', collect);
    t.after(async () => {
        if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
        await finished;
        assert(child.exitCode !== null || child.signalCode !== null, 'task child must not survive the test');
    });
    const waitFor = (text, timeoutMs = 4000) => new Promise((resolve, reject) => {
        const timer = setTimeout(() => { waiting.delete(check); reject(new Error('Missing ' + text + ': ' + output)); }, timeoutMs);
        const check = () => {
            if (!output.includes(text)) return;
            clearTimeout(timer); waiting.delete(check); resolve();
        };
        waiting.add(check); check();
    });
    return { child, finished, waitFor, get output() { return output; } };
}

test('console stop, fragmented CRLF and Unix signals exit cleanly even before startup returns', { timeout: 12_000 }, async t => {
    for (const command of ['stop', 'exit', 'quit', '^C', 'SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT']) await t.test(command, async t => {
        const f = launch(t, 'pending-login');
        await f.waitFor('READY');
        f.child.stdin.write('unrelated console input\n');
        if (command.startsWith('SIG')) f.child.kill(command);
        else { f.child.stdin.write(command.slice(0, 2)); f.child.stdin.write(command.slice(2) + '\r\n'); }
        await f.waitFor('CLEANUP_START');
        f.child.kill('SIGTERM');
        assert.deepEqual(await f.finished, { code: 0, signal: null });
        assert.equal(f.output.split('CLEANUP_START').length - 1, 1);
        assert.match(f.output, /CLEANUP_DONE/);
    });
});

test('bare ETX and fragmented ^C interrupt the console without a newline', { timeout: 6000 }, async t => {
    for (const [name, send] of [
        ['ETX', child => child.stdin.write('\u0003')],
        ['fragmented ^C', async child => { child.stdin.write('^'); await new Promise(resolve => setTimeout(resolve, 20)); child.stdin.write('C'); }],
    ]) await t.test(name, async t => {
        const f = launch(t, 'pending-login');
        await f.waitFor('READY');
        await send(f.child);
        await f.waitFor('CLEANUP_START', 1200);
        assert.deepEqual(await f.finished, { code: 0, signal: null }, f.output);
        assert.equal(f.output.split('CLEANUP_START').length - 1, 1);
        assert.match(f.output, /CLEANUP_DONE/);
    });
});

test('a stopped bot can restart immediately on the same HTTP port', { timeout: 8000 }, async t => {
    const first = launch(t, 'bot-stream');
    await first.waitFor('STREAM_OPEN');
    const port = Number(first.output.match(/PORT (\d+)/)[1]);
    first.child.kill('SIGTERM');
    assert.deepEqual(await first.finished, { code: 0, signal: null }, first.output);
    const restarted = launch(t, 'bot-stream', port);
    await restarted.waitFor('STREAM_OPEN');
    restarted.child.stdin.write('stop\n');
    assert.deepEqual(await restarted.finished, { code: 0, signal: null }, restarted.output);
    assert.doesNotMatch(restarted.output, /EADDRINUSE|Startup failed|Shutdown timed out/);
});

test('startup cancellation, stuck cleanup and failed cleanup have bounded exit behavior', { timeout: 8000 }, async t => {
    for (const [mode, expected] of [['startup', 0], ['hung', 1], ['failure', 1]]) await t.test(mode, async t => {
        const f = launch(t, mode);
        await f.waitFor('READY');
        f.child.kill('SIGINT');
        assert.deepEqual(await f.finished, { code: expected, signal: null });
        if (mode === 'startup') assert.match(f.output, /STARTUP_CANCELLED/);
        if (mode === 'hung') assert.match(f.output, /Shutdown timed out/);
        if (mode === 'failure') assert.match(f.output, /Shutdown failed/);
    });
});

test('real bot shutdown drains HTTP, SSE and initialization and closes both databases despite another close error', { timeout: 12_000 }, async t => {
    for (const mode of ['bot-login', 'bot-stream', 'bot-initializing', 'bot-close-error']) await t.test(mode, async t => {
        const f = launch(t, mode);
        await f.waitFor(mode === 'bot-stream' ? 'STREAM_OPEN' : mode === 'bot-initializing' ? 'INITIALIZING' : 'LOGIN');
        f.child.stdin.write('stop\n');
        assert.deepEqual(await f.finished, { code: mode === 'bot-close-error' ? 1 : 0, signal: null }, f.output);
        for (const item of ['SERVICE_STOPPED', 'SSE_STOPPED', 'TUNNEL_STOPPED', 'DISCORD_STOPPED', 'HTTP_STOPPED', 'DB_CLOSED botData', 'DB_CLOSED privateTickets']) assert.match(f.output, new RegExp(item));
        assert(f.output.indexOf('DISCORD_STOPPING') < f.output.indexOf('TUNNEL_STOPPED'), 'Discord stops concurrently with the connector');
        assert(f.output.indexOf('DB_CLOSED') > f.output.indexOf('DISCORD_STOPPED'));
        if (mode === 'bot-initializing') assert(f.output.indexOf('DB_CLOSED') > f.output.indexOf('INITIALIZATION_RESOLVED'));
        assert.doesNotMatch(f.output, /Private ticket service ready|Must not continue initialization|Shutdown timed out/);
    });
});


test('shutdown diagnostics flush before exit, including timeout and failure', { timeout: 8000 }, async t => {
    const fs = require('node:fs/promises');
    const os = require('node:os');
    for (const [mode, code, ending] of [['pending-login', 0, 'shutdown_complete'], ['hung', 1, 'shutdown_timeout'], ['failure', 1, 'shutdown_error']]) {
        const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'shutdown-debug-'));
        t.after(() => fs.rm(directory, { recursive: true, force: true }));
        await fs.writeFile(path.join(directory, 'chat-debug.enabled'), '');
        const f = launch(t, mode, 0, directory);
        await f.waitFor('READY'); f.child.stdin.write('\u0003');
        assert.deepEqual(await f.finished, { code, signal: null });
        const text = await fs.readFile(path.join(directory, 'chat-debug.ndjson'), 'utf8');
        const entries = text.trim().split('\n').map(JSON.parse);
        assert(entries.some(entry => entry.event === 'shutdown_requested' && entry.trigger === 'console interrupt'));
        assert(entries.some(entry => entry.event === ending));
        assert(!text.includes('synthetic cleanup failure'));
    }
});
