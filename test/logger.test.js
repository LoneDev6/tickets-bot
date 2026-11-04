const test = require('node:test');
const assert = require('node:assert/strict');
const logger = require('../utils/logger');

test('import and reconcile diagnostics reach the console without request payloads or credentials', () => {
    const lines = [];
    const original = { info: console.info, error: console.error };
    console.info = console.error = line => lines.push(line);
    try {
        const detail = { stage: 'card-scan', channelId: '120000000000000001', code: 50001, status: 403, reason: 'unavailable-or-pagination', message: 'private-content', token: 'secret-token' };
        logger.info('Legacy import report.', { imported: 1480, errors: 1, errorDetails: [detail], token: 'secret-token' });
        assert(lines[0].includes('"imported":1480')); assert(lines[0].includes('"code":50001'));
        assert(lines[0].includes('"stage":"card-scan"')); assert(lines[0].includes('"channelId":"120000000000000001"'));
        logger.error('Ticket reconciliation failed.', { legacyIncomplete: true, failures: Array.from({ length: 25 }, () => detail) });
        const failures = JSON.parse(lines[1].slice(lines[1].indexOf('{')));
        assert.equal(failures.legacyIncomplete, true); assert.equal(failures.failures.length, 20);
        logger.error('Discord request failed.', Object.assign(new Error('private-content secret-token'), { code: 50013 }));
        assert(lines[2].includes('(code: 50013)'));
        assert(!lines.join('\n').includes('private-content')); assert(!lines.join('\n').includes('secret-token'));
    } finally { console.info = original.info; console.error = original.error; }
});
