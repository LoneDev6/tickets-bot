// Paste into DevTools on the local mock fixture dashboard root, then run:
// await verifyLiveTicketUpdates()
async function verifyLiveTicketUpdates() {
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
    const until = async (predicate, message) => {
        const deadline = Date.now() + 8000;
        while (Date.now() < deadline) {
            if (await predicate()) return;
            await pause(40);
        }
        throw new Error(message);
    };
    const deferred = () => {
        let resolve;
        const promise = new Promise(done => { resolve = done; });
        return { promise, resolve };
    };
    const requestUrl = resource => new URL(typeof resource === 'string' ? resource : resource.url, location.href);
    const originalFetch = window.fetch;
    const request = originalFetch.bind(window);
    assert(location.hostname === '127.0.0.1', 'Run this check only on the local 127.0.0.1 fixture.');
    assert(location.pathname === '/', 'Open the fixture dashboard root first.');
    const startedAt = performance.now();
    const session = await (await request('/api/session', { signal: AbortSignal.timeout(8000) })).json();
    assert(session.capabilities.mockChat, 'Run this check only against the local mock fixture.');
    assert(session.capabilities.canReply, 'The mock staff session must be able to reply.');

    const originalTicketId = '120000000000000100';
    const listGate = deferred();
    const listStarted = deferred();
    const replyGates = [deferred(), deferred()];
    const replies = [];
    let captureList = false;
    let initialListLoaded = false;
    let listGateUsed = false;
    let listRequests = 0;
    let abortedListRequests = 0;
    let replyCalls = 0;
    let releaseListGate = () => listGate.resolve();
    const createTicket = async () => {
        const response = await request('/api/mock/tickets', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json', Origin: location.origin, 'X-CSRF-Token': session.csrfToken },
            body: '{}',
        });
        assert(response.status === 201, 'Mock ticket creation failed.');
        return (await response.json()).threadId;
    };
    const setDraft = (input, value) => {
        Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const submitEnter = input => input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));

    window.fetch = async (resource, options) => {
        const url = requestUrl(resource);
        const method = (options?.method || resource?.method || 'GET').toUpperCase();
        if (captureList && method === 'GET' && url.pathname === '/api/tickets') {
            listRequests++;
            const signal = options?.signal;
            if (signal) {
                if (signal.aborted) abortedListRequests++;
                else signal.addEventListener('abort', () => { abortedListRequests++; }, { once: true });
            }
            if (!listGateUsed) {
                listGateUsed = true;
                listStarted.resolve();
                if (signal) {
                    let onAbort;
                    const aborted = new Promise(resolve => {
                        onAbort = resolve;
                        signal.addEventListener('abort', onAbort, { once: true });
                    });
                    await Promise.race([listGate.promise, aborted]);
                    signal.removeEventListener('abort', onAbort);
                } else await listGate.promise;
            }
        }
        if (method === 'POST' && url.pathname.endsWith('/reply')) {
            const body = JSON.parse(options?.body || '{}');
            const index = replyCalls++;
            const response = await request(resource, options);
            if (response.ok && index < replyGates.length) {
                const result = await response.clone().json();
                replies[index] = { messageId: result.messageId, clientNonce: body.clientNonce };
                await replyGates[index].promise;
            }
            return response;
        }
        const response = await request(resource, options);
        if (!captureList && method === 'GET' && url.pathname === '/api/tickets' && url.searchParams.get('status') === 'all' && url.searchParams.get('sort') === 'updated') initialListLoaded = true;
        return response;
    };

    try {
        history.pushState({}, '', '/?status=all&type=all&sort=updated');
        window.dispatchEvent(new PopStateEvent('popstate'));
        await until(() => initialListLoaded && [...document.querySelectorAll('[data-ticket-id]')].some(row => row.getBoundingClientRect().height > 0), 'The ticket list did not appear after selecting all statuses and latest update order.');
        await until(() => ![...document.querySelectorAll('[role="status"]')].some(status => status.textContent.includes('Updating results')), 'The initial ticket list did not settle.');
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        window.scrollTo(0, Math.min(680, Math.max(0, document.documentElement.scrollHeight - innerHeight)));
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const visibleRows = () => [...document.querySelectorAll('[data-ticket-id]')].filter(row => {
            const rect = row.getBoundingClientRect();
            return rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
        });
        await until(() => visibleRows().length > 0, 'No ticket row became visible for the anchor check.');
        const savedRows = visibleRows().slice(0, 3);
        const anchor = savedRows[0];
        const anchorTop = anchor.getBoundingClientRect().top;
        const anchorId = anchor.dataset.ticketId;

        captureList = true;
        const firstTicketId = await createTicket();
        await until(() => listGateUsed, 'The first ticket update did not start a list refresh.');
        await listStarted.promise;
        const secondTicketId = await createTicket();
        await pause(250);
        const duringTop = anchor.getBoundingClientRect().top;
        const statusDuringRefresh = [...document.querySelectorAll('[role="status"]')].some(status => status.textContent.includes('Updating results'));
        const gatedRowsPreserved = anchor.isConnected && savedRows.every(row => row.isConnected);
        const statusNoLayoutShift = Math.abs(duringTop - anchorTop) < 2;
        assert(gatedRowsPreserved, 'Rows were replaced while the first list refresh was gated.');
        assert(statusNoLayoutShift, 'The updating status shifted the saved list anchor.');
        assert(statusDuringRefresh, 'The list did not expose its updating status while refresh was pending.');
        assert(listRequests === 1, 'Concurrent ticket revisions were not coalesced behind the active refresh.');

        releaseListGate();
        await until(() => [anchorId, firstTicketId, secondTicketId].every(id => [...document.querySelectorAll('[data-ticket-id]')].some(row => row.dataset.ticketId === id)), 'The new tickets and retained anchor did not appear after releasing the list refresh.');
        await until(() => ![...document.querySelectorAll('[role="status"]')].some(status => status.textContent.includes('Updating results')), 'The coalesced list refresh did not settle.');
        const finalAnchorTop = anchor.getBoundingClientRect().top;
        const anchorShiftPx = Math.abs(finalAnchorTop - anchorTop);
        assert(anchor.isConnected && anchor.dataset.ticketId === anchorId, 'The original list anchor node was replaced.');
        assert(anchorShiftPx < 2, `The list refresh moved the preserved anchor by ${anchorShiftPx}px (${anchorTop} -> ${finalAnchorTop}, scrollY ${window.scrollY}).`);
        assert(listRequests <= 2, 'More than two list refresh requests were issued for the two revisions.');
        assert(abortedListRequests === 0, 'A list request was aborted during revision coalescing.');
        captureList = false;
        const listReport = {
            elapsedMs: Math.round(performance.now() - startedAt),
            refreshRequests: listRequests,
            abortedRefreshes: abortedListRequests,
            coalesced: true,
            threeTicketsVisible: true,
            preservedRows: gatedRowsPreserved,
            statusNoLayoutShift,
            anchorShiftPx: Number(anchorShiftPx.toFixed(2)),
        };

        history.pushState({}, '', '/tickets/' + originalTicketId);
        window.dispatchEvent(new PopStateEvent('popstate'));
        await until(() => document.querySelector('.ticket-chat') && document.querySelector('#mock-message'), 'The seeded ticket conversation or composer did not open.');
        const region = document.querySelector('[aria-label="Ticket conversation"]');
        const input = document.querySelector('#mock-message');
        await until(() => region.textContent.includes('Support') && region.textContent.includes('Resolved mentioned user'), 'Resolved role and user mentions did not render by name.');
        const mentionsReport = { supportRoleVisible: true, resolvedUserVisible: true };

        const repeatedText = 'Live optimistic duplicate check ' + Date.now();
        const sendOnceAndCheckEcho = async index => {
            const nonceIndex = index;
            const beforeCalls = replyCalls;
            setDraft(input, repeatedText);
            await pause(50);
            submitEnter(input);
            await until(() => !!replies[nonceIndex], 'The staff reply did not reach the mock backend.');
            await until(() => replyCalls > beforeCalls, 'The intercepted staff reply request did not start.');
            const pending = () => [...document.querySelectorAll('[data-pending-message]')].find(row => row.textContent.includes(repeatedText));
            await until(() => pending(), 'The optimistic outgoing message did not render while the HTTP response was gated.');
            const optimistic = pending();
            const sendingStatus = optimistic.querySelector('[role="status"]')?.textContent.includes('Sending');
            const dimmed = Number(getComputedStyle(optimistic).opacity) < 0.7;
            const lacksMessageId = !optimistic.querySelector('[data-message-id]');
            assert(sendingStatus && dimmed && lacksMessageId, 'The optimistic row must be dimmed, show Sending, and have no confirmed message ID.');

            const messageId = replies[index].messageId;
            await until(() => region.querySelector('[data-message-id="' + messageId + '"]'), 'The canonical SSE message did not arrive while the reply acknowledgement was gated.');
            await until(() => !pending(), 'The matching canonical echo did not hide its optimistic row.');
            const canonicalCount = [...region.querySelectorAll('[data-message-id]')].filter(node => node.dataset.messageId === messageId).length;
            assert(canonicalCount === 1, 'The canonical message rendered more than once.');
            assert(typeof replies[index].clientNonce === 'string' && replies[index].clientNonce.length > 0, 'The staff request did not send a client nonce.');
            replyGates[index].resolve();
            await until(() => !input.value, 'The successful reply did not clear its unchanged draft.');
            return { canonicalCount, optimisticSending: true, dimmed, lacksMessageId, echoDeduplicated: true };
        };

        const firstReply = await sendOnceAndCheckEcho(0);
        await until(() => region.querySelector('[data-message-id="' + replies[0].messageId + '"]'), 'The first canonical reply disappeared.');
        const secondReply = await sendOnceAndCheckEcho(1);
        assert(replies[0].messageId !== replies[1].messageId, 'Identical intentional sends must receive distinct message IDs.');
        assert(replies[0].clientNonce !== replies[1].clientNonce, 'Identical intentional sends must use distinct client nonces.');
        const repeatedCanonical = [replies[0].messageId, replies[1].messageId].every(id => region.querySelector('[data-message-id="' + id + '"]'));
        assert(repeatedCanonical, 'Both intentional identical replies must remain visible as separate canonical messages.');
        return {
            list: listReport,
            mentions: mentionsReport,
            replies: {
                first: firstReply,
                second: secondReply,
                identicalTextKeptDistinct: true,
                distinctNonces: true,
                distinctMessageIds: true,
            },
        };
    } finally {
        releaseListGate();
        replyGates.forEach(gate => gate.resolve());
        window.fetch = originalFetch;
    }
}
