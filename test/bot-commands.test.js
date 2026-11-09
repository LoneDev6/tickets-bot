const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { EventEmitter } = require('node:events');
const sdk = require('discord.js');

const closeReasons = [
    { name: 'Solved', value: 'Solved' },
    { name: 'Inactivity', value: 'Inactivity' },
];
const lockReasons = [
    { name: 'Solved. No further messages are expected.', value: 'Solved. No further messages are expected.' },
    { name: 'Invalid Section', value: 'Invalid section.' },
    { name: 'No information provided', value: 'No information provided.' },
    { name: 'Duplicate', value: 'Duplicate' },
    { name: 'Spam', value: 'Spam' },
    { name: 'Inappropriate', value: 'Inappropriate' },
];

test('bot registers the historical optional close/lock reasons and forwards selected values', { timeout: 5000 }, async t => {
    const dataDir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'ticket-commands-'));
    const previousDataDir = process.env.DATA_DIR;
    process.env.DATA_DIR = dataDir;
    const originals = new Map();
    const replace = (file, exports) => {
        const id = require.resolve(file);
        originals.set(id, require.cache[id]);
        require.cache[id] = { exports };
    };
    t.after(() => {
        for (const [id, original] of originals) {
            if (original) require.cache[id] = original;
            else delete require.cache[id];
        }
        delete require.cache[require.resolve('../bot')];
        if (previousDataDir === undefined) delete process.env.DATA_DIR;
        else process.env.DATA_DIR = previousDataDir;
        fs.rmSync(dataDir, { recursive: true, force: true });
    });
    const commands = new Map();
    const actions = [];
    const settings = { guildId: '120000000000000001', discordToken: 'synthetic', encryptionKey: Buffer.alloc(32).toString('base64') };
    class Database extends Map {
        constructor() { super(); this.db = { pragma() {} }; }
        close() {}
    }
    class Client extends EventEmitter {
        constructor() { super(); this.guilds = { fetch: async () => ({ commands: { create: async command => commands.set(command.name, command.toJSON()) } }) }; }
        async login() {}
        async destroy() {}
    }
    class Service {
        constructor() { this.sync = { ready: true }; }
        async reconcile() {}
        scheduleSummary() {}
        stop() {}
        async action(...args) { actions.push(args); }
    }
    replace('dotenv', { config() {} });
    replace('enmap', Database);
    replace('discord.js', { ...sdk, Client });
    replace('../config.json', {});
    replace('../settings', { loadSettings: () => settings });
    replace('../ticket-service', { TicketService: Service });
    replace('../server', { createApp: () => ({ locals: { close() {} }, listen: () => ({ listening: true, close(done) { done(); }, closeIdleConnections() {} }) }) });
    replace('../tunnel', { startTunnel() {} });
    replace('../utils/logger', { info() {}, error(...args) { assert.fail(JSON.stringify(args)); } });
    const runtime = await require('../bot').main();
    t.after(() => runtime.shutdown());
    runtime.store.write('meta:legacy-complete', true);
    await runtime.client.listeners(sdk.Events.ClientReady)[0]();

    for (const [name, choices] of [['close', closeReasons], ['lock', lockReasons]]) {
        const reason = commands.get(name).options[0];
        assert.equal(reason.name, 'reason');
        assert.equal(reason.required ?? false, false);
        assert.deepEqual(reason.choices?.map(({ name, value }) => ({ name, value })), choices);
        for (const value of [...choices.map(choice => choice.value), null]) {
            const member = { id: '120000000000000002' };
            await runtime.client.listeners(sdk.Events.InteractionCreate)[0]({
                inGuild: () => true, guildId: settings.guildId, isChatInputCommand: () => true,
                commandName: name, channelId: '120000000000000003', member,
                options: { getString: () => value }, deferReply: async () => {}, editReply: async () => {},
            });
            assert.deepEqual(actions.at(-1), ['120000000000000003', name, member, value || '']);
        }
    }
    assert.equal(commands.get('escalate').options[0].choices, undefined);
    assert.equal(commands.get('escalate').options[0].max_length, 500);
});
