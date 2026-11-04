function log(level, message, details) {
    const code = details instanceof Error ? details.code : undefined;
    const safe = code === undefined ? '' : ` (code: ${String(code).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40)})`;
    const fields = {};
    if (details && !(details instanceof Error)) {
        for (const key of ['records', 'cards', 'untrustedCards', 'activeThreads', 'archivedThreads', 'candidates', 'imported', 'existing', 'suppressed', 'errors', 'retired', 'open', 'closed', 'locked', 'deleted', 'missingOpener', 'missingDescription', 'code', 'status']) {
            if (Number.isFinite(details[key])) fields[key] = details[key];
        }
        if (typeof details.legacyIncomplete === 'boolean') fields.legacyIncomplete = details.legacyIncomplete;
        for (const key of ['errorDetails', 'failures']) {
            if (!Array.isArray(details[key])) continue;
            fields[key] = details[key].slice(0, 20).map(detail => {
                const result = {};
                if (!detail || typeof detail !== 'object') return result;
                if (['legacy-record', 'card-scan', 'parent-inventory', 'untrusted-cards', 'ticket-reconcile', 'parent-scan', 'active-inventory', 'archive-inventory', 'reconcile'].includes(detail.stage)) result.stage = detail.stage;
                for (const field of ['threadId', 'parentId', 'channelId']) if (typeof detail[field] === 'string' && /^\d{16,22}$/.test(detail[field])) result[field] = detail[field];
                for (const field of ['code', 'status']) if (Number.isFinite(detail[field])) result[field] = detail[field];
                if (['unavailable-or-pagination', 'untrusted-card', 'reconciliation-incomplete'].includes(detail.reason)) result.reason = detail.reason;
                return result;
            });
        }
    }
    const metrics = Object.keys(fields).length ? ` ${JSON.stringify(fields)}` : '';
    console[level](`${new Date().toISOString()} ${message}${safe}${metrics}`);
}
module.exports = {
    info: (message, details) => log('info', message, details),
    warn: (message, details) => log('warn', message, details),
    error: (message, details) => log('error', message, details),
};
