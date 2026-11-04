function log(level, message, details) {
    const code = details instanceof Error ? details.code : undefined;
    const safe = code === undefined ? '' : ` (code: ${String(code).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40)})`;
    const metrics = details && !(details instanceof Error) && Object.values(details).every(value => typeof value === 'number') ? ` ${JSON.stringify(details)}` : '';
    console[level](`${new Date().toISOString()} ${message}${safe}${metrics}`);
}
module.exports = {
    info: (message, details) => log('info', message, details),
    warn: (message, details) => log('warn', message, details),
    error: (message, details) => log('error', message, details),
};
