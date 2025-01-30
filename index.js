require('dotenv').config()
require('./server.js');
const discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ThreadAutoArchiveDuration, ChannelType, TextInputStyle, ModalBuilder, TextInputBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { settings, config } = require('./global.js');
const Enmap = require("enmap");

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  console.log(`Received console input: ${text}`);

  // Check if command equals to set-open-notify-message-id <threadId> <messageId>
  if(text.startsWith('set-open-notify-message-id')) {
    const args = text.split(' ');
    if(args.length === 3) {
        const threadId = args[1];
        const messageId = args[2];
        // Check if threadId and messageId are valid Discord IDs
        if(threadId.match(/^\d+$/) && messageId.match(/^\d+$/)) {
            const data = client.botData.get(`ticket_${threadId}`);
            if(data) {
                data.openedMessageId = messageId;
                client.botData.set(`ticket_${threadId}`, data);
                client.logger.info(`Console - Updated the opened message id for the thread ${threadId} to ${messageId}.`);
            } else {
                client.logger.info(`Console - The thread ${threadId} does not exist.`);
            }
        }
    }
  }
});

const client = new discord.Client({
    closeTimeout: 3_000 ,
    waitGuildTimeout: 15_000,
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildBans,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent
    ],
    allowedMentions: {
        parse: ["users"],
        repliedUser: true
    },
    makeCache: discord.Options.cacheWithLimits({
		...discord.Options.DefaultMakeCacheSettings,
		ReactionManager: 0,
        GuildMemberManager: {
			maxSize: 20000,
			keepOverLimit: member => member.id === client.user.id,
		}
	}),
});

client.botData = new Enmap({
	name: "botData",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: "deep"
});

function editData(thread, editFunction) {
    const data = client.botData.get(`ticket_${thread.id}`);
    if(data) {
        editFunction(data);
        client.botData.set(`ticket_${thread.id}`, data);
    }
}

function getData(thread, readFunction = (data) => data) {
    const data = client.botData.get(`ticket_${thread.id}`);
    if(data) {
        return readFunction(data);
    }
    return undefined;
}

let notificationChannel;
let ticketsOpenedNotifyChannel;

