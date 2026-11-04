const { ID } = require('./tickets');

function timestamp(value) {
    const match = String(value || '').match(/<t:(\d+)(?::[A-Za-z])?>/);
    return match ? Number(match[1]) * 1000 : null;
}

function parseCard(message, settings, botId) {
    if (![botId, ...(settings.legacyBotIds || [])].includes(message.author?.id) || !message.embeds?.length) return null;
    const embed = message.embeds[0];
    if (!/^(New Ticket|Ticket (Closed|Locked|Deleted|Re-opened)):/.test(embed.title || '')) return null;
    const threadId = embed.title.match(/`(\d{16,22})`/)?.[1];
    if (!ID.test(threadId || '')) return null;
    const fields = name => embed.fields?.find(field => field.name === name)?.value;
    const action = fields('Locked') ? 'lock' : fields('Closed') ? 'close' : null;
    const actionValue = action ? fields(action === 'lock' ? 'Locked' : 'Closed') : null;
    const statusAt = timestamp(actionValue);
    const deleted = embed.title.startsWith('Ticket Deleted');
    const openerId = embed.description?.match(/<@!?(\d{16,22})>/)?.[1] || null;
    return {
        threadId, guildId: settings.guildId, parentId: settings.ticketParentId,
        openerId, type: fields('Type') || null, description: fields('Description') || null,
        createdAt: timestamp(fields('Creation Time')) || Number((BigInt(threadId) >> 22n) + 1420070400000n),
        locked: embed.title.startsWith('Ticket Locked'), archived: embed.title.startsWith('Ticket Closed'),
        deletedAt: deleted ? (statusAt || message.createdTimestamp) : null,
        statusChangedAt: statusAt || message.editedTimestamp || message.createdTimestamp,
        lastMessageAuthorId: fields('Last Message By')?.match(/<@!?(\d{16,22})>/)?.[1] || null,
        lastMessageAt: timestamp(fields('Last Message When')),
        joinedUserIds: [...String(message.embeds[1]?.description || '').matchAll(/<@!?(\d{16,22})>/g)].map(match => match[1]).filter(id => id !== openerId),
        lastAction: action ? { action, at: statusAt, actorId: null, reason: actionValue.split('Reason:').slice(1).join('Reason:').trim() || null } : null,
    };
}

