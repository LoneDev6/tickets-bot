'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { DiscordReader } = require('../discord-reader');

const guild = '123456789012345678', channel = '223456789012345678', id = '323456789012345678';
const cursor = '423456789012345678';
const msg = (mid = id) => ({ id: mid, channel_id: channel, guild_id: guild, url: `https://discord.com/channels/${guild}/${channel}/${mid}`, content: 'a & b', timestamp: '2026-11-01T00:00:00Z', edited_timestamp: null, pinned: false, author: { id, username: 'reader', bot: false, global_name: null }, attachments: [], embeds: [] });
const response = (body, status = 200, headers = {}) => ({ ok: status >= 200 && status < 300, status, headers: new Headers({ 'content-type': 'application/json', ...headers }), json: async () => body, body: { cancel: async () => {} } });
const page = (messages, limit = messages.length) => ({ channel_id: channel, messages, pagination: { count: messages.length, limit, next_before: messages.length === limit ? messages.at(-1).id : null, next_after: messages.length === limit ? messages[0].id : null } });
const make = (fetchImpl, sleep = async () => {}) => new DiscordReader({ baseUrl: 'https://reader.example/base/', apiKey: 'secret' }, { fetchImpl, sleep });

test('messages encodes Discord URL, preserves snowflakes, and validates page cursors', async () => {
    let opts, requested;
    const reader = make(async (url, options) => { requested = new URL(url); opts = options; return response(page([msg()], 1)); });
    const result = await reader.messages(guild, channel, { before: cursor, limit: 1 });
    assert.equal(result.messages[0].id, id);
    assert.equal(requested.pathname, '/base/v1/messages');
    assert.equal(requested.searchParams.get('url'), `https://discord.com/channels/${guild}/${channel}`);
    assert.equal(requested.searchParams.get('before'), cursor);
    assert.equal(opts.headers.Authorization, 'Bearer secret');
    assert.equal(opts.redirect, 'error');
    assert.equal(opts.signal.aborted, false);
    await reader.close();
});

test('single message requires exact ID and matching channel/guild', async () => {
    const reader = make(async () => response({ message: msg() }));
    assert.equal((await reader.message(guild, channel, id)).message.id, id);
    await reader.close();
});

test('reader accepts optional Discord CDN avatars and rejects unexpected URLs or webhook IDs', async () => {
    for (const avatar_url of [undefined, `https://cdn.discordapp.com/avatars/${id}/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.webp?size=128`,
        `https://cdn.discordapp.com/avatars/${id}/a_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.webp?size=128`,
        'https://cdn.discordapp.com/embed/avatars/5.png']) {
        const message = { ...msg(), author: { ...msg().author, ...(avatar_url ? { avatar_url } : {}) }, webhook_id: cursor };
        const reader = make(async () => response({ message }));
        assert.equal((await reader.message(guild, channel, id)).message.author.avatar_url, avatar_url); reader.close();
    }
    for (const change of [{ webhook_id: 123 }, { webhook_id: 'bad' }, ...[
        'https://evil.test/avatar.png', 'https://cdn.discordapp.com@evil.test/embed/avatars/1.png',
        'https://cdn.discordapp.com/embed/avatars/6.png', 'https://cdn.discordapp.com/embed/avatars/1.png\n',
    ].map(avatar_url => ({ author: { ...msg().author, avatar_url } }))]) {
        const reader = make(async () => response({ message: { ...msg(), ...change } }));
        await assert.rejects(reader.message(guild, channel, id), error => error.readerCode === 'reader_invalid_response'); reader.close();
    }
});

test('requests are serialized; 429 requires Retry-After and retries with injected sleep', async () => {
    let active = 0, maxActive = 0, calls = 0; const waits = [];
    const reader = make(async () => { active++; maxActive = Math.max(maxActive, active); await new Promise(r => setImmediate(r)); active--; return ++calls === 1 ? response({}, 429, { 'retry-after': '3' }) : response(page([], 100)); }, async ms => waits.push(ms));
    await Promise.all([reader.messages(guild, channel), reader.messages(guild, channel)]);
    assert.equal(maxActive, 1); assert.equal(calls, 3); assert(waits[0] >= 3000 && waits[0] < 3250);
    await reader.close();
});

