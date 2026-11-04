const { EventEmitter } = require('node:events');
const { createCipheriv, createDecipheriv, createHmac, hkdfSync, randomBytes } = require('node:crypto');
const { Statistics } = require('./statistics');

const DAY = 86_400_000;
const ID = /^\d{16,22}$/;
const STATUSES = ['open', 'closed', 'locked', 'deleted'];

function ticketStatus(ticket) {
    return ticket.deletedAt ? 'deleted' : ticket.locked ? 'locked' : ticket.archived ? 'closed' : 'open';
}

class TicketStore extends EventEmitter {
    constructor(database, secret, { now = Date.now } = {}) {
        super();
        const key = Buffer.from(secret || '', 'base64');
        if (key.length !== 32 || key.toString('base64') !== secret) {
            throw new Error('TICKET_ENCRYPTION_KEY must be a base64-encoded 32-byte key.');
        }
        this.database = database;
        this.now = now;
        this.encryptionKey = Buffer.from(hkdfSync('sha256', key, 'tickets-v1', 'records', 32));
        this.indexKey = Buffer.from(hkdfSync('sha256', key, 'tickets-v1', 'indexes', 32));
        if (this.read('meta:key-check')) {
            // Authenticate existing data before permitting any writes with this key.
        } else {
            if (this.keys().length) throw new Error('Existing ticket storage has no key check; refusing to overwrite it.');
            this.write('meta:key-check', { version: 1 });
        }
        this.revision = this.read('meta:revision') || 0;
        this.statistics = new Statistics(this);
    }

    keys() {
        return this.database.indexes || [...this.database.keys()];
    }

    index(value) {
        return createHmac('sha256', this.indexKey).update(String(value)).digest('hex');
    }

