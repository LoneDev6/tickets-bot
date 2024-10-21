require('dotenv').config()
require('./server.js');
const discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ThreadAutoArchiveDuration, ChannelType, TextInputStyle, ModalBuilder, TextInputBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { settings, config } = require('./global.js');

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

client.logger = require('./utils/logger');

client.on('disconnect', () => {
    console.log(`Disconnecting as ${client.user.tag}!`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    onReady();
});

// Error handling
client.on('error', error => client.logger.error("Error", error));
client.on('warn', info => client.logger.warn(info, info));
process.on('unhandledRejection', error => client.logger.error("UNHANDLED_REJECTION\n" + error, error));
process.on('uncaughtException', error => {
    client.logger.error("Uncaught Exception is detected, restarting...", error);
    process.exit(1);
});
// Login to Discord with your app's token
client.login(settings.DISCORD_TOKEN);

client.on('messageCreate', async message => {
    if (message.author.bot)
        return

    if (message.channel.type === "dm")
        return

    if (message.author.id === '289137568144949248' && message.content === "aaacreateThreadPanel") { 
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
## Private tickets are only for rare occasions
Please make sure to read the various tutorials and search on the Discord server or Github before creating a ticket.
Do not abuse the ticket system.`)
            .setColor('#a0401a');

        // Send the message with the buttons and embed
        return await message.channel.send({
            content: '',
            components: [row],
            embeds: [embed]
        });
    }
});

async function checkIfHasExceededNumberOfThreads(interaction) {
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

function onReady() {
    setInterval(updateTicketsNotificationChannel, 5 * 60 * 1000);
    updateTicketsNotificationChannel();

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
}

client.on('interactionCreate', async (interaction) => {

    if (interaction.isCommand()) {
        if (interaction.commandName === 'rename') {
            if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                return await interaction.reply({
                    content: 'You do not have the required permissions to use this command.',
                    ephemeral: true
                });
            }

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

            const reason = interaction.options.getString('reason') || 'No reason.';
            if(!thread.locked) {
                await thread.setLocked(true, reason ? reason : 'No reason.');
            }

            if(!thread.archived) {
                await thread.setArchived(true, reason ? reason : 'No reason.');
            }

            return await interaction.editReply({
                embeds: [new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Invalid Thread Locked')
                    .setDescription(`This thread has been locked by <@${interaction.user.id}>.\nReason: ${reason}`)
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
            const reason = interaction.fields.getTextInputValue('reason');

            // Remove all buttons from the message
            await interaction.message.edit({ components: [] });

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
                await interaction.channel.setArchived(true, reason ? reason : 'No reason.');
                client.logger.info(`Ticket locked by @${interaction.member.user.tag} (${interaction.member.id}) in #${interaction.channel.name} (${interaction.channel.id}).`);
            } else {
                client.logger.info(`Ticket closed by @${interaction.member.user.tag} (${interaction.member.id}) in #${interaction.channel.name} (${interaction.channel.id}).`);
            }

            return await interaction.deferUpdate();
        }

        if(interaction.customId.startsWith('modal_ticket_panel_create_thread_')) {

            if(await checkIfHasExceededNumberOfThreads(interaction)) {
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
    
            // Send notification to another channel about the new ticket specifying the user and the description
            const notificationChannel = interaction.guild.channels.cache.get(config.channels.ticketsNotifications);
            if(!notificationChannel) {
                return await interaction.reply({
                    content: `The tickets notification channel${config.channels.ticketsNotifications} does not exist. Please contact an administrator.`,
                    ephemeral: true
                });
            }

            await notificationChannel.send({
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
            });
    
            // Send a message to the user in the thread
            await thread.send({
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


            // Search in channel "989167088742572072" for the verification thread. The thread name contains the user id in its name:
            const verificationChannel = interaction.guild.channels.cache.get('989167088742572072');
            let verificationThread;
            if(!verificationChannel) {
                console.error('The verification channel does not exist.');
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

            await thread.send(`Hello <@${interaction.user.id}>, please wait for a staff member to assist you.\nIn the meantime make sure to read <id:guide>, search on the **Discord** server and search on **Github**.`);
    
            // Send an ephemeral message to the user in the interaction channel so that they can find the new thread easily. 
            return await interaction.reply({
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

            // Remove all buttons from the message
            await interaction.message.edit({ components: [] });

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

            if(await checkIfHasExceededNumberOfThreads(interaction)) {
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

            if(thread.archived) {
                return await interaction.reply({
                    content: 'The ticket thread is closed.',
                    ephemeral: true
                });
            }

            await thread.members.add(interaction.user.id);

            // Update the thread notification message to include the new user in the list of users who already joined the thread.
            // Add a new embed to list the current users if not available or edit it by attaching that new embed to the ones.
            // NOTE: also add interaction.user.id to the list of users.
            // Force thread members to be fetched to avoid caching issues.
            await thread.members.fetch();
            const mentions = thread.members.cache
                .map(member => member.id !== client.user.id ? `<@${member.id}>` : "")
                .filter(mention => mention !== "");
            const description = mentions.join(', ');
            const embeds = interaction.message.embeds;
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
            await interaction.message.edit({ embeds: embeds });

            return await interaction.reply({
                content: 'You have successfully joined the ticket thread.',
                ephemeral: true
            });
        }
    }
});

// On thread closed or locked or reopened
client.on('threadUpdate', async (oldThread, newThread) => {
    const isArchived = oldThread.archived === false && newThread.archived === true;
    const isLocked = oldThread.locked === false && newThread.locked === true;
    const isReopened = oldThread.archived === true && newThread.archived === false;
    const status = isLocked ? 'locked' : isArchived ? 'closed' : isReopened ? 're-opened' : null;
    if (status) {
        const notificationChannel = client.channels.cache.get(config.channels.ticketsNotifications);
        if (!notificationChannel) {
            client.logger.error(`Failed to update the tickets notification channel. The channel ${config.channels.ticketsNotifications} does not exist.`);
            return;
        }

        // Find the message in the notification channel that corresponds to this thread
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
                
                if(threadId !== newThread.id) {
                    continue;
                }

                // Wait 1 second before editing the thread message to avoid rate limits.
                await new Promise(resolve => setTimeout(resolve, 1000));

                const embed = message.embeds[0];
                switch(status) {
                    case 'closed':
                    client.logger.info("Updating ticket in ticketsNotifications channel: " + threadId + " to closed.");
                    await message.edit({
                        embeds: [
                            EmbedBuilder.from(embed)
                                .setTitle("Ticket Closed: `" + newThread.id + "`")
                                .setColor('#a0401a')
                        ]
                    });
                    break;
                case 'locked':
                    client.logger.info("Updating ticket in ticketsNotifications channel: " + threadId + " to locked.");
                    await message.edit({
                        embeds: [
                            EmbedBuilder.from(embed)
                                .setTitle("Ticket Locked: `" + newThread.id + "`")
                                .setColor('#a01a1a')
                        ]
                    });
                    break;
                case 're-opened':
                    client.logger.info("Updating ticket in ticketsNotifications channel: " + threadId + " to re-opened.");
                    await message.edit({
                        embeds: [
                            EmbedBuilder.from(embed)
                                .setTitle("Ticket Re-opened: `" + newThread.id + "`")
                                .setColor('#0099FF')
                        ]
                    });
                    break;
                }

                // No need to continue searching for the message, we found it.
                return;
            }

            // Update lastMessageId for pagination
            lastMessageId = messages.last().id;

            // Wait a bit before the next batch to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
});

client.on('threadDelete', async thread => {
    const notificationChannel = client.channels.cache.get(config.channels.ticketsNotifications);
    if (!notificationChannel) {
        client.logger.error(`Failed to update the tickets notification channel. The channel ${config.channels.ticketsNotifications} does not exist.`);
        return;
    }

    // Find the message in the notification channel that corresponds to this thread
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
            
            if(threadId !== thread.id) {
                continue;
            }

            const embed = message.embeds[0];

            client.logger.info("Updating ticket in ticketsNotifications channel: " + threadId + " to deleted.");
            await message.edit({
                embeds: [
                    EmbedBuilder.from(embed)
                    .setTitle("Ticket Deleted: `" + thread.id + "`")
                    .setColor('#33000e')
                ]
            });

            // No need to continue searching for the message, we found it.
            return;
        }

        // Update lastMessageId for pagination
        lastMessageId = messages.last().id;

        // Wait a bit before the next batch to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
});


// Schedule a task that will iterate through all the messages in the tickets notification channel and edits the embed color to gray if the ticket is closed, and rename
// the button to "Re-open" if the ticket is closed. Also rename the title to "Ticket Closed" if the ticket is closed.
// This is useful to keep the notification channel clean and to avoid pinging everyone for no reason.
async function updateTicketsNotificationChannel() {
    const notificationChannel = client.channels.cache.get(config.channels.ticketsNotifications);
    if(!notificationChannel)
    {
        client.logger.error(`Failed to iterate through the tickets notification channel. The channel ${notificationChannel} does not exist.`);
        return;
    }

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
                    client.logger.info("Updating ticket in ticketsNotifications channel: " + threadId + " to deleted.");
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
                    client.logger.info("Updating ticket in ticketsNotifications channel: " + threadId + " to locked.");
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
                    client.logger.info("Updating ticket in ticketsNotifications channel: " + threadId + " to closed.");
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
                    client.logger.info("Updating ticket in ticketsNotifications channel: " + threadId + " to re-opened.");
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