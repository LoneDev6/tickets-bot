'use strict';

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const FILE = '.runtime/setup.json';
const INVALID = 'Configurazione salvata non valida. Ripristina .runtime/setup.json prima dell’avvio.';
const URL_ERROR = 'Inserisci un’origine HTTPS come https://tickets.example.com, senza percorso, query o frammento.';
const IDS_ERROR = 'Gli ID Discord devono contenere da 16 a 22 cifre.';

function origin(value) {
    try {
        const url = new URL(value);
        if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) return null;
        return url.origin;
    } catch { return null; }
}

function validIds(clientId, ownerId) {
    return /^\d{16,22}$/.test(clientId) && /^\d{16,22}$/.test(ownerId);
}

async function configureDeployment(root = __dirname, env = process.env, { input = process.stdin, output = process.stdout, signal } = {}) {
    signal?.throwIfAborted();
    const filename = path.join(root, FILE);
    let saved = {};
    if (fs.existsSync(filename)) {
        try {
            saved = JSON.parse(fs.readFileSync(filename, 'utf8'));
            if (!saved || typeof saved !== 'object' || Array.isArray(saved) ||
                (saved.tunnelEnabled !== undefined && typeof saved.tunnelEnabled !== 'boolean') ||
                ['PUBLIC_BASE_URL', 'CLIENT_ID', 'OWNER_ID'].some(key => saved[key] !== undefined && typeof saved[key] !== 'string') ||
                (saved.PUBLIC_BASE_URL !== undefined && !origin(saved.PUBLIC_BASE_URL)) ||
                (saved.CLIENT_ID !== undefined && !/^\d{16,22}$/.test(saved.CLIENT_ID)) ||
                (saved.OWNER_ID !== undefined && !/^\d{16,22}$/.test(saved.OWNER_ID))) throw new Error();
        } catch { throw startupError(INVALID); }
    }

    for (const key of ['PUBLIC_BASE_URL', 'CLIENT_ID', 'OWNER_ID']) if (!env[key] && saved[key]) env[key] = saved[key];
    const complete = origin(env.PUBLIC_BASE_URL || '') && validIds(env.CLIENT_ID || '', env.OWNER_ID || '');
    if (complete) {
        missingSecrets(env, Boolean(saved.tunnelEnabled));
        return;
    }

    const rl = readline.createInterface({ input, output, terminal: false });
    const abort = () => rl.close();
    signal?.addEventListener('abort', abort, { once: true });
    const lines = rl[Symbol.asyncIterator]();
    const ask = async (label, validate, message) => {
        for (;;) {
            output.write(`${label}\n> `);
            const line = await lines.next();
            signal?.throwIfAborted();
            if (line.done) { rl.close(); throw startupError('Configurazione interrotta: input console chiuso. Configura .env oppure riavvia con la console disponibile.'); }
            const value = line.value.trim();
            const parsed = validate(value);
            if (parsed) return parsed;
            output.write(`${message}\n`);
        }
    };
    try {
        output.write('Configurazione iniziale. La console Pterodactyl può registrare l’input: non digitare segreti qui.\n');
        output.write('1. Apri Cloudflare: https://one.dash.cloudflare.com/ e crea un tunnel gestito di tipo Cloudflared.\n');
        output.write('2. Aggiungi un hostname pubblico del tuo dominio, servizio HTTP → 127.0.0.1:7777.\n');
        output.write('3. Copia il token del connector in TUNNEL_TOKEN nelle variabili protette oppure in .env dal gestore file. Non incollare il comando di installazione completo.\n');
        output.write('Guida ufficiale: https://developers.cloudflare.com/tunnel/get-started/\n');
        const publicBaseUrl = origin(env.PUBLIC_BASE_URL || '') || await ask('Indirizzo HTTPS pubblico del pannello:', origin, URL_ERROR);
        const clientId = /^\d{16,22}$/.test(env.CLIENT_ID || '') ? env.CLIENT_ID : await ask('Application ID Discord del bot:', value => /^\d{16,22}$/.test(value) ? value : null, IDS_ERROR);
        const ownerId = /^\d{16,22}$/.test(env.OWNER_ID || '') ? env.OWNER_ID : await ask('Il tuo ID utente Discord:', value => /^\d{16,22}$/.test(value) ? value : null, IDS_ERROR);
        output.write(`4. Nel Developer Portal Discord registra il redirect OAuth: ${publicBaseUrl}/auth/discord/callback\n`);
        output.write('5. Imposta DISCORD_TOKEN, DISCORD_CLIENT_SECRET e TUNNEL_TOKEN nelle variabili protette oppure nel file .env, poi riavvia.\n');
        const config = { PUBLIC_BASE_URL: publicBaseUrl, CLIENT_ID: clientId, OWNER_ID: ownerId, tunnelEnabled: true };
        fs.mkdirSync(path.dirname(filename), { recursive: true, mode: 0o700 });
        fs.writeFileSync(filename, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
        fs.chmodSync(path.dirname(filename), 0o700);
        fs.chmodSync(filename, 0o600);
        Object.assign(env, { PUBLIC_BASE_URL: publicBaseUrl, CLIENT_ID: clientId, OWNER_ID: ownerId });
        missingSecrets(env, true);
    } finally { signal?.removeEventListener('abort', abort); rl.close(); }
}

function startupError(message) {
    const error = new Error(message);
    error.startup = true;
    return error;
}

function missingSecrets(env, tunnelEnabled) {
    const missing = ['DISCORD_TOKEN', 'DISCORD_CLIENT_SECRET', ...(tunnelEnabled ? ['TUNNEL_TOKEN'] : [])].filter(key => !env[key]);
    if (missing.length) throw startupError(`Imposta queste variabili protette oppure aggiungile in .env dal gestore file, poi riavvia: ${missing.join(', ')}.`);
}

module.exports = { configureDeployment };
