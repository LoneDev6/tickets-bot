const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { ensureLauncher } = require('../scripts/prepare-launcher');

test('postinstall restores the literal launcher and reaches the bootstrap from any working directory', t => {
    const root = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'tickets-launcher-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    fs.writeFileSync(path.join(root, 'index.js'), "exports.run = () => console.log('synthetic bootstrap reached');\n");
    fs.writeFileSync(path.join(root, '.env'), 'synthetic private configuration');
    fs.mkdirSync(path.join(root, 'scripts'));
    fs.copyFileSync(path.join(__dirname, '../scripts/prepare-launcher.js'), path.join(root, 'scripts/prepare-launcher.js'));
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ name: 'synthetic-launcher-test', version: '1.0.0', private: true, scripts: { postinstall: 'node scripts/prepare-launcher.js' } }));
    const env = { ...process.env };
    delete env.npm_config_prefix;
    const installed = execFileSync('npm', ['install', '--offline', '--no-audit', '--no-fund', '--ignore-scripts=false', '--cache', path.join(root, 'npm-cache')], { cwd: root, env, encoding: 'utf8', timeout: 20_000 });
    assert.match(installed, /Launcher Pterodactyl ripristinato/);
    const file = path.join(root, '*.js');
    assert(fs.existsSync(file));
    assert.equal(execFileSync(process.execPath, [file], { cwd: os.tmpdir(), encoding: 'utf8', timeout: 5000 }).trim(), 'synthetic bootstrap reached');
    fs.writeFileSync(file, 'existing custom launcher');
    ensureLauncher(root);
    assert.equal(fs.readFileSync(file, 'utf8'), 'existing custom launcher');
    assert.equal(fs.readFileSync(path.join(root, '.env'), 'utf8'), 'synthetic private configuration');
});
