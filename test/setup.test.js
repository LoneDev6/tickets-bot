'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { PassThrough } = require('node:stream');
const test = require('node:test');
const { configureDeployment } = require('../setup');

function fixture() {
    const root = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'tickets-setup-'));
    const input = new PassThrough();
    const output = new PassThrough();
    let text = '';
    output.on('data', chunk => { text += chunk; });
    return { root, input, output, get text() { return text; }, close() { input.destroy(); output.destroy(); fs.rmSync(root, { recursive: true, force: true }); } };
}

test('persists public setup only and restart needs secrets but no prompts', async () => {
    const f = fixture();
    try {
        const env = {};
        const first = configureDeployment(f.root, env, { input: f.input, output: f.output });
        f.input.end('https://tickets.example.com\n123456789012345678\n223456789012345678\n');
        await assert.rejects(first, error => error.startup && /DISCORD_TOKEN, DISCORD_CLIENT_SECRET, TUNNEL_TOKEN/.test(error.message));
        const filename = path.join(f.root, '.runtime/setup.json');
        const data = fs.readFileSync(filename, 'utf8');
        assert.deepEqual(JSON.parse(data), { PUBLIC_BASE_URL: 'https://tickets.example.com', CLIENT_ID: '123456789012345678', OWNER_ID: '223456789012345678', tunnelEnabled: true });
        assert.equal(fs.statSync(path.dirname(filename)).mode & 0o777, 0o700);
        assert.equal(fs.statSync(filename).mode & 0o777, 0o600);
        assert.doesNotMatch(data + f.text, /secret-value|token-value/);
        const savedEnv = { DISCORD_TOKEN: 'secret-value', DISCORD_CLIENT_SECRET: 'secret-value', TUNNEL_TOKEN: 'token-value' };
        const restartOutput = new PassThrough();
        let restartText = '';
        restartOutput.on('data', chunk => { restartText += chunk; });
        await configureDeployment(f.root, savedEnv, { input: new PassThrough(), output: restartOutput });
        assert.equal(savedEnv.PUBLIC_BASE_URL, 'https://tickets.example.com');
        assert.equal(restartText, '');
        restartOutput.destroy();
    } finally { f.close(); }
});

test('rejects invalid origins with retry and aborts cleanly at EOF', async () => {
    const f = fixture();
    try {
        const pending = configureDeployment(f.root, {}, { input: f.input, output: f.output });
        f.input.end('http://tickets.example.com/path\nhttps://tickets.example.com\n123456789012345678\n223456789012345678\n');
        await assert.rejects(pending, error => error.startup && /DISCORD_TOKEN/.test(error.message));
        assert.match(f.text, /origine HTTPS/);
    } finally { f.close(); }

    const eof = fixture();
    try {
        eof.input.end();
        await assert.rejects(configureDeployment(eof.root, {}, { input: eof.input, output: eof.output }), error => error.startup && /input console chiuso/.test(error.message));
        assert.equal(fs.existsSync(path.join(eof.root, '.runtime/setup.json')), false);
    } finally { eof.close(); }
});

test('fully configured externally proxied deployment skips wizard without tunnel token', async () => {
    const f = fixture();
    try {
        const env = { PUBLIC_BASE_URL: 'https://tickets.example.com', CLIENT_ID: '123456789012345678', OWNER_ID: '223456789012345678', DISCORD_TOKEN: 'token', DISCORD_CLIENT_SECRET: 'secret' };
        await configureDeployment(f.root, env, { input: new PassThrough(), output: f.output });
        assert.equal(f.text, '');
        assert.equal(fs.existsSync(path.join(f.root, '.runtime/setup.json')), false);
    } finally { f.close(); }
});

test('shutdown cancels a waiting setup prompt without saving partial settings', async () => {
    const f = fixture();
    try {
        const controller = new AbortController();
        const pending = configureDeployment(f.root, {}, { input: f.input, output: f.output, signal: controller.signal });
        controller.abort();
        await assert.rejects(pending, { name: 'AbortError' });
        assert.equal(fs.existsSync(path.join(f.root, '.runtime/setup.json')), false);
    } finally { f.close(); }
});
