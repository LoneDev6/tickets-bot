// Paste into DevTools on an open local mock ticket, then run await verifyTicketChat().
async function verifyTicketChat() {
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
    const until = async (predicate, message) => {
        const end = Date.now() + 6500;
        while (Date.now() < end) { if (await predicate()) return; await pause(50); }
        throw new Error(message);
    };
    const originalFetch = window.fetch;
    const request = originalFetch.bind(window);
    const session = await (await request('/api/session')).json();
    assert(session.capabilities.mockChat, 'Run this check only against the local mock.');
    const ticketId = location.pathname.match(/^\/tickets\/(\d+)$/)?.[1];
    assert(ticketId, 'Open a mock ticket first.');
    const api = `/api/tickets/${ticketId}`;
    const sendPath = `/api/mock/tickets/${ticketId}/messages`;
    const replyPath = `${api}/reply`;
    const input = document.querySelector('#mock-message');
    const region = document.querySelector('[aria-label="Ticket conversation"]');
    const transcript = region?.querySelector('discord-messages');
    const firstMessage = region?.querySelector('[data-message-id]');
    assert(input && region && firstMessage, 'Wait for the conversation to load.');
    assert(!input.disabled, 'Open a ticket that accepts mock messages.');
    const report = {};
    const setDraft = value => {
        Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const incoming = content => request(sendPath, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': session.csrfToken }, body: JSON.stringify({ content, sender: 'requester' }) });
    let failedSend = false;
    let staffRequests = 0;
    let frame;
    window.fetch = async (resource, options) => {
        const url = typeof resource === 'string' ? resource : resource.url;
        if (url === api + '/messages' || url.startsWith(api + '/messages?')) await pause(300);
        if (url === replyPath) {
            staffRequests++;
            await pause(500);
            if (failedSend) return Response.json({ error: 'Synthetic send failure' }, { status: 503 });
        }
        return request(resource, options);
    };
    try {
        const initialCount = region.querySelectorAll('[data-message-id]').length;
        const windowMessage = `Retained window ${Date.now()}`;
        await incoming(windowMessage);
        await until(() => transcript.textContent.includes(windowMessage), 'The live message window did not refresh.');
        assert(region.querySelectorAll('[data-message-id]').length === initialCount + 1 && firstMessage.isConnected, 'Live updates must retain exactly the loaded range without dropping or prefetching extra history.');
        report.window = { before: initialCount, after: initialCount + 1, boundaryPreserved: true };
        const older = [...region.querySelectorAll('button')].find(b => b.textContent === 'Load older messages');
        if (older) {
            await until(() => !older.disabled, 'History control did not finish refreshing.');
            const count = region.querySelectorAll('[data-message-id]').length;
            region.scrollTop = 0;
            region.dispatchEvent(new Event('scroll'));
            await pause(100);
            const anchor = [...region.querySelectorAll('[data-message-id]')].find(el => el.getBoundingClientRect().bottom > region.getBoundingClientRect().top);
            const offset = () => anchor.getBoundingClientRect().top - region.getBoundingClientRect().top;
            const position = offset();
            older.click();
            await until(() => region.querySelectorAll('[data-message-id]').length > count, 'Older history was not loaded.');
            await pause(600);
            assert(anchor.isConnected && Math.abs(offset() - position) < 2, 'Loading older messages lost the reading position.');
            report.pagination = { before: count, after: region.querySelectorAll('[data-message-id]').length, anchorPreserved: true };
        }
        region.scrollTop = region.scrollHeight;
        region.dispatchEvent(new Event('scroll'));
        input.focus({ preventScroll: true });
        const draft = `Draft preserved ${Date.now()}`;
        setDraft(draft);
        await pause(100);
        const samples = [];
        const sample = () => {
            samples.push({ top: region.getBoundingClientRect().top, height: region.clientHeight, composerTop: input.getBoundingClientRect().top, page: scrollY, focused: document.activeElement === input });
            frame = requestAnimationFrame(sample);
        };
        sample();
        for (let n = 0; n < 3; n++) {
            assert((await incoming(`Incoming stability ${draft} ${n}`)).status === 201, 'Incoming mock send failed.');
            await pause(200);
        }
        await until(() => transcript.textContent.includes(`Incoming stability ${draft} 2`), 'Live incoming messages did not render.');
        await pause(600);
        cancelAnimationFrame(frame);
        frame = null;
        const deltas = Object.fromEntries(['top', 'height', 'composerTop', 'page'].map(key => [key, Math.max(...samples.map(s => s[key])) - Math.min(...samples.map(s => s[key]))]));
        assert(Object.values(deltas).every(delta => delta < 1), `Layout moved during live updates: ${JSON.stringify(deltas)}`);
        assert(samples.every(s => s.focused), 'Incoming messages stole composer focus.');
        assert(input.value === draft, 'Incoming messages changed the draft.');
        assert(firstMessage.isConnected && region.contains(firstMessage), 'Existing messages were replaced.');
        report.incoming = { frames: samples.length, movementPx: deltas, draftAndFocusPreserved: true };

        const channelHeight = document.querySelector('.ticket-chat').clientHeight;
        const multiline = Array(20).fill('A multiline draft inside the Discord composer.').join('\n');
        setDraft(multiline);
        await pause(150);
        assert(input.scrollHeight > input.clientHeight && input.clientHeight <= 8 * parseFloat(getComputedStyle(document.documentElement).fontSize), 'Long drafts should scroll inside the bounded composer.');
        const composerTop = input.getBoundingClientRect().top;
        const multilineIncoming = `Multiline stability ${Date.now()}`;
        await incoming(multilineIncoming);
        await until(() => transcript.textContent.includes(multilineIncoming), 'Incoming message did not arrive while composing multiline text.');
        assert(input.value === multiline && document.activeElement === input && input.getBoundingClientRect().top === composerTop, 'Incoming message disturbed the multiline draft.');
        assert(document.querySelector('.ticket-chat').clientHeight === channelHeight && region.scrollHeight - region.scrollTop - region.clientHeight < 2, 'Composer growth moved the channel or hid the latest message.');
        report.multiline = 'bounded composer; draft, focus and bottom retained';
        setDraft(draft);
        await pause(100);

        const enter = () => input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
        assert(enter() === false, 'Enter did not submit through the composer.');
        enter();
        await pause(100);
        const nextDraft = `Next unsent draft ${Date.now()}`;
        setDraft(nextDraft);
        await until(() => transcript.textContent.includes(draft) && !document.querySelector('[aria-label="Send message"]').disabled, 'Staff send did not complete.');
        assert(staffRequests === 1, 'Repeated Enter submitted duplicate messages.');
        assert(input.value === nextDraft && document.activeElement === input, 'Sending lost the newer draft or focus.');
        await until(() => transcript.textContent.includes('Thanks! I can confirm the update.'), 'Simulated live reply is missing.');
        const shift = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true, cancelable: true });
        assert(input.dispatchEvent(shift), 'Shift+Enter should allow the native new line.');
        const ime = new KeyboardEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true, cancelable: true });
        assert(input.dispatchEvent(ime), 'IME Enter should not submit a message.');
        report.send = { singleSubmit: true, newDraftAndFocusPreserved: true, shiftEnterAndIME: true };

        failedSend = true;
        enter();
        await until(() => document.body.innerText.includes('Synthetic send failure'), 'Failed send did not show an error.');
        assert(input.value === nextDraft && document.activeElement === input, 'A failed send lost the draft or focus.');
        failedSend = false;
        enter();
        await until(() => input.value === '' && !document.body.innerText.includes('Synthetic send failure'), 'Retry did not recover.');
        await pause(1600);
        report.failedSend = 'draft retained; retry recovered';

        region.scrollTop = 0;
        region.dispatchEvent(new Event('scroll'));
        await pause(100);
        const anchor = [...region.querySelectorAll('[data-message-id]')].find(el => el.getBoundingClientRect().bottom > region.getBoundingClientRect().top);
        const offset = () => anchor.getBoundingClientRect().top - region.getBoundingClientRect().top;
        const before = offset();
        await incoming(`Unread while browsing history ${Date.now()}`);
        await until(() => [...document.querySelectorAll('button')].some(b => b.textContent.includes('jump to present')), 'Incoming message should offer jump to present.');
        assert(Math.abs(offset() - before) < 2, 'Incoming message moved the history anchor.');
        const ticket = await (await request(api)).json();
        assert(ticket.ticket.unread, 'Reading older history must not mark a new message read.');
        [...document.querySelectorAll('button')].find(b => b.textContent.includes('jump to present')).click();
        await until(async () => !(await (await request(api)).json()).ticket.unread, 'Jumping to the latest message did not mark it read.');
        assert(region.scrollHeight - region.scrollTop - region.clientHeight < 2, 'Jump did not reach the latest message.');
        report.history = 'incoming preserves position and unread state; jump acknowledges latest';
        assert(document.documentElement.scrollWidth <= innerWidth, 'The page overflows horizontally.');
        assert(document.querySelector('.ticket-chat-scroll') === region && document.querySelector('#mock-message') === input, 'Live updates replaced the conversation or composer.');
        report.viewport = { width: innerWidth, height: innerHeight, theme: document.querySelector('.ticket-chat').dataset.theme };
        return report;
    } finally {
        if (frame) cancelAnimationFrame(frame);
        window.fetch = originalFetch;
    }
}
