const fs = require('node:fs');
const path = require('node:path');
const { createHash, randomBytes } = require('node:crypto');
const { execFileSync } = require('node:child_process');
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

function prepare(root = __dirname, { run = execFileSync, env = process.env, log = console.log } = {}) {
    const [major, minor] = process.versions.node.split('.').map(Number);
    if (!((major === 20 && minor >= 19) || (major === 22 && minor >= 12) || major > 22)) throw failure('Serve Node 20.19+ oppure 22.12+. Cambia runtime nel pannello Pterodactyl.');
    // Build tools receive no Discord, OAuth, tunnel or archive secrets, including VITE_* variables.
    const toolEnv = Object.fromEntries(Object.entries(env).filter(([key]) => /^(PATH|HOME|USER|LOGNAME|LANG|LC_ALL|TMPDIR|TMP|TEMP|NODE_EXTRA_CA_CERTS|HTTPS_PROXY|HTTP_PROXY|NO_PROXY|npm_config_cache|NPM_CONFIG_CACHE)$/.test(key)));
    const npm = (cwd, args) => {
        try { run('npm', args, { cwd, env: toolEnv, stdio: 'inherit', timeout: 300_000, shell: false }); }
        catch { throw failure('Preparazione npm fallita. Controlla l’errore sopra, rete, spazio disco e runtime; il bot non è stato avviato. Riprova con un riavvio.'); }
    };
    function dependencies(dir, frontend) {
        const fingerprint = hash(fs.readFileSync(path.join(dir, 'package-lock.json')) + fs.readFileSync(path.join(dir, 'package.json')) + `${process.version}/${process.platform}/${process.arch}`);
        const stamp = path.join(dir, 'node_modules', '.tickets-prepared');
        const required = frontend ? ['vite', 'typescript', 'react'] : ['discord.js', 'dotenv', 'enmap', 'express', 'express-session', 'memorystore'];
        if (!matches(stamp, fingerprint) || required.some(name => !fs.existsSync(path.join(dir, 'node_modules', name, 'package.json')))
            || (!frontend && !fs.existsSync(path.join(dir, 'node_modules/better-sqlite3/build/Release/better_sqlite3.node')))) {
            log(`[startup] Installazione dipendenze ${frontend ? 'pannello' : 'bot'}…`);
            npm(dir, ['ci', '--include=dev', '--no-audit', '--no-fund']);
            fs.writeFileSync(stamp, fingerprint);
        }
        return fingerprint;
    }
    dependencies(root, false);
    const web = path.join(root, 'web');
    const dependencyHash = dependencies(web, true);
    const source = createHash('sha256').update(dependencyHash);
    function include(relative) {
        const file = path.join(web, relative);
        if (!fs.existsSync(file)) return;
        if (fs.statSync(file).isDirectory()) {
            for (const child of fs.readdirSync(file).sort()) include(path.join(relative, child));
        } else source.update(relative).update(fs.readFileSync(file));
    }
    for (const relative of ['src', 'public', 'index.html', 'vite.config.ts', ...fs.readdirSync(web).filter(name => /^tsconfig.*\.json$/.test(name)).sort()]) include(relative);
    const fingerprint = source.digest('hex');
    const stamp = path.join(web, 'dist', '.tickets-built');
    if (!matches(stamp, fingerprint) || !fs.existsSync(path.join(web, 'dist', 'index.html'))) {
        log('[startup] Compilazione pannello…');
        npm(web, ['run', 'build']);
        if (!fs.existsSync(path.join(web, 'dist', 'index.html'))) throw failure('Build pannello incompleta; avvio interrotto.');
        fs.writeFileSync(stamp, fingerprint);
    }
    log('[startup] Dipendenze e pannello pronti.');
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

async function downloadVerified(url, file, sha256, fetchImpl = fetch) {
    const temporary = `${file}.${randomBytes(6).toString('hex')}.part`;
    try {
        const response = await fetchImpl(url, { signal: AbortSignal.timeout(120_000) });
        if (!response.ok || !response.body) throw failure('Download cloudflared fallito; riprova al prossimo riavvio.');
        const digest = createHash('sha256'); let bytes = 0;
        await pipeline(Readable.fromWeb(response.body), new Transform({ transform(chunk, _encoding, callback) {
            bytes += chunk.length;
            if (bytes > 128 * 1024 * 1024) return callback(failure('Download cloudflared troppo grande.'));
            digest.update(chunk); callback(null, chunk);
        } }), fs.createWriteStream(temporary, { mode: 0o600, flags: 'wx' }));
        if (digest.digest('hex') !== sha256) throw failure('Checksum cloudflared non valido; binario scartato, avvio interrotto.');
        fs.chmodSync(temporary, 0o700); fs.renameSync(temporary, file);
    } finally { fs.rmSync(temporary, { force: true }); }
}

async function ensureConnector(root = __dirname, env = process.env, { fetchImpl = fetch, platform = process.platform, arch = process.arch, log = console.log } = {}) {
    if (env.TUNNEL_TOKEN && /\s/.test(env.TUNNEL_TOKEN)) throw failure('TUNNEL_TOKEN deve contenere solo il token del connector, senza spazi o comando di installazione.');
    if (!env.TUNNEL_TOKEN || env.CLOUDFLARED_PATH) return;
    const artifact = CONNECTORS[arch];
    if (platform !== 'linux' || !artifact) throw failure('Download automatico cloudflared disponibile su Linux x64/arm64. Imposta CLOUDFLARED_PATH per un binario compatibile.');
    const dir = path.join(root, '.runtime');
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
    const file = path.join(dir, `cloudflared-${VERSION}-${artifact.name}`);
    if (!fs.existsSync(file) || hash(fs.readFileSync(file)) !== artifact.sha256) {
        log(`[startup] Download cloudflared ${VERSION} verificato con SHA256…`);
        try { await downloadVerified(`https://github.com/cloudflare/cloudflared/releases/download/${VERSION}/cloudflared-linux-${artifact.name}`, file, artifact.sha256, fetchImpl); }
        catch (error) { if (error.startup) throw error; throw failure('Download cloudflared non riuscito. Verifica accesso a GitHub e riprova al riavvio.'); }
    }
    fs.chmodSync(file, 0o700);
    env.CLOUDFLARED_PATH = file;
}

module.exports = { prepare, configureSecrets, ensureConnector, downloadVerified };