client.on('disconnect', () => {
    console.log(`Disconnecting as ${client.user.tag}!`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // There is no need to iterate with that much frequency. It's just for threads that for some reason didn't generate the `threadUpdate` or `threadDelete` events.
    setInterval(forceUpdateTicketsNotificationChannel, 20 * 60 * 1000);

    client.guilds.cache.forEach(async guild => {
        await guild.commands.create(new SlashCommandBuilder()
        .setName('rename')
        .setDescription('Rename a thread, channel or forum post')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator));
        console.log('Registered /rename command successfully!');

    await guild.commands.create(new SlashCommandBuilder()
        .setName('lockinvalid')
        .setDescription('Lock the thread.')
        .addStringOption(option => option.setName('reason').setRequired(false).setDescription('Reason for locking the thread.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator));
        console.log('Registered /invalid command successfully!');
    });

    const guild = client.guilds.cache.get(config.guild);

    // Update the messages with id `notificationMessageId` and id `openedMessageId` by adding info about who is the last user who sent a message.
    notificationChannel = guild.channels.cache.get(config.channels.ticketsNotifications);
    if(!notificationChannel) {
        client.logger.error(`onReady - Failed to read the tickets notification channel. The channel ${config.channels.ticketsNotifications} does not exist.`);
        process.exit(1);
    }

    ticketsOpenedNotifyChannel = guild.channels.cache.get(config.channels.ticketsOpened);
    if(!ticketsOpenedNotifyChannel) {
        client.logger.error(`onReady - Failed to read the tickets opened notification channel. The channel ${config.channels.ticketsOpened} does not exist.`);
        process.exit(1);
    }

    // Iterate all messages in the tickets notification channel and update the last message sent by the user, each 60 seconds.
    setInterval(updateLastMessageSent, 60 * 1000);
    updateLastMessageSent();
});

// Logging and error handling
client.logger = require('./utils/logger');
client.on('error', error => client.logger.error("Error", error));
client.on('warn', info => client.logger.warn(info, info));
process.on('unhandledRejection', error => client.logger.error("UNHANDLED_REJECTION\n" + error, error));
process.on('uncaughtException', error => {
    client.logger.error("Uncaught Exception is detected, restarting...", error);
    process.exit(1);
});

// Discord bot login
client.login(settings.DISCORD_TOKEN);

// Iterate all messages in the tickets notification channel and update the last message sent by the user, each 30 seconds.
function updateLastMessageSent() {

    // Get all tickets from client.botData
    const tickets = client.botData.indexes.filter(index => index.startsWith('ticket_'));
    tickets.forEach(async ticket => {
        const data = client.botData.get(ticket);
        const threadId = ticket.split('_')[1];
        const thread = client.channels.cache.get(threadId);
        // Might be a legacy ticket, ignore
        if (!thread) {
            return;
        }

        // Check if the thread is opened.
        if (thread.locked || thread.archived) {
            return;
        }

        client.logger.info(`updateLastMessageSent - Updating ticket ${thread.id} - ${thread.name}.`);

        const notificationMessage = await notificationChannel.messages.fetch(data.notificationMessageId, { cache: false, force: true });
        const embeds = notificationMessage.embeds;
        // Check if the embed has fields, check if the field text contains "Last Message By" and update it.
        if(embeds[0].fields) {

            client.logger.info(`updateLastMessageSent - Checking embeds ${thread.id} - ${thread.name}.`);

            // Find the last message in the thread.
            const messages = await thread.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();
            if(!lastMessage) {
                console.logger.error(`updateLastMessageSent - No last message found in the thread ${thread.id} - ${thread.name}.`);
                return;
            }

            const lastMessageByField = embeds[0].fields.find(field => field.name === 'Last Message By');
            if(lastMessageByField) {
                lastMessageByField.value = `<@${lastMessage.author.id}>`;
                lastMessageByField.inline = true;
            } else {
                embeds[0].fields.push({
                    name: 'Last Message By',
                    value: `<@${lastMessage.author.id}>`,
                    inline: true
                });
            }

            // Find also "Last Message When" and update it.
            const lastMessageWhenField = embeds[0].fields.find(field => field.name === 'Last Message When');
            if(lastMessageWhenField) {
                lastMessageWhenField.value = '<t:' + Math.floor(lastMessage.createdTimestamp / 1000) + ':R>';
                lastMessageWhenField.inline = true;
            } else {
                embeds[0].fields.push({
                    name: 'Last Message When',
                    value: '<t:' + Math.floor(lastMessage.createdTimestamp / 1000) + ':R>',
                    inline: true
                });
            }

            // Find also "Last Message Content" and update it.
            const lastMessageContentField = embeds[0].fields.find(field => field.name === 'Last Message Content');
            const partialContent = lastMessage.content.length > 128 ? lastMessage.content.substring(0, 128) + '...' : lastMessage.content;
            if(lastMessageContentField) {
                lastMessageContentField.value = partialContent;
            } else {
                embeds[0].fields.push({
                    name: 'Last Message Content',
                    value: partialContent
                });
            }

            // Update the thread notification message to include the new user in the list of users who already joined the thread.
            // Add a new embed to list the current users if not available or edit it by attaching that new embed to the ones.
            // NOTE: also add interaction.user.id to the list of users.
            // Force thread members to be fetched to avoid caching issues.
            await thread.members.fetch();
            const mentions = thread.members.cache
                .filter(member => !member.user.bot && member.id !== data.userId)
                .map(member => `<@${member.id}>`);
            const description = mentions.join(', ');
            if(description.length === 0) {
                description = 'None.';
            }
            if(embeds.length === 1) {
                embeds.push(new EmbedBuilder()
                    .setTitle('Users In Ticket')
                    .setDescription(description)
                );
            } else {
                embeds[1] = new EmbedBuilder()
                    .setTitle('Users In Ticket')
                    .setDescription(description);
            }

            client.logger.info(`updateLastMessageSent - Updated ticket ${thread.id} - ${thread.name}, last message by <@${lastMessage.author.id}>, at ${new Date(lastMessage.createdTimestamp).toISOString()}, content: ${partialContent}.`);

            // Apply the changes to the notification message
            await notificationMessage.edit({
                embeds: embeds
            });

            // Update the ticketsOpened notification message as well.
            try
            {
                const ticketsOpenedNotifyMessage = await ticketsOpenedNotifyChannel.messages.fetch(data.openedMessageId, { cache: false, force: true });
                await ticketsOpenedNotifyMessage.edit({
                    embeds: embeds
                });
            } 
            catch(error) {
                client.logger.error(`updateLastMessageSent - Failed to update the tickets opened notification channel ${thread.id} - ${thread.name}. The message ${data.openedMessageId} does not exist.`);
            }
        }
    });
}

client.on('messageCreate', async message => {
    if (message.author.bot)
        return

    if (message.channel.type === "dm")
        return

    if (message.author.id === '289137568144949248') {
        if(message.content === "aaacreateThreadPanel") {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket_panel_create_thread_generic')
                    .setLabel('Generic')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('📩'),
                new ButtonBuilder()
                    .setCustomId('ticket_panel_create_thread_payment')
                    .setLabel('Payment Issue')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('💰')
            );

            const embed = new EmbedBuilder()
                .setTitle('Private Support Ticket')
                .setDescription(`## Invalid tickets will be deleted without any warning
To ask for support about plugins please use the public support channels after verifying in https://discord.com/channels/533407895010803753/989167088742572072
## Private tickets are only for rare occasions!
Please make sure to read the various tutorials and search on the Discord server or Github before creating a ticket.
Do not abuse the ticket system.

### Click on the threads icon <:threads:1298014776965857372> on top of this page to see your tickets.`)
                .setColor('#a0401a');

            // Send the message with the buttons and embed
            return await message.channel.send({
                content: '',
                components: [row],
                embeds: [embed]
            });
        }
    }
});

async function hasReachedMaxNumberOfThreads(interaction) {
    // Iterate through threads and check if the user already has max 1 opened thread in the recent 48 hours.
    let threadCount = 0;
    await interaction.channel.threads.cache.forEach(thread => {
        if (thread.archived === false && thread.name.includes(interaction.user.id) && thread.createdTimestamp + 172800000 >= Date.now())
            threadCount++;
    });

    if (threadCount >= 1) {
        client.logger.info(`User @${interaction.user.tag} (${interaction.user.id}) tried to create a new ticket but has reached the maximum amount of open threads.`);
        return true;
    }

    return false;
}

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'rename') {
            // Check if it matches regex "Invalid: Username (289137568144949248) wow! nice thread"
            const match = interaction.channel.name.match(/^(.*): (.+) \((\d+)\)(| .*)$/);
            if (match) {
                const modal = new ModalBuilder()
                .setCustomId(`ticketbot_modal_command_rename`)
                .setTitle('Rename');
                modal.addComponents(new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('prefix')
                    .setLabel("Prefix")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false)
                    .setPlaceholder("Generic")
                    .setValue(match[1])
                ),new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('suffix')
                    .setLabel("Suffix")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false)
                    .setValue(match?.[4] || "")
                ));
                return await interaction.showModal(modal);
            }

            const modal = new ModalBuilder()
                .setCustomId(`ticketbot_modal_command_rename`)
                .setTitle('Rename');
            modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder()
                .setCustomId('full_name')
                .setLabel("Full name")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
                .setValue(interaction.channel.name)
            ));
            return await interaction.showModal(modal);
        } else if (interaction.commandName === 'lockinvalid') {
            const thread = interaction.channel;
            if (!thread) {
                return await interaction.reply({
                    content: 'The command can only be used in a thread.',
                    ephemeral: true
                });
            }

            await interaction.deferReply();

            // Check if it matches regex "Payment: username (0000000000000)"
            if (thread.name.match(/^(.*): (.+) \((\d+)\)(| .*)$/)) {
                // Replace the first matching group with "Invalid".
                const newName = thread.name.replace(/^.*?: (.+ \(\d+\))$/, 'Invalid: $1');
                await thread.setName(newName);
            }

            const reason = interaction.options.getString('reason');
            if(reason) {
                const data = client.botData.get(`ticket_${thread.id}`);
                if(data) { // else legacy ticket.
                    data.closedLockedReason = reason;
                    client.botData.set(`ticket_${thread.id}`, data);
                }
            }
            if(!thread.locked) {
                await thread.setLocked(true, reason ? reason : 'No reason.');
            }

            return await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Invalid Thread Locked')
                    .setDescription(`This thread has been locked by <@${interaction.user.id}>.\nReason: ${reason || 'No reason.'}`)
                ]
            });
        }
    }

    if (interaction.isModalSubmit()) {
        if(interaction.customId === 'ticketbot_modal_command_rename') {
            if(interaction.fields.fields.has('full_name')) {
                const fullName = interaction.fields.getTextInputValue('full_name');
                if(fullName === '' || fullName === " ") {
                    return await interaction.reply({
                        content: 'The name cannot be empty.',
                        ephemeral: true
                    });
                }

                if(fullName.length > 100) {
                    return await interaction.reply({
                        content: 'The new name is too long.',
                        ephemeral: true
                    });
                }

                await interaction.channel.setName(fullName);
                return await interaction.reply({
                    content: 'The thread has been renamed.',
                    ephemeral: true
                });
            } else {
                const prefix = interaction.fields.getTextInputValue('prefix');
                const suffix = interaction.fields.getTextInputValue('suffix');

                if(prefix === '' || prefix === " ") {
                    return await interaction.reply({
                        content: 'The prefix cannot be empty.',
                        ephemeral: true
                    });
                }

                const match = interaction.channel.name.match(/^(.*): (.+) \((\d+)\)(| .*)$/);
                if(match) {
                    const newName = `${prefix}: ${match[2]} (${match[3]})${suffix ? ' ' + suffix : ''}`;
                    if(newName.length > 100) {
                        return await interaction.reply({
                            content: 'The name is too long.',
                            ephemeral: true
                        });
                    }
                    await interaction.channel.setName(newName);
                    return await interaction.reply({
                        content: 'The thread has been renamed.',
                        ephemeral: true
                    });
                } else {
                    return await interaction.reply({
                        content: 'The thread name does not match the expected format.',
                        ephemeral: true
                    });
                }
            }
        }
        else if(interaction.customId === 'modal_ticket_panel_close_thread' || interaction.customId === 'modal_ticket_panel_lock_thread') {
            const thread = interaction.channel;
            const reason = interaction.fields.getTextInputValue('reason');
            const data = client.botData.get(`ticket_${thread.id}`);
            if(reason) {
                if(data) { // else legacy ticket.
                    data.closedLockedReason = reason;
                    client.botData.set(`ticket_${thread.id}`, data);
                }
            }

            // Send a message to the user in the thread
            await interaction.channel.send({
                embeds: [new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Ticket Closed')
                    .setDescription(`This ticket has been closed by <@${interaction.member.id}>.\nReason: ${reason}`)
                ],
                components: [ new ActionRowBuilder().addComponents(new ButtonBuilder()
                    .setLabel('Re-open')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('ticket_panel_reopen_thread'))
                ]
            });

            if(interaction.customId === 'modal_ticket_panel_lock_thread') {
                await interaction.channel.setLocked(true, reason ? reason : 'No reason.');
                client.logger.info(`Ticket locked by @${interaction.member.user.tag} (${interaction.member.id}) in #${interaction.channel.name} (${interaction.channel.id}).`);
            } else {
                client.logger.info(`Ticket closed by @${interaction.member.user.tag} (${interaction.member.id}) in #${interaction.channel.name} (${interaction.channel.id}).`);
                await interaction.channel.setArchived(true, reason ? reason : 'No reason.');
            }

            client.botData.set(`ticket_${thread.id}`, data);
            return await interaction.deferUpdate();
        }

        if(interaction.customId.startsWith('modal_ticket_panel_create_thread_')) {

            await interaction.deferUpdate();

            if(await hasReachedMaxNumberOfThreads(interaction)) {
                return await interaction.reply({
                    content: 'You have reached the maximum amount of open threads. Please wait for a staff member to assist you.',
                    ephemeral: true
                });
            }

            const type = interaction.customId === 'modal_ticket_panel_create_thread_generic' ? 'Generic' : 'Payment';
            const description = interaction.fields.getTextInputValue('description');
            
            const thread = await interaction.channel.threads.create({
                name: `${type}: ${interaction.user.username} (${interaction.user.id})`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
                reason: 'Private Ticket',
                type: ChannelType.PrivateThread
            });

            client.logger.info(`Ticket created by @${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} (${interaction.channel.id}).`);
    
            // Set messages timeout for this thread
            await thread.setRateLimitPerUser(5, `Ticket: ${interaction.user.username} (${interaction.user.id})`);

            // Add the user to the thread
            await thread.members.add(interaction.user.id);

            const msgContents = {
                embeds: [new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('New Ticket: `' + thread.id + "`")
                    .setDescription(`Ticket created by <@${interaction.user.id}>.`)
                    .addFields(
                        { name: 'Type', value: type, inline: true },
                        { name: 'Description', value: description, inline: true },
                        { name: 'Creation Time', value: '<t:' + Math.floor(Date.now() / 1000) + ':R>', inline: true }
                    )
                ],
                components: [ new ActionRowBuilder().addComponents(new ButtonBuilder()
                    .setLabel('Go to Ticket')
                    .setStyle(ButtonStyle.Link)
                    .setURL(thread.url),
                    new ButtonBuilder()
                    .setCustomId('ticket_panel_join_thread_' + thread.id)
                    .setLabel('Join Ticket')
                    .setStyle(ButtonStyle.Primary)
                )],
            };

            const sentMessage0 = await notificationChannel.send(msgContents);
            const sentMessage1 = await ticketsOpenedNotifyChannel.send(msgContents);
    
            // Send a message to the user in the thread, the first message.
            const ticketInfoMessageSent = await thread.send({
                embeds: [
                new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Ticket Information')
                    .setDescription(`**Type:** ${type}\n**Description:** ${description}`)
                ]
            });

            // Send a dummy message and save it to const.
            const rolesInfoMessage = await thread.send('_ _');
            // Cite all roles in the message by editing it, to avoid pinging everyone.
            // This is useful to get info about which products the customer has purchased and which market has verified.
            // NOTE: Print only roles which name starts with "Customer: or equals to SpigotMC, BuiltByBit, Polymart.
            // Organizza i ruoli in categorie
            const connectedMarketsRoles = interaction.guild.roles.cache
                .filter(role => 
                    interaction.member.roles.cache.has(role.id) && 
                    (role.name === 'SpigotMC' || 
                    role.name === 'BuiltByBit' || 
                    role.name === 'Polymart')
                )
                .map(role => `<@&${role.id}>`)
                .join('\n') || 'No connected market roles';
            const productRoles = interaction.guild.roles.cache
                .filter(role => 
                    interaction.member.roles.cache.has(role.id) && 
                    role.name.startsWith('Customer:')
                )
                .map(role => `<@&${role.id}>`)
                .join('\n') || 'No product roles';


            // Search in verification channel for the verification thread. The thread name contains the user id in its name.
            const verificationChannelId = '989167088742572072';
            const verificationChannel = interaction.guild.channels.cache.get(verificationChannelId);
            let verificationThread;
            if(!verificationChannel) {
                console.error(`The verification channel "${verificationChannelId}" does not exist.`);
            } else {
                verificationThread = verificationChannel.threads.cache.find(thread => thread.name.includes(interaction.user.id));
            }

            await rolesInfoMessage.edit({
                embeds: [new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('User Roles')
                    .setDescription(`**Connected Markets**:\n${connectedMarketsRoles}\n\n**Product Roles**:\n${productRoles}\n\n**Verification Thread**:\n${verificationThread ? verificationThread.url : 'No verification thread found.'}`)
                ],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setLabel('Close')
                            .setStyle(ButtonStyle.Danger)
                            .setCustomId('ticket_panel_close_thread'),
                        new ButtonBuilder()
                            .setLabel('Lock')
                            .setStyle(ButtonStyle.Danger)
                            .setCustomId('ticket_panel_lock_thread')
                    )
                ]
            });

            client.botData.set(`ticket_${thread.id}`, {
                userId: interaction.user.id,
                notificationMessageId: sentMessage0.id,
                openedMessageId: sentMessage1.id,
                ticketInfoMessageId: ticketInfoMessageSent.id,
                verificationThreadId: verificationThread ? verificationThread.id : null
            });

            await thread.send(`Hello <@${interaction.user.id}>, please wait for a staff member to assist you.\nIn the meantime make sure to read <id:guide>, search on the **Discord** server and search on **Github**.`);
    
            // Send an ephemeral message to the user in the interaction channel so that they can find the new thread easily. 
            return await interaction.followUp({
                embeds: [new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Ticket Created')
                    .setDescription('A new ticket has been created. Click the button below to access it.')
                ],
                components: [ new ActionRowBuilder().addComponents(new ButtonBuilder()
                    .setLabel('Go to Ticket')
                    .setStyle(ButtonStyle.Link)
                    .setURL(thread.url))
                ],
                ephemeral: true
            });
        }
        return;
    }

    if(interaction.isButton()) {

        if(interaction.customId === 'ticket_panel_close_thread') {
            const modal = new ModalBuilder()
                .setCustomId(`modal_ticket_panel_close_thread`)
                .setTitle('Close Ticket');
            modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder()
                .setCustomId('reason')
                .setLabel("Reason")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
                .setPlaceholder('Reason for closing the ticket.') 
            ));

            return await interaction.showModal(modal);
        }
        else if(interaction.customId === 'ticket_panel_lock_thread') {
            if(!interaction.member.roles.cache.some(role => role.id === config.roles.support_team)) {
                return await interaction.reply({
                    content: 'Only support team members can lock tickets.',
                    ephemeral: true
                });

            }
                const modal = new ModalBuilder()
                .setCustomId(`modal_ticket_panel_lock_thread`)
                .setTitle('Close Ticket');
            modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder()
                .setCustomId('reason')
                .setLabel("Reason")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
                .setPlaceholder('Reason for closing the ticket.') 
            ));

            return await interaction.showModal(modal);
        }

        if(interaction.customId === ('ticket_panel_reopen_thread')) {

            if(!interaction.member.roles.cache.some(role => role.id === config.roles.support_team)) {
                // Close the thread again as pressing the button automatically re-opens it.
                await interaction.channel.setArchived(true, 'An unauthorized user tried to re-open the ticket.');

                return await interaction.reply({
                    content: 'Only support team members can re-open tickets.',
                    ephemeral: true
                });
            }

            await interaction.channel.setArchived(false);

            client.logger.info(`Ticket re-opened by @${interaction.member.user.tag} (${interaction.member.id}) in #${interaction.channel.name} (${interaction.channel.id}).`);

            return await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Ticket Re-opened')
                    .setDescription(`This ticket has been re-opened by <@${interaction.member.id}>.`)
                ],
                components: [ new ActionRowBuilder().addComponents(new ButtonBuilder()
                    .setLabel('Close')
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId('ticket_panel_close_thread'))
                ]
            });
        }

        if (interaction.customId.startsWith('ticket_panel_create_thread_')) {

            if(await hasReachedMaxNumberOfThreads(interaction)) {
                return await interaction.reply({
                    content: 'You have reached the maximum amount of open threads. Please wait for a staff member to assist you.',
                    ephemeral: true
                });
            }
        
            const modal = new ModalBuilder()
                .setCustomId(`modal_${interaction.customId}`)
                .setTitle('Create a Ticket');
            modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder()
                .setCustomId('description')
                .setLabel("DESCRIPTION")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setPlaceholder('Describe your issue. DO NOT REPORT BUGS HERE! USE GITHUB!') 
                .setMinLength(48)
            ));

            return await interaction.showModal(modal);
        }

        if(interaction.customId.startsWith("ticket_panel_join_thread_")) {
            const threadId = interaction.customId.split('ticket_panel_join_thread_')[1];
            const thread = interaction.guild.channels.cache.get(threadId);
            if(!thread) {
                return await interaction.reply({
                    content: 'The ticket thread does not exist.',
                    ephemeral: true
                });
            }

            if(thread.archived || thread.locked) {
                return await interaction.reply({
                    content: 'The ticket thread is closed.',
                    ephemeral: true
                });
            }

            await thread.members.add(interaction.user.id);

            await interaction.message.edit({ embeds: embeds });

            return await interaction.reply({
                content: 'You have successfully joined the ticket thread.',
                ephemeral: true
            });
        }
    }
});

