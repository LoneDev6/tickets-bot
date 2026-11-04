require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const Enmap = require('enmap');
const {
    Client, Events, GatewayIntentBits, Partials, ActionRowBuilder,
    ButtonBuilder, ButtonStyle, TextInputStyle, ModalBuilder, TextInputBuilder,
    SlashCommandBuilder, PermissionFlagsBits,
} = require('discord.js');
const { TicketStore, ID } = require('./tickets');
const { TicketService } = require('./ticket-service');
const { loadSettings } = require('./settings');
const { createApp } = require('./server');
const { importLegacy } = require('./legacy');
const { startTunnel } = require('./tunnel');
const { creationPanel, refreshCreationPanels } = require('./ticket-panel');
const logger = require('./utils/logger');

function row(...buttons) { return new ActionRowBuilder().addComponents(buttons); }
function button(id, label, style = ButtonStyle.Secondary) { return new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style); }
function link(url, label) { return new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(url).setLabel(label); }

async function main() {
    const config = require('./config.json');
    const settings = loadSettings(process.env, config);
    if (!settings.discordToken) throw new Error('Configure DISCORD_TOKEN before starting the bot.');
    const dataDir = path.resolve(process.env.DATA_DIR || 'data');
    fs.mkdirSync(dataDir, { recursive: true, mode: 0o700 });
    const database = new Enmap({ name: 'privateTickets', dataDir, fetchAll: false, autoFetch: true, cloneLevel: 'deep' });
    database.db.pragma('secure_delete = ON');
    let store;
    try { store = new TicketStore(database, settings.encryptionKey); }
    catch (error) { database.close(); throw error; }
    const legacy = new Enmap({ name: 'botData', dataDir, fetchAll: false, autoFetch: true, cloneLevel: 'deep' });
    legacy.db.pragma('secure_delete = ON');
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, ...(settings.messageContentApproved ? [GatewayIntentBits.MessageContent] : [])],
        partials: [Partials.Message, Partials.Channel], allowedMentions: { parse: [], repliedUser: false },
    });
    const service = new TicketService(client, store, settings, { logger });
    const app = createApp({ service, settings });
    const http = app.listen(settings.port, settings.host);
    let tunnel; let initialized = false; let interval; let retentionInterval; let shuttingDown = false;
    const purgeLegacy = id => { const key = `ticket_${id}`; if (legacy.has(key)) legacy.delete(key); };
    store.on('purged', purgeLegacy);
    const event = (name, handler) => client.on(name, (...args) => Promise.resolve().then(() => handler(...args)).catch(error => logger.error(`Discord ${name} handler failed.`, error)));
    const privacyText = `Privacy and deletion: info@devs.beer${settings.publicBaseUrl ? `\n${settings.publicBaseUrl}/privacy` : '\nThe public HTTPS privacy URL is not configured yet.'}`;

    async function replyError(interaction, error) {
        logger.error('Discord interaction failed.', error);
        const payload = { content: 'The operation could not be completed. Please retry or contact support.', ephemeral: true };
        if (interaction.deferred) await interaction.editReply({ content: payload.content });
        else if (interaction.replied) await interaction.followUp(payload);
        else await interaction.reply(payload);
    }
    async function interactionHandler(interaction) {
        if (!interaction.inGuild() || interaction.guildId !== settings.guildId) return;
        if (interaction.isChatInputCommand()) {
            if (interaction.commandName === 'privacy') {
                return interaction.reply({ content: `${privacyText}\nYou can exclude your ticket content from the web copy or request deletion of your local data. Discord messages are unaffected.`, ephemeral: true,
                    components: [row(button('privacy_exclude', 'Exclude web copy'), button('privacy_delete_request', 'Delete my local data', ButtonStyle.Danger))] });
            }
            if (interaction.commandName === 'ticket-panel') {
                if (!await service.staff(interaction.member)) return interaction.reply({ content: 'Only support staff can create this panel.', ephemeral: true });
                if (!settings.publicBaseUrl) return interaction.reply({ content: 'Configure PUBLIC_BASE_URL and the public privacy page before creating a ticket panel.', ephemeral: true });
                return interaction.reply(creationPanel(settings));
            }
            if (interaction.commandName === 'ticket-open') {
                await interaction.deferReply({ ephemeral: true });
                const thread = await service.join(interaction.options.getString('id', true), interaction.member);
                return interaction.editReply({ content: 'You joined the ticket.', components: [row(link(thread.url, 'Go to Ticket'))] });
            }
            if (['close', 'lock', 'escalate'].includes(interaction.commandName)) {
                await interaction.deferReply({ ephemeral: true });
                await service.action(interaction.channelId, interaction.commandName, interaction.member, interaction.options.getString('reason') || '');
                return interaction.editReply({ content: `Ticket ${interaction.commandName === 'escalate' ? 'escalated to the owner' : interaction.commandName === 'lock' ? 'closed and locked' : 'closed'}.` });
            }
            if (interaction.commandName === 'rename') {
                const staff = service.scoped(interaction.channel) ? await service.staff(interaction.member) : interaction.memberPermissions.has(PermissionFlagsBits.Administrator);
                if (!staff) return interaction.reply({ content: 'You are not authorized to rename this channel.', ephemeral: true });
                return interaction.showModal(new ModalBuilder().setCustomId('ticketbot_modal_command_rename').setTitle('Rename').addComponents(row(new TextInputBuilder().setCustomId('full_name').setLabel('Full name').setStyle(TextInputStyle.Short).setValue(interaction.channel.name).setMinLength(1).setMaxLength(100))));
            }
        }
        if (interaction.isButton()) {
            if (interaction.customId === 'privacy_exclude') {
                store.excludeUser(interaction.user.id);
                return interaction.reply({ content: 'Your ticket content has been excluded from the web copy. Support continues in Discord. Contact info@devs.beer for privacy requests.', ephemeral: true });
            }
            if (interaction.customId === 'privacy_delete_request') return interaction.reply({ content: 'Delete your local ticket data? This cannot be undone. A minimal exclusion preference prevents import from recreating the data. Discord messages are unaffected.', ephemeral: true, components: [row(button(`privacy_delete_confirm_${interaction.user.id}`, 'Confirm deletion', ButtonStyle.Danger))] });
            if (interaction.customId.startsWith('privacy_delete_confirm_')) {
                if (interaction.customId.slice('privacy_delete_confirm_'.length) !== interaction.user.id) throw new Error('Invalid deletion identity.');
                store.deleteUser(interaction.user.id);
                for (const key of legacy.indexes.filter(key => key.startsWith('ticket_'))) {
                    const data = legacy.get(key);
                    if (data?.userId === interaction.user.id) legacy.delete(key);
                    else if (data?.joinedUserIds?.includes(interaction.user.id)) legacy.set(key, { ...data, joinedUserIds: data.joinedUserIds.filter(id => id !== interaction.user.id) });
                }
                return interaction.update({ content: 'Your local data has been deleted. For backup or other privacy requests: info@devs.beer.', components: [] });
            }
            if (interaction.customId.startsWith('ticket_panel_join_thread_')) {
                await interaction.deferReply({ ephemeral: true });
                const thread = await service.join(interaction.customId.slice('ticket_panel_join_thread_'.length), interaction.member);
                return interaction.editReply({ content: 'You joined the ticket.', components: [row(link(thread.url, 'Go to Ticket'))] });
            }
            if (interaction.customId === 'ticket_panel_reopen_thread') {
                await interaction.deferReply({ ephemeral: true });
                await service.action(interaction.channelId, 'reopen', interaction.member);
                return interaction.editReply({ content: 'Ticket reopened.' });
            }
            if (['ticket_panel_escalate_thread', 'ticket_panel_resolve_escalation_thread'].includes(interaction.customId)) {
                await interaction.deferReply({ ephemeral: true });
                const action = interaction.customId === 'ticket_panel_escalate_thread' ? 'escalate' : 'resolve-escalation';
                await service.action(interaction.channelId, action, interaction.member);
                return interaction.editReply({ content: action === 'escalate' ? 'Ticket escalated to the owner.' : 'Escalation resolved.' });
            }
            if (['ticket_panel_close_thread', 'ticket_panel_lock_thread'].includes(interaction.customId)) {
                const action = interaction.customId === 'ticket_panel_close_thread' ? 'close' : 'lock';
                const ticket = store.get(interaction.channelId);
                if (!service.scoped(interaction.channel) || (!await service.staff(interaction.member) && !(action === 'close' && ticket?.openerId === interaction.user.id))) throw new Error('Unauthorized ticket action.');
                return interaction.showModal(new ModalBuilder().setCustomId(`modal_ticket_panel_${action}_thread`).setTitle(action === 'close' ? 'Close Ticket' : 'Close & Lock Ticket').addComponents(row(new TextInputBuilder().setCustomId('reason').setLabel('Reason').setStyle(TextInputStyle.Short).setRequired(false).setMaxLength(500))));
            }
            if (interaction.customId === 'ticket_panel_my_tickets') {
                const tickets = store.all().filter(ticket => ticket.openerId === interaction.user.id && ticket.status === 'open');
                const content = tickets.slice(0, 20).map(ticket => `<#${ticket.threadId}>`).join('\n') || 'You have no retained open tickets.';
                return interaction.reply({ content, ephemeral: true, allowedMentions: { parse: [] } });
            }
            if (interaction.customId.startsWith('ticket_panel_create_thread_')) {
                if (!settings.publicBaseUrl) throw new Error('Public privacy page not configured.');
                if (interaction.channelId !== settings.ticketParentId) throw new Error('Use the configured ticket panel.');
                const type = interaction.customId.endsWith('_generic') ? 'generic' : interaction.customId.endsWith('_payment') ? 'payment' : null;
                if (!type) return;
                return interaction.showModal(new ModalBuilder().setCustomId(`modal_ticket_panel_create_thread_${type}`).setTitle('Create a Ticket').addComponents(
                    ...[['question1', 'IS THIS A RARE OCCASION? YES/NO'], ['question2', 'SEARCHED DISCORD AND GITHUB? YES/NO'], ['question3', 'READ THE GUIDELINES? YES/NO']].map(([id, label]) => row(new TextInputBuilder().setCustomId(id).setLabel(label).setStyle(TextInputStyle.Short).setMinLength(2).setMaxLength(3))),
                    row(new TextInputBuilder().setCustomId('description').setLabel('Description (privacy policy in ticket panel)').setStyle(TextInputStyle.Paragraph).setMinLength(48).setMaxLength(3500))));
            }
        }
        if (interaction.isModalSubmit()) {
            if (interaction.customId.startsWith('modal_ticket_panel_create_thread_')) {
                await interaction.deferReply({ ephemeral: true });
                if (!['question1', 'question2', 'question3'].every(id => interaction.fields.getTextInputValue(id).trim().toLowerCase() === 'yes')) return interaction.editReply({ content: 'Answer YES to all three questions before opening a private ticket.' });
                const type = interaction.customId === 'modal_ticket_panel_create_thread_generic' ? 'Generic' : interaction.customId === 'modal_ticket_panel_create_thread_payment' ? 'Payment' : null;
                const thread = await service.create(interaction, type, interaction.fields.getTextInputValue('description'));
                return interaction.editReply({ content: 'Ticket created.', components: [row(link(thread.url, 'Go to Ticket'))] });
            }
            if (['modal_ticket_panel_close_thread', 'modal_ticket_panel_lock_thread'].includes(interaction.customId)) {
                await interaction.deferReply({ ephemeral: true });
                const action = interaction.customId === 'modal_ticket_panel_close_thread' ? 'close' : 'lock';
                await service.action(interaction.channelId, action, interaction.member, interaction.fields.getTextInputValue('reason'));
                return interaction.editReply({ content: `Ticket ${action === 'lock' ? 'locked' : 'closed'}.` });
            }
            if (interaction.customId === 'ticketbot_modal_command_rename') {
                await interaction.deferReply({ ephemeral: true });
                const name = interaction.fields.getTextInputValue('full_name').trim();
                if (!name || name.length > 100) throw new Error('Invalid name.');
                if (service.scoped(interaction.channel)) await service.action(interaction.channelId, 'rename', interaction.member, name);
                else {
                    const fresh = await interaction.guild.members.fetch({ user: interaction.user.id, force: true });
                    if (!fresh.permissions.has(PermissionFlagsBits.Administrator)) throw new Error('Administrator required.');
                    await interaction.channel.setName(name);
                }
                return interaction.editReply({ content: 'Name updated.' });
            }
        }
    }
    event(Events.InteractionCreate, interaction => interactionHandler(interaction).catch(error => replyError(interaction, error)));
    event(Events.ThreadCreate, thread => { if (initialized) service.recordThread(thread); });
    event(Events.ThreadUpdate, (_old, thread) => { if (initialized) service.recordThread(thread); });
    event(Events.ThreadDelete, thread => {
        if (!initialized || !service.scoped(thread) || !store.get(thread.id)) return;
        store.clearMessages(thread.id); store.upsert({ threadId: thread.id, deletedAt: Date.now(), description: null });
    });
    event(Events.MessageCreate, message => { if (initialized) return service.handleMessage(message); });
    event(Events.MessageUpdate, async (_old, message) => {
        if (!initialized || !store.get(message.channelId)) return;
        if (message.partial && settings.messageContentApproved) message = await message.fetch();
        if (!message.partial) await service.handleMessage(message);
    });
    event(Events.MessageDelete, message => { if (initialized) return service.deletedMessage(message.channelId, message.id); });
    event(Events.MessageBulkDelete, messages => Promise.all([...messages.values()].map(message => initialized && service.deletedMessage(message.channelId, message.id))));
    event(Events.ShardDisconnect, () => service.setSync({ ready: false, error: 'Disconnected from Discord.' }));
    event(Events.ShardReconnecting, () => service.setSync({ ready: false, error: 'Reconnecting to Discord.' }));
    event(Events.ShardResume, () => initialized && service.reconcile());
    event(Events.Error, error => logger.error('Discord client error.', error));
    client.once(Events.ClientReady, async () => {
        try {
            const guild = await client.guilds.fetch(settings.guildId);
            const commands = [
                new SlashCommandBuilder().setName('ticket-panel').setDescription('Create the private ticket panel.').setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
                new SlashCommandBuilder().setName('privacy').setDescription('Privacy, web-copy exclusion and local data deletion.'),
                new SlashCommandBuilder().setName('ticket-open').setDescription('Join a private ticket as authorized support.').addStringOption(option => option.setName('id').setDescription('Ticket thread ID').setRequired(true)),
                new SlashCommandBuilder().setName('rename').setDescription('Rename a ticket or channel.'),
                ...['close', 'lock', 'escalate'].map(name => new SlashCommandBuilder().setName(name).setDescription(`${name === 'close' ? 'Close the ticket' : name === 'lock' ? 'Close and lock the ticket' : 'Escalate the ticket to the owner'}.`).addStringOption(option => option.setName('reason').setDescription('Reason').setMaxLength(500))),
            ];
            for (const command of commands) await guild.commands.create(command);
            try { await refreshCreationPanels(client, settings, store); }
            catch (error) { logger.error('Ticket creation panel refresh failed; retry on restart.', { code: error.code }); }
            if (!store.read('meta:legacy-complete')) {
                const report = await importLegacy({ client, legacy, store, settings, channels: [config.channels.ticketsNotifications, config.channels.ticketsOpened], apply: true });
                service.legacyIncomplete = report.errors > 0;
                logger.info('Legacy import report.', report);
            }
            initialized = true;
            await service.reconcile();
            retentionInterval = setInterval(() => store.expire(), 60_000);
            interval = setInterval(() => service.reconcile().catch(error => logger.error('Periodic reconciliation failed.', error)), 15 * 60_000);
            service.scheduleSummary();
            if (settings.messageContentApproved) {
                for (const ticket of store.all()) {
                    if (shuttingDown) break;
                    try { if (!ticket.contentExcluded && ticket.status !== 'deleted') await service.backfill(await service.thread(ticket.threadId)); }
                    catch (error) { logger.error('Conversation backfill incomplete; retry on next startup.', error); }
                }
            }
            logger.info(service.sync.ready ? 'Private ticket service ready.' : 'Private ticket service running with incomplete synchronization.');
        } catch (error) {
            service.setSync({ ready: false, error: 'Startup or import is incomplete. Check configuration and permissions.' });
            logger.error('Ticket initialization failed.', error);
        }
    });
    async function shutdown() {
        if (shuttingDown) return;
        shuttingDown = true; clearInterval(interval); clearInterval(retentionInterval); service.stop(); app.locals.close();
        await tunnel?.stop(); client.destroy();
        await new Promise(resolve => { http.close(resolve); http.closeAllConnections(); });
        legacy.close(); database.close();
    }
    try {
        await new Promise((resolve, reject) => { if (http.listening) resolve(); else { http.once('listening', resolve); http.once('error', reject); } });
        tunnel = startTunnel(settings, { logger });
        await client.login(settings.discordToken);
    } catch (error) { await shutdown(); throw error; }
    return { app, http, client, store, service, shutdown };
}

module.exports = { main };
