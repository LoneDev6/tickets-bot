//<editor-fold desc="Uptime">
const express = require('express');
const app = express();
const port = 669;
app.get('/', (req, res) => res.send('Very nice'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
//</editor-fold>

const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed, ThreadAutoArchiveDuration, ChannelType } = require('discord.js');
const { settings, config } = require('./global.js');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildBans,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});

client.on('disconnect', () => {
    console.log(`Disconnecting as ${client.user.tag}!`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: "online",
        activity: {
            name: "threads",
            type: 'WATCHING',
            url: "https://www.discord.com"
        }
    });

});


client.on('messageCreate', async msg => {
    if (msg.author.bot)
        return

    if (msg.channel.type === "dm")
        return

    // Create the panel with a button to create a thread in this channel.
    // Use embeds to make it look nice.
    if (msg.content === "aaacreateThreadPanel") { 
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('create_thread')
                    .setLabel('Create Thread')
                    .setStyle('PRIMARY') // You can also use ButtonStyle.Primary in v14
                    .setEmoji('📝') // Add an emoji to make the button more engaging
            );

        // Create the embed for a nicer presentation
        const embed = new MessageEmbed()
            .setColor('#0099FF') // Use a bright, appealing color
            .setTitle('Thread Creation')
            .setDescription('Click the button below to create a new thread in this channel.')
            .setFooter('Powered by your awesome bot'); // Add a footer to make it look more polished

        // Send the embed along with the button
        await msg.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isButton())
        return

    // TODO: fix
    if (interaction.customId === 'create_thread') {
        // Create a thread in the channel where the button was clicked
        const thread = await interaction.channel.threads.create({
            name: "Private Thread",
            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
            reason: 'Verification thread',
            type: ChannelType.PrivateThread,
        });

        for (const memberId of config.members_auto_add) {
            await thread.members.add(memberId);
        }

        await thread.send('Welcome to your new thread!');

        return await interaction.reply('Thread created successfully!');
    }
});


client.login(settings.DISCORD_TOKEN);