async function handleThreadUpdate(newThread, status) {
    client.logger.info(`threadUpdate - handleThreadUpdate(): ${newThread.id} - ${newThread.name}`);
    // Get the message id from the botData
    const data = getData(newThread);
    const message = await notificationChannel.messages.fetch(data.notificationMessageId, { cache: false, force: true });
    if(!message) {
        client.logger.error(`threadUpdate - Failed to update the tickets notification channel ${newThread.id}. The message ${data.notificationMessageId} does not exist.`);
        return;
    }

    let ticketOpenedMessage;
    try {
        ticketOpenedMessage = await ticketsOpenedNotifyChannel.messages.fetch(data.openedMessageId, { cache: false, force: true });
    }
    catch(error) {} // Might not exist.

    const embed = message.embeds[0];
    switch (status) {
        case 'closed':
            client.logger.info("threadUpdate - Updating ticket in ticketsNotifications channel: " + newThread.id + " to closed.");

            // Update the notification message to include the reason for closing the ticket
            for (let i = 0; i < embed.fields.length; i++) {
                if (embed.fields[i].name.includes('Closed') || embed.fields[i].name.includes('Locked')) {
                    embed.fields.splice(i, 1);
                    i--;
                }
            }
            embed.fields.push({
                name: `Closed`,
                value: `<t:${Math.floor(Date.now() / 1000)}:R>\nReason: ${data.closedLockedReason || 'No reason.'}`
            });

            await message.edit({
                embeds: [
                    EmbedBuilder.from(embed)
                        .setTitle("Ticket Closed: `" + newThread.id + "`")
                        .setColor('#a0401a')
                ]
            });

            // Delete the message from the ticketsOpened channel.
            if (ticketOpenedMessage) {
                await ticketOpenedMessage.delete();
            }
            break;
        case 'locked':
            client.logger.info("threadUpdate - Updating ticket in ticketsNotifications channel: " + newThread.id + " to locked.");

            // Update the notification message to include the reason for closing the ticket
            for (let i = 0; i < embed.fields.length; i++) {
                if (embed.fields[i].name.includes('Closed') || embed.fields[i].name.includes('Locked')) {
                    embed.fields.splice(i, 1);
                    i--;
                }
            }
            embed.fields.push({
                name: `Locked`,
                value: `<t:${Math.floor(Date.now() / 1000)}:R>\nReason: ${data.closedLockedReason || 'No reason.'}`
            });
            
            await message.edit({
                embeds: [
                    EmbedBuilder.from(embed)
                        .setTitle("Ticket Locked: `" + newThread.id + "`")
                        .setColor('#a01a1a')
                ]
            });

            // Delete the message from the ticketsOpened channel.
            if (ticketOpenedMessage) {
                await ticketOpenedMessage.delete();
            }
            break;
        case 're-opened':
            client.logger.info("threadUpdate - Updating ticket in ticketsNotifications channel: " + newThread.id + " to re-opened.");

            // Delete the previous possible action fields
            for (let i = 0; i < embed.fields.length; i++) {
                if (embed.fields[i].name.includes('Closed') || embed.fields[i].name.includes('Locked')) {
                    embed.fields.splice(i, 1);
                    i--;
                }
            }

            const embeds = [
                EmbedBuilder.from(embed)
                    .setTitle("Ticket Re-opened: `" + newThread.id + "`")
                    .setColor('#0099FF')
            ];

            await message.edit({embeds: embeds});

            // Delete the message from the ticketsOpened channel.
            if (ticketOpenedMessage) {
                await ticketOpenedMessage.delete();
            }

            // Send a copy of the message to the ticketsOpened channel.
            ticketOpenedMessage = await ticketsOpenedNotifyChannel.send({
                embeds: embeds,
                components: message.components
            });

            delete data.closedLockedReason;
            data.openedMessageId = ticketOpenedMessage.id;
            client.botData.set(`ticket_${newThread.id}`, data);
            break;
    }
}

