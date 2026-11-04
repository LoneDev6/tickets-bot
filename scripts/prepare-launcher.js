const fs = require('node:fs');
const path = require('node:path');

function ensureLauncher(root = path.resolve(__dirname, '..')) {
    const file = path.join(root, '*.js');
    try {
        fs.writeFileSync(file, "// Pterodactyl compatibility launcher.\nrequire('./index').run();\n", { flag: 'wx' });
        console.log('[startup] Launcher Pterodactyl ripristinato.');
    } catch (error) {
        if (error.code !== 'EEXIST') throw error;
        if (!fs.statSync(file).isFile()) throw new Error('Il percorso del launcher *.js deve essere un file.');
    }
}

if (require.main === module) ensureLauncher();
module.exports = { ensureLauncher };
