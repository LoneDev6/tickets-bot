const test = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { spawn } = require('node:child_process');
const { startTunnel } = require('../tunnel');

test('cloudflared runs without a shell, with an isolated token, and stops only its own child', async () => {
    let spawned; let killed;
    const child = new EventEmitter();
    child.exitCode = null; child.signalCode = null; child.stderr = new EventEmitter();
    child.kill = signal => { killed = signal; child.exitCode = 0; queueMicrotask(() => child.emit('exit', 0)); return true; };
    const tunnel = startTunnel({ tunnelToken: 'synthetic-token', cloudflaredPath: './bin/cloudflared', publicBaseUrl: 'https://tickets.example.com', tunnelProtocol: 'http2' }, {
        spawnImpl: (file, args, options) => { spawned = { file, args, options }; return child; },
    });
    assert.equal(spawned.options.shell, false);
    assert(!spawned.args.includes('synthetic-token'));
    assert.equal(spawned.options.env.TUNNEL_TOKEN, 'synthetic-token');
    assert.equal(spawned.options.env.DISCORD_TOKEN, undefined);
    await tunnel.stop(); assert.equal(killed, 'SIGTERM');
});

test('a stuck connector is killed after the grace period and repeated stops share cleanup', { timeout: 8000 }, async t => {
    let child;
    const tunnel = startTunnel({ tunnelToken: 'synthetic-token', cloudflaredPath: './synthetic-connector', publicBaseUrl: 'https://tickets.example.com', tunnelProtocol: 'http2' }, {
        spawnImpl: () => {
            child = spawn(process.execPath, ['-e', "process.on('SIGTERM', () => {}); setInterval(() => {}, 1000); process.send('ready');"], { stdio: ['ignore', 'ignore', 'pipe', 'ipc'], env: {} });
            return child;
        },
    });
    const closed = new Promise(resolve => child.once('close', resolve));
    t.after(async () => { if (child.exitCode === null && !child.signalCode) child.kill('SIGKILL'); await closed; });
    await new Promise((resolve, reject) => { child.once('message', resolve); child.once('error', reject); });
    const stopped = tunnel.stop();
    assert.equal(tunnel.stop(), stopped);
    await stopped;
    await closed;
    assert.equal(child.signalCode, 'SIGKILL');
});
