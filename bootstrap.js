const fs = require('node:fs');
const path = require('node:path');
const { createHash, randomBytes } = require('node:crypto');
const { spawn } = require('node:child_process');
const { Readable, Transform } = require('node:stream');
const { pipeline } = require('node:stream/promises');

const VERSION = '2026.10.2';
// Official release checksums: https://github.com/cloudflare/cloudflared/releases/tag/2026.10.2
const CONNECTORS = {
    x64: { name: 'amd64', sha256: '35fbdd2beb378436c7da377d7358cea8e33f9c94a6705d1d8036bf9b0d6d8005' },
    arm64: { name: 'arm64', sha256: 'b7e55b4d9702c2ab5f8348f780bb1db044527fc555367714c78e0595750a4665' },
};

function failure(message) { return Object.assign(new Error(message), { startup: true }); }
function hash(value) { return createHash('sha256').update(value).digest('hex'); }
function matches(file, value) { return fs.existsSync(file) && fs.readFileSync(file, 'utf8') === value; }

function install(command, args, options) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { ...options, stdio: 'inherit', detached: process.platform !== 'win32' });
        let failure; let force;
        const kill = signal => {
            if (process.platform === 'win32') child.kill(signal);
            else if (child.pid) { try { process.kill(-child.pid, signal); } catch (error) { if (error.code !== 'ESRCH') throw error; } }
        };
        const abort = () => {
            kill('SIGTERM');
            force = setTimeout(() => kill('SIGKILL'), 5000);
        };
        options.signal?.addEventListener('abort', abort, { once: true });
        child.on('error', error => { failure = error; });
        child.once('close', code => {
            if (options.signal?.aborted || failure || code !== 0) kill('SIGKILL');
            clearTimeout(force);
            options.signal?.removeEventListener('abort', abort);
            if (failure || code !== 0) reject(failure || new Error('Dependency installation failed.'));
            else resolve();
        });
    });
}

async function prepare(root = __dirname, { run = install, env = process.env, log = console.log, signal } = {}) {
    signal?.throwIfAborted();
    const [major, minor] = process.versions.node.split('.').map(Number);
    if (!((major === 20 && minor >= 19) || (major === 22 && minor >= 12) || major > 22)) throw failure('Serve Node 20.19+ oppure 22.12+. Cambia runtime nel pannello Pterodactyl.');
    const dist = path.join(root, 'web', 'dist');
    const index = path.join(dist, 'index.html');
    if (!fs.existsSync(index)) throw failure('Build pannello mancante. Esegui npm run build:web in locale e pubblica web/dist nel repository.');
    const assets = [...fs.readFileSync(index, 'utf8').matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)];
    if (assets.some(([, asset]) => !fs.existsSync(path.join(dist, asset.slice(1))))) throw failure('Build pannello incompleta. Ricompila in locale e pubblica tutta la cartella web/dist.');
    // Installers receive no Discord, OAuth, tunnel or archive secrets.
    const toolEnv = Object.fromEntries(Object.entries(env).filter(([key]) => /^(PATH|HOME|USER|LOGNAME|LANG|LC_ALL|TMPDIR|TMP|TEMP|NODE_EXTRA_CA_CERTS|HTTPS_PROXY|HTTP_PROXY|NO_PROXY|npm_config_cache|NPM_CONFIG_CACHE)$/.test(key)));
    const npm = async (cwd, args) => {
        try { await run('npm', args, { cwd, env: toolEnv, timeout: 300_000, shell: false, signal }); }
        catch { signal?.throwIfAborted(); throw failure('Preparazione npm fallita. Controlla rete, spazio disco e runtime; il bot non è stato avviato. Riprova con un riavvio.'); }
    };
    const fingerprint = hash(fs.readFileSync(path.join(root, 'package-lock.json')) + fs.readFileSync(path.join(root, 'package.json')) + `${process.version}/${process.platform}/${process.arch}`);
    const stamp = path.join(root, 'node_modules', '.tickets-prepared');
    const required = ['discord.js', 'dotenv', 'enmap', 'express', 'express-session', 'memorystore'];
    if (!matches(stamp, fingerprint) || required.some(name => !fs.existsSync(path.join(root, 'node_modules', name, 'package.json')))
        || !fs.existsSync(path.join(root, 'node_modules/better-sqlite3/build/Release/better_sqlite3.node'))) {
        log('[startup] Installazione dipendenze bot…');
        await npm(root, ['ci', '--include=dev', '--no-audit', '--no-fund']);
        signal?.throwIfAborted();
        fs.writeFileSync(stamp, fingerprint);
    }
    log('[startup] Dipendenze bot e pannello precompilato pronti.');
}