test('safe HTTP errors map to proxy statuses, retain JSON app codes, and hide response details', async () => {
    for (const [upstream, code, expected, phrase] of [[401, 'unauthorized', 503, 'credentials'], [403, 'discord_forbidden', 503, 'denied access'], [404, 'discord_not_found', 503, 'not found'], [502, 'discord_unavailable', 503, 'temporarily unavailable']]) {
        const reader = make(async () => response({ error: { code }, secret: 'private body' }, upstream));
        await assert.rejects(reader.messages(guild, channel), e => e.readerStatus === upstream && e.status === expected && e.readerCode === code && e.message.includes(phrase) && !e.message.includes('private body'));
        await reader.close();
    }
});

test('malformed payload and malformed Retry-After fail safely', async () => {
    const reader = make(async () => response({ ...page([msg()], 2), pagination: { count: 0, limit: 2, next_before: null, next_after: null } }));
    await assert.rejects(reader.messages(guild, channel, { limit: 2 }), e => e.readerCode === 'reader_invalid_response' && e.status === 503);
    await reader.close();
    const limited = make(async () => response({ error: { code: 'discord_rate_limited' } }, 429, { 'retry-after': '3.5' }));
    await assert.rejects(limited.messages(guild, channel), e => e.readerStatus === 429 && e.retryAfter === null && e.status === 429);
    await limited.close();
});

test('success requires JSON; cross-guild and malformed message fields are rejected', async () => {
    const html = make(async () => response({ message: msg() }, 200, { 'content-type': 'text/html' }));
    await assert.rejects(html.message(guild, channel, id), e => e.readerCode === 'reader_invalid_response'); html.close();
    for (const change of [{ guild_id: '423456789012345678' }, { attachments: [null] }, { embeds: ['bad'] }, { author: { ...msg().author, bot: 'no' } }, { author: { ...msg().author, global_name: 4 } }]) {
        const reader = make(async () => response({ message: { ...msg(), ...change } }));
        await assert.rejects(reader.message(guild, channel, id), e => e.readerCode === 'reader_invalid_response'); reader.close();
    }
});

test('queue permits one active plus fifty waiting requests', async () => {
    let release; let calls = 0;
    const reader = make(async () => { calls++; await new Promise(resolve => { release = resolve; }); return response(page([], 100)); });
    const requests = Array.from({ length: 51 }, () => reader.messages(guild, channel));
    await new Promise(resolve => setImmediate(resolve));
    await assert.rejects(reader.messages(guild, channel), e => e.status === 429 && e.retryAfter === 1 && e.readerCode === 'queue_full');
    assert.equal(calls, 1);
    reader.close(); release(); await Promise.allSettled(requests);
});

test('110 second timeout aborts fetch and close during retry sleep aborts queued work', async () => {
    const original = global.setTimeout; let timeoutMs; let trigger;
    global.setTimeout = (fn, ms) => { timeoutMs = ms; trigger = fn; return original(() => {}, 0x7fffffff); };
    try {
        const timed = make((_url, opts) => new Promise((resolve, reject) => opts.signal.addEventListener('abort', () => reject(new Error('aborted')))));
        const pending = timed.messages(guild, channel); await new Promise(resolve => setImmediate(resolve));
        assert.equal(timeoutMs, 110000); trigger();
        await assert.rejects(pending, e => e.readerCode === 'reader_timeout'); timed.close();
    } finally { global.setTimeout = original; }
    let releaseSleep, calls = 0;
    const reader = make(async () => { calls++; return response({ error: { code: 'internal_error' } }, 500); }, (_ms, { signal }) => new Promise((resolve, reject) => { releaseSleep = resolve; signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true }); }));
    const active = reader.messages(guild, channel), queued = reader.messages(guild, channel);
    await new Promise(resolve => setImmediate(resolve)); await new Promise(resolve => setImmediate(resolve));
    reader.close(); releaseSleep();
    const outcomes = await Promise.allSettled([active, queued]);
    assert(outcomes.every(x => x.status === 'rejected' && x.reason.readerCode === 'reader_closed'));
    assert.equal(calls, 1);
});

test('close aborts an active fetch and rejects queued/new work', async () => {
    let seenSignal;
    const reader = make((_url, opts) => { seenSignal = opts.signal; return new Promise((resolve, reject) => opts.signal.addEventListener('abort', () => reject(new Error('fetch abort')))); });
    const active = reader.messages(guild, channel);
    await new Promise(resolve => setImmediate(resolve));
    reader.close();
    await assert.rejects(active, e => e.message === 'The reader client is closed.');
    assert.equal(seenSignal.aborted, true);
    await assert.rejects(reader.messages(guild, channel), e => e.message === 'The reader client is closed.');
});
