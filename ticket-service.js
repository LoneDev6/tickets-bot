const { EventEmitter } = require('node:events');
const { ChannelType, PermissionFlagsBits, WebhookType } = require('discord.js');
const { ID } = require('./tickets');

function unknownChannel(error) {
    return Number(error.code) === 10003;
}

function threadData(thread) {
    return {
        threadId: thread.id, guildId: thread.guildId || thread.guild_id, parentId: thread.parentId || thread.parent_id,
        name: thread.name, createdAt: thread.createdTimestamp || Number((BigInt(thread.id) >> 22n) + 1420070400000n),
        archived: thread.archived ?? thread.thread_metadata?.archived ?? false,
        locked: thread.locked ?? thread.thread_metadata?.locked ?? false,
    };
}

class TicketService extends EventEmitter {
    constructor(client, store, settings, { logger = console } = {}) {
        super();
        this.client = client;
        this.store = store;
        this.settings = settings;
        this.logger = logger;
        this.sync = { ready: false, updatedAt: null, error: null };
        this.busyUsers = new Set();
        this.busyTickets = new Set();
        this.webhookLookups = new Map();
        this.summaryTimer = null;
        this.summaryRunning = false;
        this.summaryPending = false;
        this.stopping = false;
        this.reconciling = false;
        this.store.on('change', event => {
            this.emit('tickets', event);
            this.scheduleSummary();
        });
    }

    capabilities() {
        const enabled = this.settings.messageContentApproved;
        return {
            canReadConversation: Boolean(enabled && this.settings.webChatEnabled), canArchiveConversation: enabled,
            canReply: Boolean(enabled && this.settings.webChatEnabled && this.settings.webRepliesEnabled), canManageTicket: true,
            reason: !enabled ? 'Web chat is unavailable until Discord Message Content access is approved.' : !this.settings.webChatEnabled ? 'Web chat is disabled. Open this ticket in Discord.' : !this.settings.webRepliesEnabled ? 'Web replies are disabled. Reply in Discord.' : 'Staff replies use a Discord webhook with your server name and avatar.',
        };
    }

    setSync(update) {
        this.sync = { ...this.sync, ...update };
        this.emit('sync', this.sync);
        this.scheduleSummary();
    }

    scoped(thread) {
        return thread && (thread.guildId || thread.guild_id) === this.settings.guildId
            && (this.settings.ticketParentIds || [this.settings.ticketParentId]).includes(thread.parentId || thread.parent_id)
            && thread.type === ChannelType.PrivateThread;
    }

    recordThread(thread) {
        if (!this.scoped(thread)) return null;
        const previous = this.store.get(thread.id);
        const input = threadData(thread);
        if (!previous) {
            input.statusChangedAt = thread.archiveTimestamp || Date.parse(thread.thread_metadata?.archive_timestamp) || input.createdAt;
        }
        return this.store.upsert(input);
    }

    async staff(member) {
        return Boolean(await this.staffProfile(member));
    }

    async staffProfile(member) {
        if (!member || member.guild?.id !== this.settings.guildId) return false;
        const fresh = await member.guild.members.fetch({ user: member.id, force: true });
        return fresh.id === member.id && fresh.roles.cache.has(this.settings.supportRoleId) ? fresh : null;
    }

