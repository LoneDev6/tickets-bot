const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { createHash, randomBytes } = require('node:crypto');
const { prepare, configureSecrets, ensureConnector, downloadVerified } = require('../bootstrap');

function directory(t) {
    const root = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'tickets-bootstrap-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    return root;
}
function put(root, file, value = '{}') {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), value);
}

test('startup uses the prebuilt panel without frontend dependencies or compilation and isolates installer secrets', async t => {
    const root = directory(t);
    for (const file of ['package.json', 'package-lock.json']) put(root, file);
    put(root, 'web/dist/index.html', '<script type="module" src="/assets/panel.js"></script>');
    put(root, 'web/dist/assets/panel.js', 'synthetic compiled panel');
    const calls = [];
    const options = { log() {}, env: { PATH: '/synthetic/bin', NODE_ENV: 'production', DISCORD_TOKEN: 'private', VITE_SECRET: 'private', SESSION_SECRET: 'private', npm_config_prefix: '/incompatible' },
        run(command, args, settings) {
            calls.push({ command, args, settings });
            assert.equal(settings.cwd, root);
            assert.equal(args[0], 'ci');
            for (const name of ['discord.js', 'dotenv', 'enmap', 'express', 'express-session', 'memorystore']) put(root, `node_modules/${name}/package.json`);
            put(root, 'node_modules/better-sqlite3/build/Release/better_sqlite3.node', 'synthetic native module');
        },
    };
    await prepare(root, options);
    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0].args, ['ci', '--include=dev', '--no-audit', '--no-fund']);
    for (const call of calls) { assert.equal(call.command, 'npm'); assert.deepEqual(call.settings.env, { PATH: '/synthetic/bin' }); assert.equal(call.settings.shell, false); }
    await prepare(root, options); assert.equal(calls.length, 1);
    put(root, 'web/src/App.tsx', 'changed source');
    await prepare(root, options); assert.equal(calls.length, 1);
    put(root, 'web/package-lock.json', '{"changed":true}');
    await prepare(root, options); assert.equal(calls.length, 1);
    put(root, 'package-lock.json', '{"changed":true}');
    await prepare(root, options); assert.equal(calls.length, 2);
    assert.equal(fs.existsSync(path.join(root, 'web/node_modules')), false);
    assert.equal(typeof require('../index').main, 'function');
});

test('failed dependency preparation never marks the installation complete', async t => {
    const root = directory(t);
    put(root, 'package.json'); put(root, 'package-lock.json');
    put(root, 'web/dist/index.html', 'synthetic compiled panel');
    await assert.rejects(prepare(root, { log() {}, run() { throw new Error('synthetic npm error'); } }), /Preparazione npm fallita/);
    assert.equal(fs.existsSync(path.join(root, 'node_modules/.tickets-prepared')), false);
});

test('missing or incomplete distributed panel fails clearly without starting an installer or compiler', async t => {
    const root = directory(t);
    const options = { log() {}, run() { assert.fail('No installation or build should start'); } };
    await assert.rejects(prepare(root, options), /Build pannello mancante/);
    put(root, 'web/dist/index.html', '<link href="/assets/missing.css" rel="stylesheet">');
    await assert.rejects(prepare(root, options), /Build pannello incompleta/);
});

test('cancelling dependency preparation never writes the completion stamp', async t => {
    const root = directory(t);
    put(root, 'package.json'); put(root, 'package-lock.json'); put(root, 'web/dist/index.html', 'synthetic panel');
    const controller = new AbortController();
    const preparing = prepare(root, { signal: controller.signal, log() {}, run(_command, _args, { signal }) {
        return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }));
    } });
    controller.abort();
    await assert.rejects(preparing, { name: 'AbortError' });
    assert.equal(fs.existsSync(path.join(root, 'node_modules/.tickets-prepared')), false);
});

test('cancelling the real installer terminates its process group, including a stubborn descendant', { timeout: 8000, skip: process.platform !== 'linux' }, async t => {
    const root = directory(t);
    put(root, 'package.json'); put(root, 'package-lock.json'); put(root, 'web/dist/index.html', 'synthetic panel');
    const pidsFile = path.join(root, 'installer-pids.json');
    put(root, 'npm', `#!${process.execPath}
const fs = require('node:fs');
if (process.argv[2] === 'child') {
    process.on('SIGTERM', () => {});
    setInterval(() => {}, 1000);
    process.send('ready');
} else {
    process.on('SIGTERM', () => process.exit(0));
    const child = require('node:child_process').fork(__filename, ['child'], { stdio: ['ignore', 'ignore', 'ignore', 'ipc'] });
    child.once('message', () => fs.writeFileSync('installer-pids.json', JSON.stringify([process.pid, child.pid])));
}
`);
    fs.chmodSync(path.join(root, 'npm'), 0o700);
    const controller = new AbortController();
    const preparing = prepare(root, { signal: controller.signal, log() {}, env: { PATH: root, TMPDIR: process.env.TMPDIR } });
    let pids = [];
    try {
        for (let attempt = 0; attempt < 150 && !fs.existsSync(pidsFile); attempt++) await new Promise(resolve => setTimeout(resolve, 10));
        assert(fs.existsSync(pidsFile), 'synthetic installer must start');
        pids = JSON.parse(fs.readFileSync(pidsFile));
        controller.abort();
        await assert.rejects(preparing, { name: 'AbortError' });
        const alive = pid => {
            try { return fs.readFileSync(`/proc/${pid}/stat`, 'utf8').split(') ')[1][0] !== 'Z'; }
            catch (error) { if (error.code === 'ENOENT') return false; throw error; }
        };
        for (let attempt = 0; attempt < 100 && pids.some(alive); attempt++) await new Promise(resolve => setTimeout(resolve, 10));
        assert(pids.every(pid => !alive(pid)), 'no installer process may survive cancellation');
        assert.equal(fs.existsSync(path.join(root, 'node_modules/.tickets-prepared')), false);
    } finally {
        controller.abort();
        await preparing.catch(() => {});
        for (const pid of pids) { try { process.kill(pid, 'SIGKILL'); } catch (error) { if (error.code !== 'ESRCH') throw error; } }
    }
});

