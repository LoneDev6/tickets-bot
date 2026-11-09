const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { createChatDebug } = require('../utils/chat-debug');

async function fixture(t, maxBytes) {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'chat-debug-'));
    await fs.chmod(directory, 0o700);
    t.after(() => fs.rm(directory, { recursive: true, force: true }));
    const debug = createChatDebug({ directory, maxBytes });
    await fs.writeFile(path.join(directory, 'chat-debug.enabled'), 'ignored');
    return { directory, debug };
}

test('disabled logging creates no files', async t => {
    const { directory, debug } = await fixture(t);
    await fs.unlink(path.join(directory, 'chat-debug.enabled'));
    assert.equal(typeof debug.enabled(), 'boolean');
    assert.equal(debug.enabled(), false);
    assert.equal(debug.run({ op: 'list' }, () => debug.current()), undefined);
    assert.equal(debug.time('persist', () => 42), 42);
    const failure = new Error('private failure');
    assert.throws(() => debug.time('persist', () => { throw failure; }), error => error === failure);
    debug.write('http_start', { status: 200 });
    await debug.flush();
    await assert.rejects(fs.stat(path.join(directory, 'chat-debug.ndjson')), { code: 'ENOENT' });
});

test('writes only allowlisted fields and excludes secrets', async t => {
    const { directory, debug } = await fixture(t);
    debug.write('reader_response', { status: 200, ms: 12, count: 4, token: 'secret', url: 'private', name: 'Alice', failed: false });
    await debug.flush();
    const raw = await fs.readFile(path.join(directory, 'chat-debug.ndjson'), 'utf8');
    assert(!raw.includes('secret') && !raw.includes('private') && !raw.includes('Alice'));
    assert.deepEqual(JSON.parse(raw).status, 200);
    assert.equal((await fs.stat(path.join(directory, 'chat-debug.ndjson'))).mode & 0o777, 0o600);
});

test('time keeps safe status fields from rejected errors', async t => {
    const { directory, debug } = await fixture(t);
    const failure = Object.assign(new Error('secret payload'), { status: 502, upstreamStatus: 503, token: 'secret-token' });
    await assert.rejects(debug.time('reader_error', async () => { throw failure; }), error => error === failure);
    await debug.flush();
    const raw = await fs.readFile(path.join(directory, 'chat-debug.ndjson'), 'utf8');
    const entry = JSON.parse(raw.trim().split('\n').at(-1));
    assert.equal(entry.status, 502);
    assert.equal(entry.upstreamStatus, 503);
    assert.equal(entry.failed, true);
    assert(!raw.includes('secret payload') && !raw.includes('secret-token'));
});

test('parallel async contexts stay isolated and flag removal stops writes', async t => {
    const { directory, debug } = await fixture(t);
    await Promise.all(['list', 'detail'].map(op => debug.run({ op }, async () => {
        await new Promise(resolve => setImmediate(resolve));
        debug.write('http_start');
    })));
    await debug.flush();
    const file = path.join(directory, 'chat-debug.ndjson');
    const entries = (await fs.readFile(file, 'utf8')).trim().split('\n').map(JSON.parse);
    assert.deepEqual(entries.map(entry => entry.op).sort(), ['detail', 'list']);
    await fs.unlink(path.join(directory, 'chat-debug.enabled'));
    debug.write('http_end');
    await debug.flush();
    assert.equal((await fs.readFile(file, 'utf8')).trim().split('\n').length, 2);
});

test('rotation keeps only the current and previous log', async t => {
    const { directory, debug } = await fixture(t, 120);
    debug.write('reader_response', { ms: 10 });
    await debug.flush();
    debug.write('reader_response', { ms: 11 });
    await debug.flush();
    assert((await fs.stat(path.join(directory, 'chat-debug.ndjson.1'))).size > 0);
    assert((await fs.stat(path.join(directory, 'chat-debug.ndjson'))).size > 0);
    assert.deepEqual((await fs.readdir(directory)).filter(name => name.startsWith('chat-debug.ndjson')).sort(), ['chat-debug.ndjson', 'chat-debug.ndjson.1']);
});

test('filesystem failures are harmless and warn once', async t => {
    const parent = await fs.mkdtemp(path.join(os.tmpdir(), 'chat-debug-fail-'));
    t.after(() => fs.rm(parent, { recursive: true, force: true }));
    const directory = path.join(parent, 'logs');
    await fs.mkdir(directory);
    await fs.writeFile(path.join(directory, 'chat-debug.enabled'), '');
    const debug = createChatDebug({ directory });
    const warnings = [];
    const original = console.warn;
    const originalMkdir = fs.mkdir;
    console.warn = message => warnings.push(message);
    fs.mkdir = async () => { throw new Error('private path'); };
    try {
        debug.write('persist'); debug.write('persist');
        await debug.flush();
        assert.equal(warnings.length, 1);
        assert.doesNotThrow(() => debug.write('persist'));
    } finally { console.warn = original; fs.mkdir = originalMkdir; }
});


test('completed requests expose event-loop stalls without message data', async t => {
    const { directory, debug } = await fixture(t);
    debug.enabled();
    await new Promise(resolve => setTimeout(resolve, 40));
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 90);
    await new Promise(resolve => setTimeout(resolve, 40));
    debug.write('http_end', { status: 200 }); await debug.flush();
    const entries = (await fs.readFile(path.join(directory, 'chat-debug.ndjson'), 'utf8')).trim().split('\n').map(JSON.parse);
    const entry = entries.find(item => item.event === 'http_end');
    assert(entry.loopMaxMs >= 60); assert(Number.isFinite(entry.loopMeanMs));
    await fs.unlink(path.join(directory, 'chat-debug.enabled')); assert.equal(debug.enabled(), false);
});

test('authorized diagnostics accept only validated ticket routes/Discord URLs and size metadata', async t => {
    const { directory, debug } = await fixture(t);
    const ticketId = '120000000000000001'; const discordUrl = `https://discord.com/channels/120000000000000004/${ticketId}`;
    debug.run({ op: 'messages', ticketId, requestPath: `/api/tickets/${ticketId}/messages` }, () => debug.write('reader_queue', { discordUrl, contentBytes: 1200, cursor: '120000000000000003', content: 'private body', token: 'secret' }));
    debug.write('reader_queue', { discordUrl: discordUrl + '?token=secret', requestPath: '/api/tickets?authorization=secret', ticketId: 'invalid', cursor: 'secret' });
    await debug.flush();
    const rows = (await fs.readFile(path.join(directory, 'chat-debug.ndjson'), 'utf8')).trim().split('\n').map(JSON.parse);
    assert.equal(rows[0].ticketId, ticketId); assert.equal(rows[0].discordUrl, discordUrl); assert.equal(rows[0].contentBytes, 1200);
    assert.equal(rows[1].discordUrl, undefined); assert.equal(rows[1].requestPath, undefined); assert.equal(rows[1].ticketId, undefined);
    assert(!JSON.stringify(rows).includes('secret')); assert(!JSON.stringify(rows).includes('private body'));
});
