'use strict';

const { Store } = require('express-session');

const SESSION_MAX_AGE = 30 * 86_400_000;
const PREAUTH_MAX_AGE = 10 * 60_000;
const PREFIX = 'session:';

class EncryptedSessionStore extends Store {
    constructor(ticketStore, { now = Date.now, logger = console } = {}) {
        super();
        this.ticketStore = ticketStore;
        this.now = now;
        this.logger = logger;
        this.interval = setInterval(() => this.prune().catch(() => this.logger.warn('Session store prune failed.')), 60_000);
        this.interval.unref?.();
    }

    key(sid) { return `${PREFIX}${this.ticketStore.index(sid)}`; }

    get(sid, callback) {
        try {
            const key = this.key(sid);
            const row = this.ticketStore.read(key);
            if (!row || row.revoked) return callback(null, null);
            if (row.expiresAt <= this.now()) {
                this.ticketStore.database.delete(key);
                return callback(null, null);
            }
            callback(null, row.data);
        } catch (error) { callback(error); }
    }

    set(sid, data, callback = () => {}) {
        try {
            const key = this.key(sid);
            const existing = this.ticketStore.read(key);
            if (existing?.revoked) return callback(new Error('Session has been revoked.'));
            const expiresAt = this.expiresAt(data);
            if (expiresAt <= this.now()) this.ticketStore.database.delete(key);
            else this.ticketStore.write(key, { expiresAt, data });
            callback(null);
        } catch (error) { callback(error); }
    }

    destroy(sid, callback = () => {}) {
        try {
            const key = this.key(sid);
            if (this.ticketStore.read(key)) this.ticketStore.write(key, { revoked: true, expiresAt: this.now() + SESSION_MAX_AGE });
            callback(null);
        } catch (error) { callback(error); }
    }

    touch(sid, data, callback = () => {}) {
        try {
            const key = this.key(sid);
            const row = this.ticketStore.read(key);
            if (!row || row.revoked || row.expiresAt <= this.now()) return callback(null);
            const expiresAt = this.expiresAt(data);
            if (expiresAt <= this.now()) this.ticketStore.database.delete(key);
            else {
                row.expiresAt = expiresAt;
                if (data.cookie) row.data.cookie = data.cookie;
                this.ticketStore.write(key, row);
            }
            callback(null);
        } catch (error) { callback(error); }
    }

    expiresAt(data) {
        const now = this.now();
        const limit = data?.user ? SESSION_MAX_AGE : PREAUTH_MAX_AGE;
        const cookieExpiry = data?.cookie?.expires ? new Date(data.cookie.expires).getTime() : Infinity;
        if (Number.isNaN(cookieExpiry)) throw new Error('Invalid session expiry.');
        return Math.min(now + limit, cookieExpiry);
    }

    async prune() {
        for (const key of this.ticketStore.keys()) {
            if (!key.startsWith(PREFIX)) continue;
            const row = this.ticketStore.read(key);
            if (row.expiresAt <= this.now()) this.ticketStore.database.delete(key);
        }
    }

    stopInterval() {
        if (!this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
    }
}

module.exports = { EncryptedSessionStore, SESSION_MAX_AGE };