// On thread closed or locked or reopened
client.on('threadUpdate', async (oldThread, newThread) => {
    if(newThread.parentId !== config.channels.tickets) {
        return;
    }

    let status = null;
    if(newThread.locked !== oldThread.locked || newThread.archived !== oldThread.archived) {
        if(newThread.locked === true) {
            status = 'locked';
        } else {
            status = newThread.archived ? 'closed' : 're-opened';
        }
    } else {
        return;
    }

    client.logger.info(`threadUpdate - Thread updated: ${newThread.id} - ${newThread.name} - status ~ locked: ${oldThread.locked}->${newThread.locked}, archived: ${oldThread.archived}->${newThread.archived}`);

    if (status) {
        if(client.botData.has(`ticket_${newThread.id}`))
        {
            await handleThreadUpdate(newThread, status);
        }
        else // Legacy threads support. I will remove this at some point when old threads are all closed.
        {
            client.logger.info(`threadUpdate - Legacy thread found: ${newThread.id} - ${newThread.name} - status ~ locked: ${oldThread.locked}->${newThread.locked}`);

            // Find the message in the notification channel that corresponds to this thread
            let lastMessageId = null;
            let stop = false;
            while (true) {
                // Fetch the messages in batches
                const options = { limit: 20 };
                if (lastMessageId) {
                    options.before = lastMessageId;
                }

                const messages = await notificationChannel.messages.fetch(options);
                if (messages.size === 0) {
                    break; // No more messages to process
                }

                // Iterate over each message
                for (const message of messages.values()) {
                    if (message.embeds.length === 0) {
                        continue;
                    }

                    // Obtain thread id from the embed button "ticket_panel_join_thread_<threadId>"
                    const threadId = message.components[0]?.components?.[1]?.customId.split('ticket_panel_join_thread_')[1];
                    if (!threadId) {
                        continue;
                    }
                    
                    if(threadId !== newThread.id) {
                        continue;
                    }

                    // Wait 1 second before editing the thread message to avoid rate limits.
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const embed = message.embeds[0];
                    switch(status) {
                        case 'closed':
                        client.logger.info("threadUpdate - Updating ticket in ticketsNotifications channel: " + threadId + " to closed.");
                        await message.edit({
                            embeds: [
                                EmbedBuilder.from(embed)
                                    .setTitle("Ticket Closed: `" + newThread.id + "`")
                                    .setColor('#a0401a')
                            ]
                        });
                        break;
                    case 'locked':
                        client.logger.info("threadUpdate - Updating ticket in ticketsNotifications channel: " + threadId + " to locked.");
                        await message.edit({
                            embeds: [
                                EmbedBuilder.from(embed)
                                    .setTitle("Ticket Locked: `" + newThread.id + "`")
                                    .setColor('#a01a1a')
                            ]
                        });
                        break;
                    case 're-opened':
                        client.logger.info("threadUpdate - Updating ticket in ticketsNotifications channel: " + threadId + " to re-opened.");
                        await message.edit({
                            embeds: [
                                EmbedBuilder.from(embed)
                                    .setTitle("Ticket Re-opened: `" + newThread.id + "`")
                                    .setColor('#0099FF')
                            ]
                        });

                        // Send a copy of the message to the ticketsOpened channel.
                        await ticketsOpenedNotifyChannel.send({
                            content: '',
                            embeds: [
                                EmbedBuilder.from(embed)
                                    .setTitle("Ticket Re-opened: `" + newThread.id + "`")
                                    .setColor('#0099FF')
                            ],
                            components: message.components
                        });

                        break;
                    }

                    // No need to continue searching for the message, we found it.
                    stop = true;
                }

                if(stop) {
                    break;
                }

                // Update lastMessageId for pagination
                lastMessageId = messages.last().id;

                // Wait a bit before the next batch to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

             // Check if the message is already in the ticketsOpened channel, by iterating message in the ticketsOpened channel.
            // If the status is closed, delete the message from the ticketsOpened channel.
            if(status === 'closed' || status === 'locked') {
                lastMessageId = null;
                while(true) {
                    // Fetch the messages in batches
                    const options = { limit: 20 };
                    if (lastMessageId) {
                        options.before = lastMessageId;
                    }

                    const messages = await ticketsOpenedNotifyChannel.messages.fetch(options);
                    if (messages.size === 0) {
                        break; // No more messages to process
                    }

                    // Iterate over each message
                    for (const message of messages.values()) {
                        if (message.embeds.length === 0) {
                            continue;
                        }

                        // Obtain thread id from the embed button "ticket_panel_join_thread_<threadId>"
                        const threadId = message.components[0]?.components?.[1]?.customId.split('ticket_panel_join_thread_')[1];
                        console.log("threadUpdate - Checking threadId: " + threadId);
                        if (!threadId) {
                            continue;
                        }

                        if(threadId === newThread.id) {
                            await message.delete();
                            break;
                        }
                    }

                    // Update lastMessageId for pagination
                    lastMessageId = messages.last().id;
                }
            }
        }
    }
});

client.on('threadDelete', async thread => {
    if(client.botData.has(`ticket_${thread.id}`))
    {
        // Get the message id from the botData
        const data = client.botData.get(`ticket_${thread.id}`);
        const message = await notificationChannel.messages.fetch(data.notificationMessageId);
        if(!message) {
            client.logger.error(`threadDelete - Failed to update the tickets notification channel. The message ${data.notificationMessageId} does not exist.`);
            return;
        }
        let ticketOpenedMessage;
        try {
            ticketOpenedMessage = await notificationChannel.messages.fetch(data.openedMessageId);
        }
        catch(error) {
            client.logger.error(`threadDelete - Failed to update the tickets opened notification channel. The message ${data.openedMessageId} does not exist.`);
        }

        // Delete the message from the ticketsOpened channel.
        if(ticketOpenedMessage) {
            await ticketOpenedMessage.delete();
        }

        const embed = message.embeds[0];
        client.logger.info("threadDelete - Updating ticket in ticketsNotifications channel: " + thread.id + " to deleted.");
        await message.edit({
            embeds: [
                EmbedBuilder.from(embed)
                .setTitle("Ticket Deleted: `" + thread.id + "`")
                .setColor('#33000e')
            ]
        });

        // Delete thread data
        client.botData.delete(`ticket_${thread.id}`);
    }
    else // Legacy threads support. I will remove this at some point when old threads are all closed.
    {
        // Find the message in the notification channel that corresponds to this thread
        let lastMessageId = null;
        let stop = false;
        while (true) {
            // Fetch the messages in batches
            const options = { limit: 20 };
            if (lastMessageId) {
                options.before = lastMessageId;
            }

            const messages = await notificationChannel.messages.fetch(options);
            if (messages.size === 0) {
                break; // No more messages to process
            }

            // Iterate over each message
            for (const message of messages.values()) {
                if (message.embeds.length === 0) {
                    continue;
                }

                // Obtain thread id from the embed button "ticket_panel_join_thread_<threadId>"
                const threadId = message.components[0]?.components?.[1]?.customId.split('ticket_panel_join_thread_')[1];
                if (!threadId) {
                    continue;
                }
                
                if(threadId !== thread.id) {
                    continue;
                }

                const embed = message.embeds[0];

                client.logger.info("threadDelete - Updating ticket in ticketsNotifications channel: " + threadId + " to deleted.");
                await message.edit({
                    embeds: [
                        EmbedBuilder.from(embed)
                        .setTitle("Ticket Deleted: `" + thread.id + "`")
                        .setColor('#33000e')
                    ]
                });

                // No need to continue searching for the message, we found it.
                stop = true;
            }

            if(stop) {
                break;
            }

            // Update lastMessageId for pagination
            lastMessageId = messages.last().id;

            // Wait a bit before the next batch to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    lastMessageId = null;
    while(true) {
        // Fetch the messages in batches
        const options = { limit: 20 };
        if (lastMessageId) {
            options.before = lastMessageId;
        }

        const messages = await ticketsOpenedNotifyChannel.messages.fetch(options);
        if (messages.size === 0) {
            break; // No more messages to process
        }

        // Iterate over each message
        for (const message of messages.values()) {
            if (message.embeds.length === 0) {
                continue;
            }

            // Obtain thread id from the embed button "ticket_panel_join_thread_<threadId>"
            const threadId = message.components[0]?.components?.[1]?.customId.split('ticket_panel_join_thread_')[1];
            if (!threadId) {
                continue;
            }

            if(threadId === thread.id) {
                console.log("threadDelete - Deleting message in ticketsOpened channel: " + threadId);
                await message.delete();
                break;
            }
        }

        // Update lastMessageId for pagination
        lastMessageId = messages.last().id;
    }
});

// Schedule a task that will iterate through all the messages in the tickets notification channel and edits the embed color to gray if the ticket is closed, and rename
// the button to "Re-open" if the ticket is closed. Also rename the title to "Ticket Closed" if the ticket is closed.
// This is useful to keep the notification channel clean and to avoid pinging everyone for no reason.
async function forceUpdateTicketsNotificationChannel() {
    let lastMessageId = null;
    while (true) {
        // Fetch the messages in batches
        const options = { limit: 20 };
        if (lastMessageId) {
            options.before = lastMessageId;
        }

        const messages = await notificationChannel.messages.fetch(options);
        if (messages.size === 0) {
            break; // No more messages to process
        }

        // Iterate over each message
        for (const message of messages.values()) {
            if (message.embeds.length === 0) {
                continue;
            }

            // Obtain thread id from the embed button "ticket_panel_join_thread_<threadId>"
            const threadId = message.components[0]?.components?.[1]?.customId.split('ticket_panel_join_thread_')[1];
            if (!threadId) {
                continue;
            }

            const embed = message.embeds[0];

            // Wait 1 second before searching the thread to avoid rate limits.
            await new Promise(resolve => setTimeout(resolve, 1000));

            const thread = await notificationChannel.guild.channels.fetch(threadId).catch(() => null);
            if (!thread) {
                if(!embed.title.startsWith('Ticket Deleted')) {
                    client.logger.info("forceUpdateTicketsNotificationChannel - Updating ticket in ticketsNotifications channel: " + threadId + " to deleted.");
                    await message.edit({
                        embeds: [
                            EmbedBuilder.from(embed)
                            .setTitle("Ticket Deleted: `" + threadId + "`")
                            .setColor('#33000e')
                        ]
                    });
                }
                continue;
            }

            if(thread.locked) {
                if(!embed.title.startsWith('Ticket Locked')) {
                    client.logger.info("forceUpdateTicketsNotificationChannel - Updating ticket in ticketsNotifications channel: " + threadId + " to locked.");
                    await message.edit({
                        embeds: [
                            EmbedBuilder.from(embed)
                            .setTitle("Ticket Locked: `" + threadId + "`")
                            .setColor('#a01a1a')
                        ]
                    });
                }
            } else if(thread.archived) {
                if(!embed.title.startsWith('Ticket Closed')) {
                    client.logger.info("forceUpdateTicketsNotificationChannel - Updating ticket in ticketsNotifications channel: " + threadId + " to closed.");
                    await message.edit({
                        embeds: [
                            EmbedBuilder.from(embed)
                            .setTitle("Ticket Closed: `" + threadId + "`")
                            .setColor('#a0401a')
                        ]
                    });
                }
            } else if(!thread.archived) {
                if(!embed.title.startsWith('Ticket Re-opened') && !embed.title.startsWith('New Ticket')) {
                    client.logger.info("forceUpdateTicketsNotificationChannel - Updating ticket in ticketsNotifications channel: " + threadId + " to re-opened.");
                    await message.edit({
                        embeds: [
                            EmbedBuilder.from(embed)
                            .setTitle("Ticket Re-opened: `" + threadId + "`")
                            .setColor('#0099FF')
                        ]
                    });
                }
            }
        }

        // Update lastMessageId for pagination
        lastMessageId = messages.last().id;

        // Wait a bit before the next batch to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}