    async replyWebhook(parentId) {
        if (this.webhookLookups.has(parentId)) return this.webhookLookups.get(parentId);
        const lookup = (async () => {
            const parent = await this.client.channels.fetch(parentId, { force: true });
            if (parent.guildId !== this.settings.guildId || parent.type !== ChannelType.GuildText
                || !parent.permissionsFor(this.client.user)?.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageWebhooks])) {
                throw Object.assign(new Error('The bot needs View Channel and Manage Webhooks on the ticket parent.'), { status: 409 });
            }
            const hooks = await parent.fetchWebhooks();
            const hook = hooks.find(item => item.type === WebhookType.Incoming && item.owner?.id === this.client.user.id && item.name === 'Ticket staff replies' && item.token);
            return hook || parent.createWebhook({ name: 'Ticket staff replies', reason: 'Web dashboard staff replies' });
        })().finally(() => this.webhookLookups.delete(parentId));
        this.webhookLookups.set(parentId, lookup);
        return lookup;
    }

    async reply(threadId, member, content) {
        if (typeof content !== 'string' || !content.trim() || content.length > 2000) throw Object.assign(new Error('A reply must contain 1–2000 characters.'), { status: 400 });
        if (!this.capabilities().canReply) throw Object.assign(new Error(this.capabilities().reason), { status: 409 });
        if (this.busyTickets.has(threadId)) throw Object.assign(new Error('Another action is in progress for this ticket.'), { status: 409 });
        this.busyTickets.add(threadId);
        try {
            const staff = await this.staffProfile(member);
            if (!staff) throw Object.assign(new Error('Only authorized support staff may reply.'), { status: 403 });
            const thread = await this.thread(threadId);
            const ticket = this.store.get(threadId);
            if (!ticket || ticket.contentExcluded || this.store.excluded(staff.id) || thread.archived || thread.locked || ticket.status !== 'open') throw Object.assign(new Error('This ticket is not open for web replies.'), { status: 409 });
            if (!thread.permissionsFor(this.client.user)?.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessagesInThreads])) throw Object.assign(new Error('The bot cannot send messages in this private thread.'), { status: 409 });
            const hook = await this.replyWebhook(thread.parentId);
            if (hook.channelId !== thread.parentId || hook.guildId !== this.settings.guildId || hook.owner?.id !== this.client.user.id || hook.type !== WebhookType.Incoming) throw Object.assign(new Error('The ticket webhook does not belong to this bot and channel.'), { status: 409 });
            // Execute Webhook can auto-unarchive: never knowingly reopen a ticket by sending.
            const current = await this.thread(threadId);
            if (current.archived || current.locked || this.store.get(threadId)?.status !== 'open' || this.store.get(threadId)?.contentExcluded) throw Object.assign(new Error('Reopen the ticket before replying.'), { status: 409 });
            const name = staff.displayName || staff.user.globalName || staff.user.username;
            const avatar = staff.displayAvatarURL({ size: 128 });
            const sent = await hook.send({ content: content.trim(), username: name, avatarURL: avatar, threadId, allowedMentions: { parse: [], repliedUser: false } });
            if (sent.channelId !== threadId || sent.webhookId !== hook.id || !ID.test(sent.id)) throw new Error('Unexpected webhook message destination.');
            const attribution = { staffAuthorId: staff.id, authorName: name, authorAvatarUrl: avatar, webhookId: hook.id };
            await this.handleMessage(sent, attribution);
            const saved = this.store.message(threadId, sent.id);
            if (saved) this.store.saveMessage(threadId, { ...saved, ...attribution, authorId: staff.id, bot: true });
            const latest = this.store.get(threadId);
            if (latest) this.store.upsert({ threadId, lastAction: { action: 'reply', actorId: this.store.excluded(staff.id) ? null : staff.id, messageId: sent.id, reason: null, at: Date.now() } });
            return sent.id;
        } catch (error) {
            if (Number.isInteger(error.code)) {
                this.logger.warn('Staff webhook reply failed.', { code: error.code, status: error.status || 503, threadId });
                throw Object.assign(new Error('Discord webhook delivery is unavailable.'), { status: 503 });
            }
            throw error;
        } finally { this.busyTickets.delete(threadId); }
    }

    async thread(threadId) {
        if (!ID.test(threadId || '')) throw new Error('Invalid ticket ID.');
        const thread = await this.client.channels.fetch(threadId, { force: true });
        if (!this.scoped(thread)) throw new Error('This is not a configured private support ticket.');
        return thread;
    }

    async action(threadId, action, member, reason = '') {
        if (!['close', 'lock', 'close-lock', 'reopen', 'rename', 'escalate', 'resolve-escalation'].includes(action)) throw Object.assign(new Error('Invalid ticket action.'), { status: 400 });
        if (typeof reason !== 'string' || reason.length > (action === 'rename' ? 100 : 500)) throw Object.assign(new Error('Invalid action reason.'), { status: 400 });
        if (this.busyTickets.has(threadId)) throw Object.assign(new Error('Another action is in progress for this ticket.'), { status: 409 });
        this.busyTickets.add(threadId);
        try {
            const thread = await this.thread(threadId);
            const staff = await this.staff(member);
            const ticket = this.store.get(threadId) || this.recordThread(thread);
            if (!ticket) throw Object.assign(new Error('This ticket is no longer retained.'), { status: 404 });
            if (!staff && !(action === 'close' && ticket?.openerId === member.id)) throw Object.assign(new Error('You are not authorized to perform this action.'), { status: 403 });
            if (action === 'escalate' || action === 'resolve-escalation') {
                if (action === 'escalate') {
                    if (thread.archived || thread.locked) throw Object.assign(new Error('Reopen the ticket before escalating it.'), { status: 409 });
                    if (ticket.escalatedAt) return thread;
                    if (!ID.test(this.settings.ownerId || '')) throw Object.assign(new Error('The server owner is not configured.'), { status: 409 });
                    await thread.members.add(this.settings.ownerId);
                    await thread.send({ content: `<@${this.settings.ownerId}> Support has escalated this ticket for your attention.`, allowedMentions: { parse: [], users: [this.settings.ownerId] } });
                }
                this.store.upsert({ threadId, escalatedAt: action === 'escalate' ? Date.now() : null, escalatedBy: action === 'escalate' ? member.id : null,
                    escalationReason: action === 'escalate' ? reason.trim() || null : null,
                    lastAction: { action, actorId: member.id, reason: reason.trim() || null, at: Date.now() } });
                return thread;
            }
            let updated;
            if (action === 'rename') {
                if (!reason.trim() || reason.length > 100) throw new Error('The name must contain between 1 and 100 characters.');
                updated = await thread.setName(reason.trim());
            } else if (action === 'reopen') {
                updated = await thread.edit({ locked: false, archived: false }, 'Reopened by support');
            } else {
                updated = await thread.edit({ archived: true, ...(['lock', 'close-lock'].includes(action) ? { locked: true } : {}) }, reason || 'No reason.');
            }
            this.recordThread(updated);
            this.store.upsert({ threadId, ...(['close', 'lock', 'close-lock'].includes(action) ? { escalatedAt: null, escalatedBy: null, escalationReason: null } : {}), lastAction: { action, actorId: member.id, reason: reason || null, at: Date.now() } });
            return thread;
        } finally { this.busyTickets.delete(threadId); }
    }

    async create(interaction, type, description) {
        const userId = interaction.user.id;
        if (interaction.guildId !== this.settings.guildId || interaction.channelId !== this.settings.ticketParentId) throw new Error('Use the configured ticket panel.');
        if (this.busyUsers.has(userId)) throw new Error('Your ticket is already being created.');
        if (!['Generic', 'Payment'].includes(type) || typeof description !== 'string' || description.trim().length < 48 || description.length > 3500) throw new Error('Describe the request using between 48 and 3500 characters.');
        this.busyUsers.add(userId);
        try {
            const active = await interaction.channel.threads.fetchActive();
            if ([...active.threads.values()].some(thread => !thread.archived && !thread.locked
                && (this.store.get(thread.id)?.openerId === userId || thread.name.includes(`(${userId})`)))) {
                throw new Error('You already have an open ticket. Please wait for support.');
            }
            const thread = await interaction.channel.threads.create({
                name: `${type}: ${interaction.user.username} (${userId})`.slice(0, 100),
                type: ChannelType.PrivateThread, autoArchiveDuration: 10080, invitable: false, reason: 'Private support ticket',
            });
            this.store.upsert({ ...threadData(thread), type, openerId: userId, openerName: interaction.user.username, description, setupComplete: false });
            try {
                await thread.members.add(userId);
                await thread.setRateLimitPerUser(5);
                const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
                const info = await thread.send({
                    embeds: [new EmbedBuilder().setTitle('Ticket Information').setDescription(`**Type:** ${type}\n**Description:** ${description}`).setColor('#0099FF')],
                    components: [new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('ticket_panel_close_thread').setLabel('Close').setStyle(ButtonStyle.Danger),
                        new ButtonBuilder().setCustomId('ticket_panel_lock_thread').setLabel('Close & lock').setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setCustomId('ticket_panel_escalate_thread').setLabel('Escalate to owner').setStyle(ButtonStyle.Secondary),
                    )], allowedMentions: { parse: [] },
                });
                const markets = ['SpigotMC', 'BuiltByBit', 'Polymart'];
                const roles = interaction.member.roles.cache;
                const marketRoles = roles.filter(role => markets.includes(role.name)).map(role => `<@&${role.id}>`).join('\n') || 'None';
                const productRoles = roles.filter(role => role.name.startsWith('Customer:')).map(role => `<@&${role.id}>`).join('\n') || 'None';
                const verification = interaction.guild.channels.cache.get(this.settings.verificationChannelId)?.threads?.cache.find(candidate => candidate.name.includes(userId));
                await thread.send({ embeds: [new EmbedBuilder().setTitle('User Roles').setDescription(`**Connected Markets**\n${marketRoles}\n\n**Product Roles**\n${productRoles}\n\n**Verification Thread**\n${verification?.url || 'Not found'}`.slice(0, 4096))], allowedMentions: { parse: [] } });
                this.store.upsert({ threadId: thread.id, ticketInfoMessageId: info.id, verificationThreadId: verification?.id || null, setupComplete: true });
                await thread.send({ content: `Hello <@${userId}>, please wait for support. Read <id:guide> and search Discord and GitHub while you wait.\nPrivacy: ${this.settings.publicBaseUrl ? `${this.settings.publicBaseUrl}/privacy` : 'use /privacy'}`, allowedMentions: { users: [userId] } });
            } catch (error) {
                this.logger.error('Ticket created with incomplete setup; retry from Discord or reconcile.', { code: error.code });
                // Keep the durable record and return its link even when an optional setup call failed.
            }
            return thread;
        } finally {
            this.busyUsers.delete(userId);
        }
    }

    async join(threadId, member) {
        if (!await this.staff(member)) throw new Error('Only authorized support staff can join tickets.');
        const thread = await this.thread(threadId);
        if (thread.archived || thread.locked) throw new Error('Reopen the ticket before joining.');
        await thread.members.add(member.id);
        const ticket = this.store.get(threadId) || this.recordThread(thread);
        if (ticket) this.store.upsert({ threadId, joinedUserIds: [...new Set([...ticket.joinedUserIds, member.id])] });
        return thread;
    }

    async handleMessage(message, staffAttribution) {
        const ticket = this.store.get(message.channelId);
        if (!ticket || ticket.status === 'deleted' || message.guildId !== this.settings.guildId || this.store.suppressed(message.channelId)) return;
        const saved = staffAttribution || this.store.message(ticket.threadId, message.id);
        const staffReply = saved?.staffAuthorId && saved.webhookId === message.webhookId ? saved : null;
        const authorId = staffReply?.staffAuthorId || message.author?.id || null;
        if (this.store.excluded(authorId)) {
            this.store.clearMessages(ticket.threadId);
            this.store.upsert({ threadId: ticket.threadId, contentExcluded: true, description: null });
            return;
        }
        const authorName = ticket.contentExcluded && message.webhookId ? null : staffReply?.authorName || message.member?.displayName || message.author?.globalName || message.author?.username || null;
        const nowTicket = this.store.get(ticket.threadId);
        const update = { threadId: ticket.threadId };
        if (!nowTicket.lastMessageId || BigInt(message.id) >= BigInt(nowTicket.lastMessageId)) Object.assign(update, { lastMessageId: message.id, lastMessageAuthorId: authorId, lastMessageAuthorName: authorName, lastMessageAt: message.createdTimestamp });
        if (message.author && (!message.author.bot || staffReply) && !message.system && (!nowTicket.lastHumanMessageId || BigInt(message.id) >= BigInt(nowTicket.lastHumanMessageId))) Object.assign(update, { lastHumanMessageId: message.id, lastHumanMessageAuthorId: authorId, lastHumanMessageAt: message.createdTimestamp });
        if (Object.keys(update).length > 1) this.store.upsert(update);
        if (this.settings.messageContentApproved && !message.partial && !message.system) {
            this.store.saveMessage(ticket.threadId, {
                id: message.id, authorId, authorName,
                authorAvatarUrl: staffReply?.authorAvatarUrl || message.member?.displayAvatarURL?.({ size: 128 }) || message.author?.displayAvatarURL?.({ size: 128 }) || null,
                bot: Boolean(message.author?.bot), webhookId: message.webhookId || null,
                ...(staffReply ? { staffAuthorId: staffReply.staffAuthorId } : {}),
                content: message.content || '', createdAt: message.createdTimestamp, editedAt: message.editedTimestamp,
                embeds: message.embeds.map(embed => ({ title: embed.title, description: embed.description, fields: embed.fields })),
                attachments: [...message.attachments.values()].map(attachment => ({ id: attachment.id, name: attachment.name, url: attachment.url })),
            });
        }
    }

    async deletedMessage(threadId, messageId) {
        const ticket = this.store.get(threadId);
        if (!ticket || ticket.status === 'deleted') return;
        this.store.deleteMessage(threadId, messageId);
        if (ticket.lastMessageId === messageId || ticket.lastHumanMessageId === messageId) {
            this.store.upsert({ threadId, ...(ticket.lastMessageId === messageId ? { lastMessageId: null, lastMessageAuthorId: null, lastMessageAuthorName: null, lastMessageAt: null } : {}),
                ...(ticket.lastHumanMessageId === messageId ? { lastHumanMessageId: null, lastHumanMessageAuthorId: null, lastHumanMessageAt: null } : {}) });
            const thread = await this.thread(threadId);
            for (const message of (await thread.messages.fetch({ limit: 20 })).values()) await this.handleMessage(message);
        }
    }

    async backfill(thread) {
        if (!this.settings.messageContentApproved) return;
        let before;
        while (!this.stopping) {
            const ticket = this.store.get(thread.id);
            if (!ticket || ticket.contentExcluded || (ticket.expiresAt && ticket.expiresAt <= Date.now())) break;
            const messages = await thread.messages.fetch({ limit: 100, ...(before ? { before } : {}) });
            if (this.stopping) return;
            if (!messages.size) break;
            for (const message of messages.values()) await this.handleMessage(message);
            before = messages.last().id;
            if (messages.size < 100) break;
        }
    }

    async reconcile() {
        if (this.reconciling || this.stopping) return;
        this.reconciling = true;
        const failureDetails = [];
        const addFailure = (stage, ids, error) => {
            if (failureDetails.length >= 20) return;
            const detail = { stage, ...ids };
            if (Number.isFinite(error?.code)) detail.code = error.code;
            if (Number.isFinite(error?.status)) detail.status = error.status;
            if (!('code' in detail) && !('status' in detail)) detail.reason = 'reconciliation-incomplete';
            failureDetails.push(detail);
        };
        try {
            const parents = new Map();
            for (const parentId of this.settings.ticketParentIds || [this.settings.ticketParentId]) {
            if (this.stopping) return;
            let parent;
            try {
                parent = await this.client.channels.fetch(parentId, { force: true });
                if (this.stopping) return;
                if (!parent || parent.guildId !== this.settings.guildId) throw new Error('Ticket parent not available.');
            } catch (error) { addFailure('parent-scan', { parentId }, error); throw error; }
            parents.set(parentId, parent);
            let active;
            try { active = await parent.threads.fetchActive(); }
            catch (error) { addFailure('active-inventory', { parentId }, error); throw error; }
            if (this.stopping) return;
            for (const thread of active.threads.values()) this.recordThread(thread);
            let before;
            let hasMore = true;
            while (hasMore && !this.stopping) {
                const query = new URLSearchParams({ limit: '100', ...(before ? { before } : {}) });
                let page;
                try { page = await this.client.rest.get(`/channels/${parent.id}/threads/archived/private`, { query }); }
                catch (error) { addFailure('archive-inventory', { parentId }, error); throw error; }
                if (this.stopping) return;
                for (const thread of page.threads) this.recordThread({ ...thread, guild_id: this.settings.guildId });
                hasMore = page.has_more && page.threads.length > 0;
                const next = page.threads.at(-1)?.thread_metadata.archive_timestamp;
                if (hasMore && (!next || next === before)) throw new Error('Archive pagination did not advance.');
                before = next;
            }
            }
            let failures = 0;
            for (const ticket of this.store.all()) {
                if (this.stopping) return;
                if (ticket.status === 'deleted') continue;
                const canConfirmDeletion = parents.get(ticket.parentId)?.permissionsFor(this.client.user)?.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageThreads]);
                try {
                    const thread = await this.thread(ticket.threadId);
                    if (this.stopping) return;
                    this.recordThread(thread);
                    const latest = await thread.messages.fetch({ limit: 1 });
                    if (this.stopping) return;
                    if (latest.first()) await this.handleMessage(latest.first());
                } catch (error) {
                    if (this.stopping) return;
                    if (canConfirmDeletion && unknownChannel(error)) {
                        this.store.clearMessages(ticket.threadId);
                        this.store.upsert({ threadId: ticket.threadId, deletedAt: Date.now(), description: null });
                    } else { failures++; addFailure('ticket-reconcile', { threadId: ticket.threadId, parentId: ticket.parentId }, error); }
                }
            }
            this.store.expire();
            if (failures || this.legacyIncomplete) throw new Error('Some ticket sources could not be reconciled.');
            this.setSync({ ready: true, updatedAt: Date.now(), error: null });
        } catch (error) {
            if (this.stopping) return;
            if (!failureDetails.length) addFailure('reconcile', {}, error);
            this.logger.error('Ticket reconciliation failed.', { legacyIncomplete: this.legacyIncomplete, failures: failureDetails });
            this.setSync({ ready: false, error: 'Discord synchronization is incomplete. The dashboard shows the latest available data.' });
        } finally {
            this.reconciling = false;
        }
    }

    scheduleSummary() {
        if (!this.settings.publicBaseUrl || this.stopping) return;
        this.summaryPending = true;
        if (!this.summaryTimer && !this.summaryRunning) this.summaryTimer = setTimeout(() => {
            this.summaryTimer = null;
            this.summaryTask = this.updateSummary().catch(error => { if (!this.stopping) this.logger.error('Summary update failed.', { code: error.code }); });
        }, 1000);
    }

    async updateSummary() {
        if (this.summaryRunning || this.stopping) return;
        this.summaryRunning = true;
        this.summaryPending = false;
        try {
            const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
            const channel = await this.client.channels.fetch(this.settings.summaryChannelId);
            if (!channel || channel.guildId !== this.settings.guildId || !channel.isTextBased()) throw new Error('Invalid summary channel.');
            const content = `Open tickets: **${this.store.counts().open}**${this.sync.ready ? '' : '\nCount may be outdated: synchronization is in progress or interrupted.'}`;
            const payload = { content, allowedMentions: { parse: [] }, components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Open ticket dashboard').setURL(this.settings.publicBaseUrl))] };
            let message;
            const messageId = this.store.read('meta:summary-id');
            if (messageId) {
                try { message = await channel.messages.fetch(messageId); }
                catch (error) { if (Number(error.code) !== 10008) throw error; }
            }
            if (!message) {
                let before;
                // Recover an acknowledged send whose message ID was not persisted before a crash.
                while (!message) {
                    const page = await channel.messages.fetch({ limit: 100, ...(before ? { before } : {}) });
                    message = page.find(candidate => candidate.author.id === this.client.user.id && ['Open tickets: **', 'Ticket aperti: **'].some(prefix => candidate.content.startsWith(prefix)) && candidate.components[0]?.components[0]?.url === this.settings.publicBaseUrl);
                    if (message || page.size < 100) break;
                    before = page.last().id;
                }
                message ||= await channel.send(payload);
                this.store.write('meta:summary-id', message.id);
            }
            if (message.content !== content || message.components[0]?.components[0]?.url !== this.settings.publicBaseUrl) await message.edit(payload);
        } finally {
            this.summaryRunning = false;
            if (this.summaryPending) this.scheduleSummary();
        }
    }

    stop() {
        this.stopping = true;
        clearTimeout(this.summaryTimer);
    }
}

module.exports = { TicketService, threadData, unknownChannel };