function configureSecrets(root = __dirname, env = process.env) {
    const dir = path.join(root, '.runtime');
    const file = path.join(dir, 'secrets.json');
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
    let saved = {};
    if (fs.existsSync(file)) {
        try { saved = JSON.parse(fs.readFileSync(file, 'utf8')); }
        catch { throw failure('File .runtime/secrets.json illeggibile. Ripristina le chiavi salvate; non eliminare il file.'); }
        if (!saved || typeof saved !== 'object' || Array.isArray(saved)) throw failure('File segreti non valido. Ripristina .runtime/secrets.json.');
    }
    const values = {};
    for (const name of ['TICKET_ENCRYPTION_KEY', 'SESSION_SECRET']) {
        if (saved[name] && env[name] && saved[name] !== env[name]) throw failure(`${name} differisce dalla chiave persistita. Ripristina il valore originale; nessuna chiave è stata sovrascritta.`);
        const value = env[name] || saved[name] || randomBytes(name === 'TICKET_ENCRYPTION_KEY' ? 32 : 48).toString('base64');
        if (typeof value !== 'string' || (name === 'TICKET_ENCRYPTION_KEY' ? Buffer.from(value, 'base64').length !== 32 || Buffer.from(value, 'base64').toString('base64') !== value : value.length < 32)) throw failure(`${name} non valido.`);
        values[name] = value;
    }
    if (!fs.existsSync(file)) fs.writeFileSync(file, `${JSON.stringify(values)}\n`, { mode: 0o600, flag: 'wx' });
    else if (!saved.TICKET_ENCRYPTION_KEY || !saved.SESSION_SECRET) throw failure('File segreti incompleto. Ripristina .runtime/secrets.json.');
    fs.chmodSync(dir, 0o700); fs.chmodSync(file, 0o600);
    Object.assign(env, values);
}

async function downloadVerified(url, file, sha256, fetchImpl = fetch, signal) {
    const temporary = `${file}.${randomBytes(6).toString('hex')}.part`;
    try {
        const combinedSignal = signal ? AbortSignal.any([signal, AbortSignal.timeout(120_000)]) : AbortSignal.timeout(120_000);
        const response = await fetchImpl(url, { signal: combinedSignal });
        if (!response.ok || !response.body) throw failure('Download cloudflared fallito; riprova al prossimo riavvio.');
        const digest = createHash('sha256'); let bytes = 0;
        await pipeline(Readable.fromWeb(response.body), new Transform({ transform(chunk, _encoding, callback) {
            bytes += chunk.length;
            if (bytes > 128 * 1024 * 1024) return callback(failure('Download cloudflared troppo grande.'));
            digest.update(chunk); callback(null, chunk);
        } }), fs.createWriteStream(temporary, { mode: 0o600, flags: 'wx' }), { signal: combinedSignal });
        if (digest.digest('hex') !== sha256) throw failure('Checksum cloudflared non valido; binario scartato, avvio interrotto.');
        fs.chmodSync(temporary, 0o700); fs.renameSync(temporary, file);
    } finally { fs.rmSync(temporary, { force: true }); }
}

async function ensureConnector(root = __dirname, env = process.env, { fetchImpl = fetch, platform = process.platform, arch = process.arch, log = console.log, signal } = {}) {
    signal?.throwIfAborted();
    if (env.TUNNEL_TOKEN && /\s/.test(env.TUNNEL_TOKEN)) throw failure('TUNNEL_TOKEN deve contenere solo il token del connector, senza spazi o comando di installazione.');
    if (!env.TUNNEL_TOKEN || env.CLOUDFLARED_PATH) return;
    const artifact = CONNECTORS[arch];
    if (platform !== 'linux' || !artifact) throw failure('Download automatico cloudflared disponibile su Linux x64/arm64. Imposta CLOUDFLARED_PATH per un binario compatibile.');
    const dir = path.join(root, '.runtime');
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
    const file = path.join(dir, `cloudflared-${VERSION}-${artifact.name}`);
    if (!fs.existsSync(file) || hash(fs.readFileSync(file)) !== artifact.sha256) {
        log(`[startup] Download cloudflared ${VERSION} verificato con SHA256…`);
        try { await downloadVerified(`https://github.com/cloudflare/cloudflared/releases/download/${VERSION}/cloudflared-linux-${artifact.name}`, file, artifact.sha256, fetchImpl, signal); }
        catch (error) { signal?.throwIfAborted(); if (error.startup) throw error; throw failure('Download cloudflared non riuscito. Verifica accesso a GitHub e riprova al riavvio.'); }
    }
    fs.chmodSync(file, 0o700);
    env.CLOUDFLARED_PATH = file;
}

module.exports = { prepare, configureSecrets, ensureConnector, downloadVerified };
