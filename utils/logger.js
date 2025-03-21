const chalk = require("chalk");
const moment = require("moment");
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname + "/../data/", 'log.txt');

module.exports = class Logger {
    static generic(level, color, content, obj = '') {
        const date = `${moment().format("DD-MM-YYYY HH:mm:ss")}`;
        const logMessage = `[${level}] [${date}] ${content}`;
        console.log(chalk.hex(color)(`❯ ${logMessage}`), obj);

        // Ensure the data folder exists
        const logDir = path.dirname(logFilePath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const logToFile = `${logMessage} ${obj ? JSON.stringify(obj) : ''}\n`;
        fs.appendFile(logFilePath, logToFile, (err) => {
            if (err) {
            console.error('Errore durante la scrittura del log su file:', err);
            }
        });
    }

    static log(content, obj = '') {
        this.info(content, obj);
    }

    static info(content, obj = '') {
        this.generic("?", '#1FAC64', content, obj);
    }

    static warn(content, obj = '') {
        this.generic("!", '#ffd966', content, obj);
    }

    static error(content, obj = '') {
        this.generic("!", '#E06666', content, obj);
    }

    static success(content, obj = '') {
        this.generic("OK", '#1FAC64', content, obj);
    }

    static event(content, obj = '') {
        this.generic("*", '#1FAC64', content, obj);
    }
};
