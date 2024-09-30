//<editor-fold desc="Uptime">
const express = require('express');
const app = express();
const port = 669;
app.get('/', (req, res) => res.send('Very nice'));
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
//</editor-fold>

const discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ThreadAutoArchiveDuration, ChannelType } = require('discord.js');
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
        const button = new ButtonBuilder()
            .setCustomId('create_thread')
            .setLabel('Create Private Ticket')
            .setStyle(ButtonStyle.Success)
            .setEmoji('📝');

        const row = new ActionRowBuilder().addComponents(button);

        // Send the embed along with the button
        await message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor('#0099FF')
                .setTitle('Private Ticket')
                .setDescription('Click the button below to create a new private ticket.'),
            new EmbedBuilder()
                .setTitle("Warning")
                .setColor('#FFA500')
                .setDescription('Please make sure to read the various tutorials and search on the Discord server or Github before creating a ticket.\nDo not abuse the ticket system.')
            ],
            components: [row]
        });
    }
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isButton())
        return

    if (interaction.customId === 'create_thread') {

        // Iterate through threads and check if the user already has max 2 opened thread in the recent 48 hours.
        let threadCount = 0;
        await interaction.channel.threads.cache.forEach(thread => {
            if (thread.name.includes(interaction.user.id) && thread.createdTimestamp + 172800000 >= Date.now())
                threadCount++;
        });

        if (threadCount >= 2) {
            return await interaction.reply({
                content: 'You have reached the maximum amount of open threads. Please wait for a staff member to assist you.',
                ephemeral: true
            });
        }

        const thread = await interaction.channel.threads.create({
            name: `Support Ticket - ${interaction.user.username} (${interaction.user.id})`,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
            reason: 'Private Ticket',
            type: ChannelType.PrivateThread,
        });

        await thread.members.add(interaction.user.id);

        await thread.send({
            embeds: [new EmbedBuilder()
                .setColor('#0099FF')
                .setTitle('Support Ticket')
                .setDescription(`Hello <@${interaction.user.id}>, please wait for a staff member to assist you.\nIn the meantime make sure to read the various tutorials and search on the Discord server or Github.`)]
        });

        await interaction.reply({
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
});


client.login(settings.DISCORD_TOKEN);