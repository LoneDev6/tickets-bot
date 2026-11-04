const { prepare, configureSecrets, ensureConnector } = require('./bootstrap');

async function main({ signal, onShutdown } = {}) {
    process.chdir(__dirname);
    signal?.throwIfAborted();
    await prepare(__dirname, { signal });
    require('dotenv').config();
    await require('./setup').configureDeployment(__dirname, process.env, { signal });
    process.stdin.resume();
    signal?.throwIfAborted();
    configureSecrets();
    try { require('./settings').loadSettings(process.env, require('./config.json')); }
    catch (error) { error.startup = true; throw error; }
    await ensureConnector(__dirname, process.env, { signal });
    signal?.throwIfAborted();
    return require('./bot').main({ signal, onShutdown });
}

function run({ start = main, shutdownTimeoutMs = 10_000 } = {}) {
    const controller = new AbortController();
    let shutdown; let stopping = false; let input = '';
    const stop = (reason, code = 0) => {
        if (stopping) return;
        stopping = true;
        console.log(`[shutdown] ${reason}: stopping services…`);
        const deadline = setTimeout(() => {
            console.error('[shutdown] Shutdown timed out; terminating process.');
            process.exit(1);
        }, shutdownTimeoutMs);
        controller.abort();
        Promise.resolve().then(async () => {
            // Before runtime registration, installers/setup/downloads must finish cancellation first.
            if (!shutdown) await starting;
            await shutdown?.();
        }).then(() => {
            clearTimeout(deadline);
            console.log('[shutdown] Services stopped.');
            process.exit(code);
        }, error => {
            clearTimeout(deadline);
            require('./utils/logger').error('Shutdown failed.', error);
            process.exit(1);
        });
    };
    for (const signal of ['SIGTERM', 'SIGINT', 'SIGHUP']) process.on(signal, () => stop(signal));
    process.stdin.on('data', chunk => {
        for (const part of chunk.toString().split(/(\r\n|\r|\n)/)) {
            if (/^[\r\n]+$/.test(part)) {
                if (['stop', 'exit', 'quit', '^c', '\u0003'].includes(input.trim().toLowerCase())) stop('console stop');
                input = '';
            } else input = (input + part).slice(-256);
        }
    });
    process.stdin.resume();
    const starting = Promise.resolve().then(() => start({ signal: controller.signal, onShutdown: handler => { shutdown = handler; } })).then(runtime => {
        shutdown ||= runtime?.shutdown;
    }).catch(error => {
        if (controller.signal.aborted) return;
        if (error.startup) console.error(`[startup] ${error.message}`);
        else require('./utils/logger').error('Startup failed. Check configuration and persistent secrets.', error);
        stop('startup failure', 1);
    });
    return starting;
}

if (require.main === module) run();
module.exports = { main, run };