async function importLegacy({ client, legacy, store, settings, channels, apply = false, retire = false }) {
    const candidates = new Map();
    const report = { records: 0, cards: 0, untrustedCards: 0, activeThreads: 0, archivedThreads: 0, candidates: 0, imported: 0, existing: 0, suppressed: 0, errors: 0, retired: 0, open: 0, closed: 0, locked: 0, deleted: 0, missingOpener: 0, missingDescription: 0 };
    for (const key of legacy.indexes.filter(value => /^ticket_\d{16,22}$/.test(value))) {
        const data = legacy.get(key);
        const threadId = key.slice(7);
        if (!data || typeof data !== 'object') { report.errors++; continue; }
        candidates.set(threadId, {
            threadId, guildId: settings.guildId, parentId: settings.ticketParentId,
            openerId: data.userId || null, joinedUserIds: data.joinedUserIds || [],
            verificationThreadId: data.verificationThreadId || null, ticketInfoMessageId: data.ticketInfoMessageId || null,
            lastAction: data.closedLockedReason ? { action: 'unknown', actorId: null, at: null, reason: data.closedLockedReason } : null,
            createdAt: Number((BigInt(threadId) >> 22n) + 1420070400000n),
        });
        report.records++;
    }
    for (const channelId of [...new Set(channels.filter(Boolean))]) {
        try {
            const channel = await client.channels.fetch(channelId);
            if (!channel || channel.guildId !== settings.guildId || !channel.isTextBased()) throw new Error('Legacy channel unavailable.');
            let before;
            while (true) {
                const page = await channel.messages.fetch({ limit: 100, ...(before ? { before } : {}) });
                for (const message of page.values()) {
                    if (message.author?.bot && ![client.user.id, ...(settings.legacyBotIds || [])].includes(message.author.id)
                        && /^(New Ticket|Ticket (Closed|Locked|Deleted|Re-opened)):/.test(message.embeds?.[0]?.title || '')) {
                        report.untrustedCards++; continue;
                    }
                    const card = parseCard(message, settings, client.user.id);
                    if (!card) continue;
                    report.cards++;
                    // The full notifications channel is authoritative; an old open-only copy cannot reopen a ticket.
                    const previous = candidates.get(card.threadId);
                    if (previous?.cardImported) continue;
                    candidates.set(card.threadId, { ...previous, ...card, openerId: previous?.openerId || card.openerId, joinedUserIds: [...new Set([...(previous?.joinedUserIds || []), ...card.joinedUserIds])], cardImported: true });
                }
                if (page.size < 100) break;
                const next = page.last().id;
                if (next === before) throw new Error('Legacy pagination did not advance.');
                before = next;
            }
        } catch { report.errors++; }
    }
    // Inventory active and archived threads independently of cards or local records.
    if (client.rest) for (const parentId of settings.ticketParentIds || [settings.ticketParentId]) {
        try {
            const parent = await client.channels.fetch(parentId);
            if (!parent || parent.guildId !== settings.guildId) throw new Error('Legacy parent unavailable.');
            const addThread = (thread, archived) => {
                const threadParent = thread.parentId || thread.parent_id;
                if (thread.type !== 12 || threadParent !== parentId) return;
                const previous = candidates.get(thread.id) || {};
                const opener = thread.name?.match(/\((\d{16,22})\)/)?.[1] || null;
                const type = thread.name?.startsWith('Payment:') ? 'Payment' : thread.name?.startsWith('Generic:') ? 'Generic' : null;
                const createdAt = thread.createdTimestamp || Number((BigInt(thread.id) >> 22n) + 1420070400000n);
                candidates.set(thread.id, { ...previous, threadObserved: true, threadId: thread.id, guildId: settings.guildId, parentId,
                    name: thread.name, openerId: previous.openerId || opener, type: previous.type || type,
                    createdAt: previous.createdAt || createdAt,
                    archived: thread.archived ?? thread.thread_metadata?.archived ?? false,
                    locked: thread.locked ?? thread.thread_metadata?.locked ?? false, deletedAt: null,
                    statusChangedAt: previous.statusChangedAt || thread.archiveTimestamp || Date.parse(thread.thread_metadata?.archive_timestamp) || createdAt });
                if (archived) report.archivedThreads++; else report.activeThreads++;
            };
            const active = await parent.threads.fetchActive();
            for (const thread of active.threads.values()) addThread(thread, false);
            let before;
            while (true) {
                const query = new URLSearchParams({ limit: '100', ...(before ? { before } : {}) });
                const page = await client.rest.get(`/channels/${parentId}/threads/archived/private`, { query });
                for (const thread of page.threads) addThread({ ...thread, guild_id: settings.guildId }, true);
                if (!page.has_more || !page.threads.length) break;
                const next = page.threads.at(-1).thread_metadata?.archive_timestamp;
                if (!next || next === before) throw new Error('Legacy archive pagination did not advance.');
                before = next;
            }
        } catch { report.errors++; }
    }
    report.candidates = candidates.size;
    for (const candidate of candidates.values()) {
        delete candidate.cardImported;
        const threadObserved = candidate.threadObserved;
        delete candidate.threadObserved;
        if ((!candidate.description || !candidate.type) && candidate.ticketInfoMessageId && !store.suppressed(candidate.threadId) && !store.excluded(candidate.openerId)) {
            try {
                const thread = await client.channels.fetch(candidate.threadId);
                const info = await thread.messages.fetch(candidate.ticketInfoMessageId);
                if ([client.user.id, ...(settings.legacyBotIds || [])].includes(info.author?.id)) {
                    const parsed = info.embeds?.[0]?.description?.match(/\*\*Type:\*\*\s*(.*?)\n\*\*Description:\*\*\s*([\s\S]*)/);
                    if (parsed) { candidate.type ||= parsed[1]; candidate.description ||= parsed[2]; }
                }
            } catch { /* A missing information message does not invalidate thread metadata. */ }
        }
        const state = candidate.deletedAt ? 'deleted' : candidate.locked ? 'locked' : candidate.archived ? 'closed' : 'open';
        report[state]++; if (!candidate.openerId) report.missingOpener++;
        if (!candidate.description) report.missingDescription++;
        if (store.suppressed(candidate.threadId)) { report.suppressed++; continue; }
        const existing = store.get(candidate.threadId);
        if (existing) {
            report.existing++;
            if (apply) {
                const missing = Object.fromEntries(Object.entries(candidate).filter(([key, value]) => existing[key] == null && value != null));
                const observed = threadObserved ? Object.fromEntries(['guildId', 'parentId', 'name', 'archived', 'locked', 'deletedAt'].map(key => [key, candidate[key]])) : {};
                if (Object.keys(missing).length || threadObserved) store.upsert({ threadId: candidate.threadId, ...missing, ...observed });
            }
            continue;
        }
        if (apply) store.upsert(candidate, { imported: true });
        report.imported++;
    }
    if (report.untrustedCards) report.errors++;
    if (apply && !report.errors) store.write('meta:legacy-complete', { at: Date.now(), ...report });
    if (retire) {
        if (!apply || report.errors) throw new Error('Retirement requires a successful applied import. No legacy records deleted.');
        legacy.db.pragma('secure_delete = ON');
        for (const key of legacy.indexes.filter(value => /^ticket_\d{16,22}$/.test(value))) {
            const id = key.slice(7);
            if (!store.get(id) && !store.suppressed(id)) throw new Error('Encrypted copy missing; refusing legacy retirement.');
            legacy.delete(key); report.retired++;
        }
        legacy.db.exec('VACUUM');
    }
    return report;
}
module.exports = { importLegacy, parseCard, timestamp };
