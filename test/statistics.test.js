'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { Statistics } = require('../statistics');

function fixture(now = Date.parse('2024-03-01T12:00:00Z'), initial = new Map()) {
    let time = now;
    const database = initial;
    const store = {
        database,
        now: () => time,
        read: key => database.get(key) ?? null,
        write: (key, value) => database.set(key, structuredClone(value)),
        setNow: value => { time = value; },
    };
    return { store, database };
}

test('records UTC daily rows and persists collection start across restart', () => {
    const { store, database } = fixture(Date.parse('2024-02-29T23:30:00-05:00'));
    const stats = new Statistics(store);
    stats.record('opened');
    assert.deepEqual(database.get('s:2024-03-01'), { opened: 1, discovered: 0, closed: 0, locked: 0, reopened: 0, deleted: 0, escalated: 0 });
    const started = database.get('meta:statistics-started');
    assert.equal(new Statistics(store).query({ from: '2024-03-01', to: '2024-03-01' }).collectedSince, started);
    assert.deepEqual([...database.keys()].filter(key => key.startsWith('s:')), ['s:2024-03-01']);
});

test('aggregates Monday weeks and calendar months with zero-filled buckets', () => {
    const { store } = fixture(Date.parse('2024-03-31T23:00:00Z'));
    const stats = new Statistics(store);
    for (const [day, event] of [['2024-02-26', 'opened'], ['2024-02-29', 'closed'], ['2024-03-01', 'opened'], ['2024-03-31', 'deleted']]) {
        store.setNow(Date.parse(`${day}T12:00:00Z`)); stats.record(event);
    }
    store.setNow(Date.parse('2024-03-31T23:00:00Z'));
    const weeks = stats.query({ from: '2024-02-28', to: '2024-03-03', interval: 'week' });
    assert.deepEqual(weeks.periods.map(({ start, opened, closed }) => ({ start, opened, closed })), [
        { start: '2024-02-26', opened: 1, closed: 1 },
    ]);
    const months = stats.query({ from: '2024-02-29', to: '2024-03-31', interval: 'month' });
    assert.deepEqual(months.periods.map(({ start, opened, closed, deleted }) => ({ start, opened, closed, deleted })), [
        { start: '2024-02-01', opened: 0, closed: 1, deleted: 0 }, { start: '2024-03-01', opened: 1, closed: 0, deleted: 1 },
    ]);
});

test('validates dates, ranges, intervals, options and event names as 400 errors', () => {
    const stats = new Statistics(fixture().store);
    for (const options of [
        { from: '2023-02-29' }, { from: '2024-02-30' }, { from: '2024-03-02', to: '2024-03-01' },
        { from: '2022-03-01', to: '2024-03-01' }, { from: '2024-03-02' }, { interval: 'year' },
        { from: ['2024-02-01'] }, null, [],
    ]) assert.throws(() => stats.query(options), error => error.status === 400 && typeof error.message === 'string');
    assert.throws(() => stats.record('opened; user-id'), error => error.status === 400);
    assert.throws(() => stats.record({ event: 'opened' }), error => error.status === 400);
});

test('prunes rows older than 730 calendar days and results contain counters only', () => {
    const { store, database } = fixture(Date.parse('2024-03-01T12:00:00Z'));
    database.set('s:2022-02-28', { opened: 99, userId: 'private-id' });
    database.set('s:2022-03-03', { opened: 1 });
    const stats = new Statistics(store);
    stats.record('discovered');
    assert.equal(database.has('s:2022-02-28'), false);
    assert.equal(database.has('s:2022-03-03'), true);
    const result = stats.query({ from: '2022-03-03', to: '2022-03-03' });
    assert.deepEqual(result.totals, { opened: 1, discovered: 0, closed: 0, locked: 0, reopened: 0, deleted: 0, escalated: 0 });
    assert(!JSON.stringify(result).includes('private-id'));
});
