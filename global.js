require('dotenv').config()
const config = require("./config.json");

const settings = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    GUILD_ID: process.env.GUILD_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    LICENSE_BACKEND_URL: process.env.LICENSE_BACKEND_URL,
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = {
    settings,
    config,
    sleep
};
