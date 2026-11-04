const { prepare, configureSecrets, ensureConnector } = require('./bootstrap');

async function main() {
    process.chdir(__dirname);
    prepare();
    require('dotenv').config();
    await require('./setup').configureDeployment();
    configureSecrets();
    try { require('./settings').loadSettings(process.env, require('./config.json')); }
    catch (error) { error.startup = true; throw error; }
    await ensureConnector();
    return require('./bot').main();
}

function run() {
    main().then(runtime => {
        for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, () => runtime.shutdown().then(() => process.exit(0), () => process.exit(1)));
    }).catch(error => {
        if (error.startup) console.error(`[startup] ${error.message}`);
        else require('./utils/logger').error('Startup failed. Check configuration and persistent secrets.', error);
        process.exitCode = 1;
    });
}

if (require.main === module) run();
module.exports = { main, run };
