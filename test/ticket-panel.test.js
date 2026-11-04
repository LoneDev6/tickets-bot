const test = require('node:test');
const assert = require('node:assert/strict');
const { Collection } = require('discord.js');
const { creationPanel, refreshCreationPanels } = require('../ticket-panel');

const settings = { publicBaseUrl: 'https://tickets.example.com', guildId: '120000000000000004', ticketParentId: '120000000000000005', messageContentApproved: false };

test('ticket creation panel exposes a public policy link and accurate collection and retention notice', () => {
    const panel = creationPanel(settings);
    const link = panel.components[1].toJSON().components[0];
    assert.equal(link.url, 'https://tickets.example.com/privacy');
    assert.equal(link.label, 'Privacy policy');
    assert(panel.embeds[0].data.description.includes('30 days'));
    assert(panel.embeds[0].data.description.includes('disabled pending Discord authorization'));
    assert(creationPanel({ ...settings, messageContentApproved: true }).embeds[0].data.description.includes('archived on our server'));
});

test('existing creation panels are updated once through pagination, without changing other authors', async () => {
    const database = new Map();
    let pages = 0; let edits = 0;
    const botId = '120000000000000007';
    const components = [{ components: [{ customId: 'ticket_panel_create_thread_generic' }] }];
    const messages = new Collection(Array.from({ length: 100 }, (_, i) => [String(i), { id: String(i), author: { id: botId }, components: [] }]));
    const own = { id: 'older-own-panel', author: { id: botId }, components, edit: async payload => { assert(payload.embeds[0].data.description.includes('/privacy')); edits++; } };
    const other = { ...own, id: 'other-bot-panel', author: { id: 'other-bot' }, edit: async () => assert.fail('Do not edit another bot panel') };
    const channel = { guildId: settings.guildId, isTextBased: () => true, messages: { fetch: async query => {
        pages++; if (pages === 1) return messages;
        assert.equal(query.before, '99'); return new Collection([[own.id, own], [other.id, other]]);
    } } };
    const client = { user: { id: botId }, channels: { fetch: async () => channel } };
    const store = { read: key => database.get(key), write: (key, value) => database.set(key, value) };
    await refreshCreationPanels(client, settings, store);
    await refreshCreationPanels(client, settings, store);
    assert.equal(edits, 1); assert.equal(pages, 2);
});
