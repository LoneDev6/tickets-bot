'use strict';

const DAY = 86_400_000;
const RETENTION_DAYS = 730;
const EVENTS = ['opened', 'discovered', 'closed', 'locked', 'reopened', 'deleted', 'escalated'];

function badRequest(message) {
    const error = new Error(message);
    error.status = 400;
    return error;
}

function dateString(time) {
    return new Date(time).toISOString().slice(0, 10);
}

function parseDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw badRequest('Dates must use YYYY-MM-DD format.');
    const time = Date.parse(`${value}T00:00:00.000Z`);
    if (!Number.isFinite(time) || dateString(time) !== value) throw badRequest('Date is not a valid calendar date.');
    return time;
}

function counts(row) {
    return Object.fromEntries(EVENTS.map(event => [event, row?.[event] || 0]));
}

function add(target, row) {
    for (const event of EVENTS) target[event] += row[event] || 0;
}

function weekStart(time) {
    const date = new Date(time);
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
    return dateString(date.getTime());
}

class Statistics {
    constructor(store) {
        this.store = store;
        if (!store.read('meta:statistics-started')) store.write('meta:statistics-started', store.now());
    }

    prune(now = this.store.now()) {
        const today = dateString(now);
        if (this.prunedDay === today) return;
        const cutoff = dateString(now - (RETENTION_DAYS - 1) * DAY);
        for (const key of this.store.database.indexes || this.store.database.keys()) {
            if (key.startsWith('s:') && key.slice(2) < cutoff) this.store.database.delete(key);
        }
        this.prunedDay = today;
    }

    record(event) {
        if (!EVENTS.includes(event)) throw badRequest('Unsupported statistics event.');
        const now = this.store.now();
        this.prune(now);
        const key = `s:${dateString(now)}`;
        const row = counts(this.store.read(key));
        row[event] += 1;
        this.store.write(key, row);
    }

    query(options = {}) {
        if (!options || typeof options !== 'object' || Array.isArray(options)) throw badRequest('Query must be an object.');
        const now = this.store.now();
        this.prune(now);
        const today = dateString(now);
        const from = options.from === undefined ? dateString(now - 29 * DAY) : options.from;
        const to = options.to === undefined ? today : options.to;
        const interval = options.interval === undefined ? 'day' : options.interval;
        if (typeof from !== 'string' || typeof to !== 'string' || typeof interval !== 'string') throw badRequest('Query values have invalid types.');
        const fromTime = parseDate(from);
        const toTime = parseDate(to);
        if (!['day', 'week', 'month'].includes(interval)) throw badRequest('Interval must be day, week, or month.');
        if (fromTime > toTime) throw badRequest('Start date must not follow end date.');
        if (to > today) throw badRequest('Future dates are not available.');
        const retainedFrom = dateString(now - (RETENTION_DAYS - 1) * DAY);
        if (from < retainedFrom || (toTime - fromTime) / DAY + 1 > RETENTION_DAYS) throw badRequest('Date range is outside the 730-day retention window.');

        const rows = new Map();
        for (let time = fromTime; time <= toTime; time += DAY) {
            const day = dateString(time);
            rows.set(day, counts(this.store.read(`s:${day}`)));
        }
        const totals = counts();
        for (const row of rows.values()) add(totals, row);
        const periods = [];
        let bucket = null;
        for (let time = fromTime; time <= toTime; time += DAY) {
            const start = interval === 'day' ? dateString(time) : interval === 'week' ? weekStart(time) : `${dateString(time).slice(0, 7)}-01`;
            if (!bucket || bucket.start !== start) {
                bucket = { start, ...counts() };
                periods.push(bucket);
            }
            add(bucket, rows.get(dateString(time)));
        }
        return { timezone: 'UTC', interval, from, to, collectedSince: this.store.read('meta:statistics-started'), retentionDays: RETENTION_DAYS, totals, periods };
    }
}

module.exports = { Statistics };
