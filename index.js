require('dotenv').config()
require('./server.js');
const discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ThreadAutoArchiveDuration, ChannelType,TextInputStyle, ModalBuilder,TextInputBuilder } = require('discord.js');
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
});

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
            .setColor('#A01A1A');

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

client.on('interactionCreate', async (interaction) => {

    if (interaction.isModalSubmit()) {
        if(interaction.customId === 'modal_ticket_panel_close_thread') {
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
        
            await interaction.channel.setArchived(true, reason ? reason : 'No reason.');

            client.logger.info(`Ticket closed by @${interaction.member.user.tag} (${interaction.member.id}) in #${interaction.channel.name} (${interaction.channel.id}).`);

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
                    .setTitle('New Ticket')
                    .setDescription(`New ticket by <@${interaction.user.id}>.`)
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
                embeds: [new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Support Ticket')
                    .setDescription(`Hello <@${interaction.user.id}>, please wait for a staff member to assist you.\nIn the meantime make sure to read the various tutorials and search on the Discord server or Github.`),
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
            await rolesInfoMessage.edit({
            embeds: [new EmbedBuilder()
                .setColor('#0099FF')
                .setTitle('User Roles')
                .setDescription(`**Connected Markets**:\n${connectedMarketsRoles}\n\n**Product Roles**:\n${productRoles}`)
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId('ticket_panel_close_thread')
                )
            ]
            });
    
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
                    .setTitle('Staff In Ticket')
                    .setDescription(description)
                );
            } else {
                embeds[1] = new EmbedBuilder()
                    .setTitle('Staff In Ticket')
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


client.on('error', error => client.logger.error("Error", error));
client.on('warn', info => client.logger.warn(info, info));
process.on('unhandledRejection', error => client.logger.error("UNHANDLED_REJECTION\n" + error, error));
process.on('uncaughtException', error => {
    client.logger.error("Uncaught Exception is detected, restarting...", error);
    process.exit(1);
});



client.login(settings.DISCORD_TOKEN);