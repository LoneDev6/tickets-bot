'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const { TicketStore } = require('../tickets');
const { EncryptedSessionStore, SESSION_MAX_AGE } = require('../session-store');

function fixture() {
    const database = new Map();
    const key = randomBytes(32).toString('base64');
    let now = 1_800_000_000_000;
    const ticketStore = new TicketStore(database, key, { now: () => now });
    const makeStore = () => new EncryptedSessionStore(ticketStore, { now: () => now, logger: { warn() {} } });
    const store = makeStore();
    return { database, ticketStore, store, makeStore, setNow: value => { now = value; }, now: () => now };
}

function call(store, method, ...args) {
    return new Promise((resolve, reject) => store[method](...args, (error, value) => error ? reject(error) : resolve(value)));
}

test('encrypts session data and reads it after store restart', async t => {
    const f = fixture(); t.after(() => f.store.stopInterval());
    const sid = 'raw-session-id';
    const data = { user: { id: 'user' }, accessToken: 'secret-access', refreshToken: 'secret-refresh', csrf: 'secret-csrf', cookie: {} };
    await call(f.store, 'set', sid, data);
    const raw = JSON.stringify([...f.database]);
    for (const secret of [sid, data.accessToken, data.refreshToken, data.csrf]) assert(!raw.includes(secret));
    const restarted = f.makeStore(); t.after(() => restarted.stopInterval());
    assert.deepEqual(await call(restarted, 'get', sid), data);
});

test('caps authenticated and preauth sessions and honors cookie expiry', async t => {
    const f = fixture(); t.after(() => f.store.stopInterval());
    const now = f.now();
    await call(f.store, 'set', 'auth', { user: { id: 1 }, cookie: { expires: new Date(now + 5_000) } });
    await call(f.store, 'set', 'preauth', { cookie: {} });
    assert.equal(f.ticketStore.read(f.store.key('auth')).expiresAt, now + 5_000);
    assert.equal(f.ticketStore.read(f.store.key('preauth')).expiresAt, now + 10 * 60_000);
    assert.equal(SESSION_MAX_AGE, 30 * 86_400_000);
    f.setNow(now + 5_001);
    assert.equal(await call(f.store, 'get', 'auth'), null);
});

test('touch updates expiry and cookie while preserving fresh OAuth data', async t => {
    const f = fixture(); t.after(() => f.store.stopInterval());
    const sid = 'touch-session';
    await call(f.store, 'set', sid, { user: { id: 1 }, accessToken: 'a', refreshToken: 'fresh', csrf: 'c', cookie: { original: true } });
    await call(f.store, 'touch', sid, { user: { id: 1 }, accessToken: 'old', refreshToken: 'stale', csrf: 'old', cookie: { changed: true } });
    const stored = await call(f.store, 'get', sid);
    assert.equal(stored.refreshToken, 'fresh');
    assert.equal(stored.accessToken, 'a');
    assert.deepEqual(stored.cookie, { changed: true });
});

test('logout tombstone blocks stale saves and touches', async t => {
    const f = fixture(); t.after(() => f.store.stopInterval());
    const sid = 'logout-session';
    await call(f.store, 'set', sid, { user: { id: 1 }, refreshToken: 'secret', cookie: {} });
    await call(f.store, 'destroy', sid);
    await assert.rejects(call(f.store, 'set', sid, { user: { id: 1 }, refreshToken: 'stale', cookie: {} }), /revoked/);
    await call(f.store, 'touch', sid, { user: { id: 1 }, refreshToken: 'stale', cookie: {} });
    assert.equal(await call(f.store, 'get', sid), null);
    await call(f.store, 'destroy', 'never-created');
    assert.equal(f.database.has(f.store.key('never-created')), false);
    await assert.rejects(call(f.store, 'set', 'bad-cookie', { user: { id: 1 }, cookie: { expires: 'invalid' } }), /Invalid session expiry/);
});

test('prune removes only expired session rows', async t => {
    const f = fixture(); t.after(() => f.store.stopInterval());
    f.ticketStore.database.set('t:fixture', { ticket: true });
    f.ticketStore.database.set('s:fixture', { stats: true });
    await call(f.store, 'set', 'old', { user: { id: 1 }, cookie: {} });
    f.setNow(f.now() + SESSION_MAX_AGE + 1);
    await f.store.prune();
    assert.equal(f.ticketStore.database.has(f.store.key('old')), false);
    assert.equal(f.ticketStore.database.has('t:fixture'), true);
    assert.equal(f.ticketStore.database.has('s:fixture'), true);
});
