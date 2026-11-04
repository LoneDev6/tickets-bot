const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function creationPanel(settings) {
    const privacyUrl = `${settings.publicBaseUrl}/privacy`;
    return {
        embeds: [new EmbedBuilder().setTitle('Private Support Ticket').setColor('#a0401a').setDescription(`Private tickets are only for rare occasions. Invalid requests may be removed.\nFor plugin bugs use GitHub; for general help use the public support channels after verification. Read the tutorials and search Discord and GitHub before opening a ticket.\n\nAuthorized support staff can manage your ticket through our private dashboard. ${settings.messageContentApproved ? 'Conversation content is archived on our server.' : 'Full conversation archiving is disabled pending Discord authorization.'}\nTicket data is retained while open and up to 30 days after closure.\n[Read the privacy policy](${privacyUrl}) · Privacy and deletion: info@devs.beer`)],
        components: [new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('ticket_panel_create_thread_generic').setLabel('Generic').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('ticket_panel_create_thread_payment').setLabel('Payment issue').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('ticket_panel_my_tickets').setLabel('My tickets').setStyle(ButtonStyle.Secondary),
        ), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(privacyUrl).setLabel('Privacy policy'))],
        allowedMentions: { parse: [] },
    };
}

async function refreshCreationPanels(client, settings, store) {
    if (!settings.publicBaseUrl) return;
    const version = `privacy-v2:${settings.publicBaseUrl}:${settings.messageContentApproved}`;
    if (store.read('meta:creation-panel-version') === version) return;
    const channel = await client.channels.fetch(settings.ticketParentId);
    if (!channel || channel.guildId !== settings.guildId || !channel.isTextBased()) throw new Error('Ticket creation channel unavailable.');
    let before;
    while (true) {
        const page = await channel.messages.fetch({ limit: 100, ...(before ? { before } : {}) });
        for (const message of page.values()) {
            if (message.author?.id === client.user.id && message.components?.some(row => row.components?.some(component => component.customId?.startsWith('ticket_panel_create_thread_')))) {
                await message.edit(creationPanel(settings));
            }
        }
        if (page.size < 100) break;
        const next = page.last().id;
        if (!next || next === before) throw new Error('Ticket creation panel pagination did not advance.');
        before = next;
    }
    store.write('meta:creation-panel-version', version);
}

module.exports = { creationPanel, refreshCreationPanels };