    write(key, value) {
        const iv = randomBytes(12);
        const cipher = createCipheriv('aes-256-gcm', this.encryptionKey, iv);
        cipher.setAAD(Buffer.from(key));
        const payload = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
        this.database.set(key, { version: 1, iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), payload: payload.toString('base64') });
    }

    read(key) {
        const value = this.database.get(key);
        if (value === undefined || value === null) return null;
        if (value.version !== 1) throw new Error('Unknown encrypted ticket format.');
        const decipher = createDecipheriv('aes-256-gcm', this.encryptionKey, Buffer.from(value.iv, 'base64'));
        decipher.setAAD(Buffer.from(key));
        decipher.setAuthTag(Buffer.from(value.tag, 'base64'));
        return JSON.parse(Buffer.concat([decipher.update(Buffer.from(value.payload, 'base64')), decipher.final()]).toString('utf8'));
    }

    changed() {
        this.revision += 1;
        this.write('meta:revision', this.revision);
        this.emit('change', { revision: this.revision });
    }

    get(threadId) {
        return this.read(`t:${this.index(threadId)}`);
    }

    all() {
        return this.keys().filter(key => key.startsWith('t:')).map(key => this.read(key));
    }

    excluded(userId) {
        return Boolean(userId && this.read(`p:${this.index(userId)}`));
    }

    suppressed(threadId) {
        return Boolean(this.read(`x:${this.index(threadId)}`));
    }

    upsert(input, { imported = false } = {}) {
        if (!ID.test(input.threadId || '')) throw new Error('Invalid ticket ID.');
        if (this.suppressed(input.threadId)) return null;
        const previous = this.get(input.threadId);
        if (imported && previous) return previous;
        const time = this.now();
        const record = {
            schemaVersion: 1, guildId: null, parentId: null, name: null, openerId: null, openerName: null,
            type: null, description: null, createdAt: null, archived: false, locked: false, deletedAt: null,
            statusChangedAt: time, lastMessageId: null, lastMessageAuthorId: null, lastMessageAuthorName: null,
            lastMessageAt: null, lastHumanMessageId: null, lastHumanMessageAuthorId: null,
            lastHumanMessageAt: null, joinedUserIds: [], verificationThreadId: null, lastAction: null,
            imported, contentExcluded: false, escalatedAt: null, escalatedBy: null, escalationReason: null, ...previous, ...input,
        };
        record.status = ticketStatus(record);
        const transitioned = previous && previous.status !== record.status;
        if (transitioned) record.statusChangedAt = time;
        if (!previous || (previous.status === 'open' && record.status !== 'open') || record.status === 'open') {
            const closedAt = Number(record.statusChangedAt) || time;
            record.expiresAt = record.status === 'open' ? null : closedAt + 30 * DAY;
        } else {
            record.expiresAt = previous.expiresAt;
        }
        record.contentExcluded = Boolean(record.contentExcluded || this.excluded(record.openerId));
        if (record.contentExcluded) record.description = null;
        const comparable = value => JSON.stringify({ ...value, updatedAt: undefined });
        if (previous && comparable(previous) === comparable(record)) return previous;
        record.updatedAt = time;
        this.write(`t:${this.index(record.threadId)}`, record);
        if (!previous) {
            this.statistics.record(!imported && (record.createdAt ?? time) >= this.read('meta:statistics-started') ? 'opened' : 'discovered');
        } else {
            if (previous.status === 'open' && ['closed', 'locked'].includes(record.status)) this.statistics.record('closed');
            if (!previous.locked && record.locked) this.statistics.record('locked');
            if (previous.status !== 'open' && record.status === 'open') this.statistics.record('reopened');
            if (previous.status !== 'deleted' && record.status === 'deleted') this.statistics.record('deleted');
        }
        if (!previous?.escalatedAt && record.escalatedAt) this.statistics.record('escalated');
        this.changed();
        return record;
    }

    counts() {
        const counts = Object.fromEntries(STATUSES.map(status => [status, 0]));
        for (const ticket of this.all()) counts[ticket.status] += 1;
        return counts;
    }

    list({ status = 'open', type = 'all', q = '', opener = '', sort = 'updated', page = 1, pageSize = 25, cursor } = {}) {
        const query = q.toLocaleLowerCase();
        const owner = opener.trim().replace(/^<@!?(\d{16,22})>$/, '$1').toLocaleLowerCase();
        const tickets = this.all().filter(ticket => (status === 'all' || ticket.status === status)
            && (type === 'all' || ticket.type === type)
            && (!owner || (ID.test(owner) ? ticket.openerId === owner : [ticket.openerName, ticket.name?.match(/^(?:Generic|Payment):\s*(.+?)\s*\(\d{16,22}\)$/i)?.[1]].some(value => String(value || '').toLocaleLowerCase().includes(owner))))
            && (!query || [ticket.threadId, ticket.name, ticket.openerId, ticket.openerName, ticket.description]
                .some(value => String(value || '').toLocaleLowerCase().includes(query))));
        const field = sort === 'created' ? 'createdAt' : 'updatedAt';
        tickets.sort((a, b) => (sort === 'priority' ? Number(Boolean(b.escalatedAt)) - Number(Boolean(a.escalatedAt)) : 0) || (b[field] || 0) - (a[field] || 0) || b.threadId.localeCompare(a.threadId));
        const offset = cursor ? tickets.findIndex(ticket => ticket.threadId === cursor) + 1 : (page - 1) * pageSize;
        if (cursor && !offset) throw Object.assign(new Error('The ticket list changed. Reload the results.'), { status: 409 });
        const slice = tickets.slice(offset, offset + pageSize);
        return { tickets: slice, total: tickets.length, page, pageSize, counts: this.counts(), revision: this.revision, nextCursor: offset + slice.length < tickets.length ? slice.at(-1)?.threadId || null : null };
    }

    messagePrefix(threadId) {
        return `m:${this.index(threadId)}:`;
    }

    messages(threadId, { before, limit = 50 } = {}) {
        const prefix = this.messagePrefix(threadId);
        return this.keys().filter(key => key.startsWith(prefix)).map(key => this.read(key))
            .filter(message => !before || BigInt(message.id) < BigInt(before))
            .sort((a, b) => b.id.localeCompare(a.id, 'en', { numeric: true })).slice(0, limit);
    }

    saveMessage(threadId, message) {
        const ticket = this.get(threadId);
        if (!ticket || ticket.status === 'deleted' || ticket.contentExcluded || this.excluded(message.authorId)) return false;
        if (!ID.test(message.id || '')) throw new Error('Invalid message ID.');
        const key = `${this.messagePrefix(threadId)}${this.index(message.id)}`;
        const previous = this.read(key);
        // A REST backfill must never replace a newer edit observed on the Gateway.
        if (previous && (previous.editedAt || 0) > (message.editedAt || 0)) return false;
        if (this.read(`d:${this.index(`${threadId}:${message.id}`)}`)) return false;
        this.write(key, message);
        this.changed();
        return true;
    }

    deleteMessage(threadId, messageId) {
        this.database.delete(`${this.messagePrefix(threadId)}${this.index(messageId)}`);
        this.write(`d:${this.index(`${threadId}:${messageId}`)}`, { expiresAt: this.now() + 30 * DAY });
        this.changed();
    }

    clearMessages(threadId) {
        const prefix = this.messagePrefix(threadId);
        for (const key of this.keys()) if (key.startsWith(prefix)) this.database.delete(key);
    }

    purge(threadId) {
        this.clearMessages(threadId);
        this.database.delete(`t:${this.index(threadId)}`);
        // Store only a keyed index and encrypted timestamp to prevent legacy import resurrecting purged data.
        this.write(`x:${this.index(threadId)}`, { at: this.now() });
        this.changed();
        this.emit('purged', threadId);
    }

    excludeUser(userId) {
        if (!ID.test(userId || '')) throw new Error('Invalid user ID.');
        this.write(`p:${this.index(userId)}`, { excludedAt: this.now() });
        let affected = 0;
        for (const ticket of this.all()) {
            if (ticket.openerId === userId || ticket.joinedUserIds.includes(userId)
                || this.messages(ticket.threadId, { limit: Number.MAX_SAFE_INTEGER }).some(message => message.authorId === userId)) {
                this.clearMessages(ticket.threadId);
                this.upsert({ threadId: ticket.threadId, contentExcluded: true, description: null });
                affected += 1;
            }
        }
        this.changed();
        return affected;
    }

    deleteUser(userId) {
        this.excludeUser(userId);
        for (const key of this.keys().filter(key => key.startsWith('session:'))) {
            if (this.read(key)?.data?.user?.id === userId) this.write(key, { revoked: true, expiresAt: this.now() + 30 * DAY });
        }
        let affected = 0;
        for (const ticket of this.all()) {
            if (ticket.openerId === userId) {
                this.purge(ticket.threadId);
                affected += 1;
            } else {
                const update = { threadId: ticket.threadId, joinedUserIds: ticket.joinedUserIds.filter(id => id !== userId) };
                if (ticket.lastMessageAuthorId === userId) Object.assign(update, { lastMessageAuthorId: null, lastMessageAuthorName: null, lastMessageId: null, lastMessageAt: null });
                if (ticket.lastHumanMessageAuthorId === userId) Object.assign(update, { lastHumanMessageAuthorId: null, lastHumanMessageId: null, lastHumanMessageAt: null });
                if (ticket.lastAction?.actorId === userId) update.lastAction = { ...ticket.lastAction, actorId: null };
                if (ticket.escalatedBy === userId) Object.assign(update, { escalatedBy: null, escalationReason: null });
                this.upsert(update);
            }
        }
        return affected;
    }

    expire() {
        let count = 0;
        for (const ticket of this.all()) {
            if (ticket.expiresAt && ticket.expiresAt <= this.now()) {
                this.purge(ticket.threadId);
                count += 1;
            }
        }
        for (const key of this.keys()) {
            if (key.startsWith('d:') && this.read(key).expiresAt <= this.now()) this.database.delete(key);
        }
        return count;
    }
}

function publicTicket(ticket) {
    return {
        ...ticket,
        discordUrl: ticket.status === 'deleted' ? null : `https://discord.com/channels/${ticket.guildId}/${ticket.threadId}`,
        recordedParticipantsOnly: true,
    };
}

module.exports = { TicketStore, ticketStatus, publicTicket, DAY, ID, STATUSES };
