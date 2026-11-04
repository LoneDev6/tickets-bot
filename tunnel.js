const { spawn } = require('node:child_process');
const { accessSync, constants } = require('node:fs');
const path = require('node:path');

function startTunnel(settings, { spawnImpl = spawn, logger = console } = {}) {
    if (!settings.tunnelToken && !settings.cloudflaredPath) return { stop: async () => {} };
    if (!settings.tunnelToken || !settings.cloudflaredPath || !settings.publicBaseUrl) throw new Error('Tunnel requires TUNNEL_TOKEN, CLOUDFLARED_PATH and PUBLIC_BASE_URL.');
    if (!['auto', 'http2', 'quic'].includes(settings.tunnelProtocol)) throw new Error('Invalid TUNNEL_PROTOCOL.');
    const executable = path.resolve(settings.cloudflaredPath);
    if (spawnImpl === spawn) accessSync(executable, constants.X_OK);
    let child; let timer; let stopping = false; let stopPromise; let delay = 1000;
    const launch = () => {
        if (stopping) return;
        const env = { TUNNEL_TOKEN: settings.tunnelToken, ...(process.env.PATH ? { PATH: process.env.PATH } : {}) };
        child = spawnImpl(executable, ['tunnel', '--no-autoupdate', '--protocol', settings.tunnelProtocol, 'run'], { env, shell: false, stdio: ['ignore', 'ignore', 'pipe'] });
        // Drain connector diagnostics without persisting request headers or credentials in bot logs.
        child.stderr?.on('data', () => {});
        let completed = false;
        const restart = () => {
            if (completed) return; completed = true;
            if (!stopping) { logger.warn('HTTPS connector stopped; retry scheduled.'); timer = setTimeout(launch, delay); delay = Math.min(delay * 2, 30_000); }
        };
        child.once('error', restart); child.once('exit', restart);
    };
    launch();
    return { stop: () => {
        if (stopPromise) return stopPromise;
        stopping = true; clearTimeout(timer);
        if (!child || child.exitCode !== null || child.signalCode) return Promise.resolve();
        stopPromise = new Promise(resolve => {
            const force = setTimeout(() => child.kill('SIGKILL'), 5000);
            child.once('exit', () => { clearTimeout(force); resolve(); });
            if (!child.kill('SIGTERM')) { clearTimeout(force); resolve(); }
        });
        return stopPromise;
    } };
}
module.exports = { startTunnel };
