require('dotenv').config();
require('../bootstrap').configureSecrets();
const fs = require('node:fs');
const path = require('node:path');
const Enmap = require('enmap');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { TicketStore } = require('../tickets');
const { loadSettings } = require('../settings');
const { importLegacy } = require('../legacy');

async function main() {
    const args = new Set(process.argv.slice(2));
    if ([...args].some(arg => !['--apply', '--retire-legacy'].includes(arg)) || (args.has('--retire-legacy') && !args.has('--apply'))) throw new Error('Usage: npm run import:legacy -- [--apply] [--retire-legacy]. Stop the bot first.');
    const config = require('../config.json');
    const settings = loadSettings(process.env, config);
    if (!settings.discordToken) throw new Error('DISCORD_TOKEN required.');
    const dataDir = path.resolve(process.env.DATA_DIR || 'data');
    fs.mkdirSync(dataDir, { recursive: true, mode: 0o700 });
    const encrypted = new Enmap({ name: 'privateTickets', dataDir, fetchAll: false, autoFetch: true });
    const legacy = new Enmap({ name: 'botData', dataDir, fetchAll: false, autoFetch: true });
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    try {
        const store = new TicketStore(encrypted, settings.encryptionKey);
        const ready = new Promise(resolve => client.once(Events.ClientReady, resolve));
        await client.login(settings.discordToken); await ready;
        const report = await importLegacy({ client, legacy, store, settings, channels: [config.channels.ticketsNotifications, config.channels.ticketsOpened], apply: args.has('--apply'), retire: args.has('--retire-legacy') });
        console.log(JSON.stringify({ mode: args.has('--apply') ? 'apply' : 'dry-run', ...report }, null, 2));
        if (report.errors) process.exitCode = 1;
    } finally { client.destroy(); legacy.close(); encrypted.close(); }
}
main().catch(() => { console.error('Import failed. Check credentials, permissions and encryption key; no error payloads printed.'); process.exitCode = 1; });