test('cancelling a connector body removes its partial download', async t => {
    const root = directory(t);
    const file = path.join(root, 'connector');
    const controller = new AbortController();
    const downloading = downloadVerified('https://synthetic.invalid/binary', file, '0'.repeat(64), async () => new Response(new ReadableStream({
        start(stream) { stream.enqueue(new Uint8Array([1, 2, 3])); },
    })), controller.signal);
    await new Promise(resolve => setImmediate(resolve));
    controller.abort();
    await assert.rejects(downloading, { name: 'AbortError' });
    assert.deepEqual(fs.readdirSync(root), []);
});

test('generated secrets survive restart, stay private and cannot be silently replaced', t => {
    const root = directory(t);
    const env = {};
    configureSecrets(root, env);
    assert.equal(Buffer.from(env.TICKET_ENCRYPTION_KEY, 'base64').length, 32);
    assert(env.SESSION_SECRET.length >= 32);
    const file = path.join(root, '.runtime/secrets.json');
    const original = fs.readFileSync(file, 'utf8');
    const restarted = {};
    configureSecrets(root, restarted); assert.deepEqual(restarted, env);
    assert.equal(fs.statSync(file).mode & 0o777, 0o600);
    assert.equal(fs.statSync(path.dirname(file)).mode & 0o777, 0o700);
    assert.throws(() => configureSecrets(root, { TICKET_ENCRYPTION_KEY: randomBytes(32).toString('base64') }), /differisce/);
    assert.equal(fs.readFileSync(file, 'utf8'), original);
    fs.writeFileSync(file, 'invalid JSON containing a secret');
    assert.throws(() => configureSecrets(root, {}), error => error.startup && !error.message.includes('containing a secret'));
});

test('provided keys are persisted unchanged and malformed keys are rejected', t => {
    const root = directory(t);
    assert.throws(() => configureSecrets(root, { TICKET_ENCRYPTION_KEY: 'bad' }), /non valido/);
    assert.equal(fs.existsSync(path.join(root, '.runtime/secrets.json')), false);
    const supplied = { TICKET_ENCRYPTION_KEY: randomBytes(32).toString('base64'), SESSION_SECRET: 's'.repeat(48) };
    configureSecrets(root, supplied);
    const restarted = {};
    configureSecrets(root, restarted); assert.deepEqual(restarted, supplied);
});

test('connector download verifies bytes before atomic replacement and removes failed partial files', async t => {
    const root = directory(t);
    const file = path.join(root, 'cloudflared');
    const data = Buffer.from('synthetic binary; never executed');
    const expected = createHash('sha256').update(data).digest('hex');
    const fake = async () => new Response(data);
    await downloadVerified('https://synthetic.invalid/binary', file, expected, fake);
    assert.deepEqual(fs.readFileSync(file), data);
    assert.equal(fs.statSync(file).mode & 0o777, 0o700);
    await assert.rejects(downloadVerified('https://synthetic.invalid/binary', file, '0'.repeat(64), fake), /Checksum/);
    assert.deepEqual(fs.readFileSync(file), data);
    assert.deepEqual(fs.readdirSync(root), ['cloudflared']);
    await assert.rejects(downloadVerified('https://synthetic.invalid/binary', file, expected, async () => new Response('', { status: 503 })), /Download/);
    assert.deepEqual(fs.readdirSync(root), ['cloudflared']);
});

test('automatic connector is optional, honors explicit paths and uses only pinned official assets', async t => {
    const root = directory(t);
    const options = { log() {}, fetchImpl: async url => { assert.match(url, /^https:\/\/github\.com\/cloudflare\/cloudflared\/releases\/download\/2026\.10\.2\/cloudflared-linux-amd64$/); return new Response('wrong binary'); }, platform: 'linux', arch: 'x64' };
    await ensureConnector(root, {}, options);
    await assert.rejects(ensureConnector(root, { TUNNEL_TOKEN: 'cloudflared tunnel run --token synthetic' }, options), /solo il token/);
    await ensureConnector(root, { TUNNEL_TOKEN: 'synthetic', CLOUDFLARED_PATH: '/user-provided/binary' }, options);
    const env = { TUNNEL_TOKEN: 'synthetic' };
    await assert.rejects(ensureConnector(root, env, options), /Checksum/);
    assert.equal(env.CLOUDFLARED_PATH, undefined);
    assert.deepEqual(fs.readdirSync(path.join(root, '.runtime')), []);
    await assert.rejects(ensureConnector(root, env, { ...options, arch: 'unsupported' }), /Linux x64\/arm64/);
});
