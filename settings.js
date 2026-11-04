const { ID } = require('./tickets');

function loadSettings(env, config) {
    const port = Number(env.WEB_PORT || 7777);
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid WEB_PORT.');
    const development = env.NODE_ENV === 'development';
    const base = env.PUBLIC_BASE_URL ? new URL(env.PUBLIC_BASE_URL) : null;
    if (base && (base.pathname !== '/' || base.search || base.hash || base.username || base.password
        || (base.protocol !== 'https:' && !(development && base.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(base.hostname))))) {
        throw new Error('PUBLIC_BASE_URL must be a canonical HTTPS origin.');
    }
    const ownerId = env.OWNER_ID || '';
    if (ownerId && !ID.test(ownerId)) throw new Error('Invalid OWNER_ID.');
    const supportRoleId = env.SUPPORT_TEAM_ROLE_ID || config.roles.support_team;
    if (!ID.test(config.guild) || !ID.test(config.channels.tickets) || !ID.test(supportRoleId)) throw new Error('Invalid guild, ticket channel or SUPPORT_TEAM_ROLE_ID configuration.');
    if (base && (!ownerId || !env.CLIENT_ID || !env.DISCORD_CLIENT_SECRET || !env.SESSION_SECRET || env.SESSION_SECRET.length < 32)) {
        throw new Error('Web login requires OWNER_ID, CLIENT_ID, DISCORD_CLIENT_SECRET and SESSION_SECRET (at least 32 characters).');
    }
    for (const name of ['MESSAGE_CONTENT_APPROVED', 'WEB_CHAT_ENABLED', 'WEB_REPLIES_ENABLED']) {
        if (env[name] !== undefined && !['true', 'false'].includes(env[name])) throw new Error(`${name} must be true or false.`);
    }
    if (env.STATS_API_TOKEN && (env.STATS_API_TOKEN.length < 32 || env.STATS_API_TOKEN.length > 256 || /\s/.test(env.STATS_API_TOKEN))) throw new Error('STATS_API_TOKEN must contain 32–256 characters without whitespace.');
    const legacyParents = (env.LEGACY_TICKET_PARENT_IDS || '').split(',').map(value => value.trim()).filter(Boolean);
    const legacyBotIds = (env.LEGACY_BOT_IDS || '').split(',').map(value => value.trim()).filter(Boolean);
    if ([...legacyParents, ...legacyBotIds].some(value => !ID.test(value))) throw new Error('Invalid legacy parent or bot ID.');
    return {
        port, host: env.WEB_HOST || '127.0.0.1', development, publicBaseUrl: base?.origin || null,
        ownerId, guildId: config.guild, ticketParentId: config.channels.tickets,
        ticketParentIds: [...new Set([config.channels.tickets, ...legacyParents])], legacyBotIds,
        supportRoleId, summaryChannelId: env.SUMMARY_CHANNEL_ID || config.channels.ticketsNotifications,
        verificationChannelId: env.VERIFICATION_CHANNEL_ID || '989167088742572072',
        discordToken: env.DISCORD_TOKEN, clientId: env.CLIENT_ID, clientSecret: env.DISCORD_CLIENT_SECRET,
        sessionSecret: env.SESSION_SECRET, encryptionKey: env.TICKET_ENCRYPTION_KEY,
        messageContentApproved: env.MESSAGE_CONTENT_APPROVED === 'true',
        webChatEnabled: env.WEB_CHAT_ENABLED === 'true', webRepliesEnabled: env.WEB_REPLIES_ENABLED === 'true', statsApiToken: env.STATS_API_TOKEN || null,
        privacyRegion: env.PRIVACY_HOSTING_REGION || null, privacyEmailProvider: env.PRIVACY_EMAIL_PROVIDER || null,
        backups: env.PRIVACY_BACKUP_POLICY || null,
        tunnelToken: env.TUNNEL_TOKEN || null, cloudflaredPath: env.CLOUDFLARED_PATH || null,
        tunnelProtocol: env.TUNNEL_PROTOCOL || 'auto',
    };
}

module.exports = { loadSettings };
