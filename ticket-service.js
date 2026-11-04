const { EventEmitter } = require('node:events');
const { ChannelType, PermissionFlagsBits } = require('discord.js');
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
            canReadConversation: enabled, canArchiveConversation: enabled,
            canReply: false, canManageTicket: false,
            reason: enabled ? 'Risposta e gestione web non ancora abilitate. Usa Discord.' : 'Conversazione, risposta e gestione web in attesa dell’autorizzazione Discord.',
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
        if (!member || member.guild?.id !== this.settings.guildId) return false;
        const fresh = await member.guild.members.fetch({ user: member.id, force: true });
        return fresh.id === this.settings.ownerId || fresh.roles.cache.has(this.settings.supportRoleId);
    }

    async thread(threadId) {
        if (!ID.test(threadId || '')) throw new Error('Invalid ticket ID.');
        const thread = await this.client.channels.fetch(threadId, { force: true });
        if (!this.scoped(thread)) throw new Error('This is not a configured private support ticket.');
        return thread;
    }

    async action(threadId, action, member, reason = '') {
        const thread = await this.thread(threadId);
        const staff = await this.staff(member);
        const ticket = this.store.get(threadId) || this.recordThread(thread);
        if (!staff && !(action === 'close' && ticket?.openerId === member.id)) throw new Error('You are not authorized to perform this action.');
        if (!['close', 'lock', 'reopen', 'rename'].includes(action)) throw new Error('Invalid ticket action.');
        let updated;
        if (action === 'rename') {
            if (!reason.trim() || reason.length > 100) throw new Error('The name must contain between 1 and 100 characters.');
            updated = await thread.setName(reason.trim());
        } else if (action === 'reopen') {
            updated = await thread.edit({ locked: false, archived: false }, 'Reopened by support');
        } else {
            updated = await thread.edit({ archived: true, ...(action === 'lock' ? { locked: true } : {}) }, reason || 'No reason.');
        }
        this.recordThread(updated);
        this.store.upsert({ threadId, lastAction: { action, actorId: member.id, reason: reason || null, at: Date.now() } });
        return thread;
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
                        new ButtonBuilder().setCustomId('ticket_panel_lock_thread').setLabel('Lock').setStyle(ButtonStyle.Secondary),
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

    async handleMessage(message) {
        const ticket = this.store.get(message.channelId);
        if (!ticket || ticket.status === 'deleted' || message.guildId !== this.settings.guildId || this.store.suppressed(message.channelId)) return;
        if (this.store.excluded(message.author?.id)) {
            this.store.clearMessages(ticket.threadId);
            this.store.upsert({ threadId: ticket.threadId, contentExcluded: true, description: null });
            return;
        }
        const nowTicket = this.store.get(ticket.threadId);
        const update = { threadId: ticket.threadId };
        if (!nowTicket.lastMessageId || BigInt(message.id) >= BigInt(nowTicket.lastMessageId)) Object.assign(update, { lastMessageId: message.id, lastMessageAuthorId: message.author?.id || null, lastMessageAuthorName: message.author?.username || null, lastMessageAt: message.createdTimestamp });
        if (message.author && !message.author.bot && !message.system && (!nowTicket.lastHumanMessageId || BigInt(message.id) >= BigInt(nowTicket.lastHumanMessageId))) Object.assign(update, { lastHumanMessageId: message.id, lastHumanMessageAuthorId: message.author.id, lastHumanMessageAt: message.createdTimestamp });
        if (Object.keys(update).length > 1) this.store.upsert(update);
        if (this.settings.messageContentApproved && !message.partial && !message.system) {
            this.store.saveMessage(ticket.threadId, {
                id: message.id, authorId: message.author?.id || null, authorName: message.author?.username || null,
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
            let parent;
            try {
                parent = await this.client.channels.fetch(parentId, { force: true });
                if (!parent || parent.guildId !== this.settings.guildId) throw new Error('Ticket parent not available.');
            } catch (error) { addFailure('parent-scan', { parentId }, error); throw error; }
            parents.set(parentId, parent);
            let active;
            try { active = await parent.threads.fetchActive(); }
            catch (error) { addFailure('active-inventory', { parentId }, error); throw error; }
            for (const thread of active.threads.values()) this.recordThread(thread);
            let before;
            let hasMore = true;
            while (hasMore && !this.stopping) {
                const query = new URLSearchParams({ limit: '100', ...(before ? { before } : {}) });
                let page;
                try { page = await this.client.rest.get(`/channels/${parent.id}/threads/archived/private`, { query }); }
                catch (error) { addFailure('archive-inventory', { parentId }, error); throw error; }
                for (const thread of page.threads) this.recordThread({ ...thread, guild_id: this.settings.guildId });
                hasMore = page.has_more && page.threads.length > 0;
                const next = page.threads.at(-1)?.thread_metadata.archive_timestamp;
                if (hasMore && (!next || next === before)) throw new Error('Archive pagination did not advance.');
                before = next;
            }
            }
            let failures = 0;
            for (const ticket of this.store.all()) {
                if (ticket.status === 'deleted') continue;
                const canConfirmDeletion = parents.get(ticket.parentId)?.permissionsFor(this.client.user)?.has([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageThreads]);
                try {
                    const thread = await this.thread(ticket.threadId);
                    this.recordThread(thread);
                    const latest = await thread.messages.fetch({ limit: 1 });
                    if (latest.first()) await this.handleMessage(latest.first());
                } catch (error) {
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
            if (!failureDetails.length) addFailure('reconcile', {}, error);
            this.logger.error('Ticket reconciliation failed.', { legacyIncomplete: this.legacyIncomplete, failures: failureDetails });
            this.setSync({ ready: false, error: 'Sincronizzazione Discord incompleta. I dati mostrati sono gli ultimi disponibili.' });
        } finally {
            this.reconciling = false;
        }
    }

    scheduleSummary() {
        if (!this.settings.publicBaseUrl || this.stopping) return;
        this.summaryPending = true;
        if (!this.summaryTimer && !this.summaryRunning) this.summaryTimer = setTimeout(() => {
            this.summaryTimer = null;
            this.updateSummary().catch(error => this.logger.error('Summary update failed.', { code: error.code }));
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
            const content = `Ticket aperti: **${this.store.counts().open}**${this.sync.ready ? '' : '\nConteggio non aggiornato: sincronizzazione in corso o interrotta.'}`;
            const payload = { content, allowedMentions: { parse: [] }, components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Apri pannello ticket').setURL(this.settings.publicBaseUrl))] };
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
                    message = page.find(candidate => candidate.author.id === this.client.user.id && candidate.content.startsWith('Ticket aperti: **') && candidate.components[0]?.components[0]?.url === this.settings.publicBaseUrl);
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
