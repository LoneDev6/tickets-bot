// Paste into DevTools on the local synthetic fixture dashboard root, then run
// await verifyProgressiveTicketChat(). The ticket must have 64 fixture messages.
async function verifyProgressiveTicketChat() {
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
    const until = async (predicate, message) => {
        const end = Date.now() + 8000;
        while (Date.now() < end) { if (await predicate()) return; await pause(40); }
        throw new Error(message);
    };
    const requestUrl = resource => new URL(typeof resource === 'string' ? resource : resource.url, location.href);
    const originalFetch = window.fetch;
    const request = originalFetch.bind(window);
    const startedAt = performance.now();
    const sessionResponse = await request('/api/session', { signal: AbortSignal.timeout(8000) });
    const session = await sessionResponse.json();
    assert(session.capabilities.mockChat, 'Run this check only against the local mock fixture.');
    assert(location.pathname === '/', 'Open the local fixture dashboard root first.');

    const ticketId = '120000000000000100';
    const endpoint = `/api/tickets/${ticketId}/messages`;
    let releaseRefresh;
    const refreshGate = new Promise(resolve => { releaseRefresh = resolve; });
    let refreshHeld = false;
    let refreshDidStart = false;
    let cachePassed = false;
    let cachedUrl;
    let refreshUrl;
    let olderUrl;
    let olderInFlight = 0;
    let maxOlderInFlight = 0;
    let olderRequests = 0;
    let olderResolve;
    let firstPaintMs = null;
    let initialCount = 0;
    let midRefreshCount = 0;

    window.fetch = async (resource, options) => {
        const url = requestUrl(resource);
        if (url.pathname !== endpoint) return request(resource, options);
        const cached = url.searchParams.get('cached') === '1';
        const before = url.searchParams.get('before');
        if (cached) {
            cachedUrl = url;
            const response = await request(resource, { ...options, signal: options?.signal ?? AbortSignal.timeout(8000) });
            cachePassed = true;
            return response;
        }
        if (!before && !refreshHeld) {
            refreshUrl = url;
            refreshHeld = true;
            refreshDidStart = true;
            await refreshGate;
            return request(resource, { ...options, signal: options?.signal ?? AbortSignal.timeout(8000) });
        }
        if (before) {
            olderUrl = url;
            olderRequests++;
            olderInFlight++;
            maxOlderInFlight = Math.max(maxOlderInFlight, olderInFlight);
            try {
                const response = await request(resource, { ...options, signal: options?.signal ?? AbortSignal.timeout(8000) });
                olderResolve?.();
                return response;
            } finally { olderInFlight--; }
        }
        return request(resource, { ...options, signal: options?.signal ?? AbortSignal.timeout(8000) });
    };

    try {
        // The target is the oldest Generic fixture; showing all Generic tickets keeps it on page one.
        const dashboardQuery = new URLSearchParams(location.search);
        if (dashboardQuery.get('status') !== 'all' || dashboardQuery.get('type') !== 'Generic' || dashboardQuery.get('sort') !== 'created') {
            history.replaceState({}, '', '/?status=all&type=Generic&sort=created');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
        await until(() => {
            const link = [...document.querySelectorAll('a[href]')].find(anchor => {
                try { return new URL(anchor.href, location.href).pathname === `/tickets/${ticketId}`; } catch { return false; }
            });
            if (!link) return false;
            link.click();
            return true;
        }, `Fixture ticket ${ticketId} is missing from the dashboard after filtering to Generic tickets.`);
        await until(() => location.pathname === `/tickets/${ticketId}`, 'Fixture ticket conversation did not open.');
        await until(() => refreshDidStart, 'Normal first-page refresh request did not start.');
        await until(() => {
            const conversation = document.querySelector('[aria-label="Ticket conversation"]');
            return cachePassed && conversation?.querySelectorAll('[data-message-id]').length >= 20;
        }, 'Cached first page did not render while refresh was blocked.');
        const region = document.querySelector('[aria-label="Ticket conversation"]');
        const transcript = region?.querySelector('discord-messages');
        assert(region && transcript, 'Ticket conversation transcript is missing.');
        const details = document.querySelector('details.post-details-disclosure');
        const detailsToggle = details?.querySelector('summary');
        const detailsBody = details?.querySelector('#initial-message-details');
        assert(detailsToggle && detailsBody, 'Collapsible ticket context is missing.');
        assert(!details.open && detailsToggle.textContent.includes('Ticket details & management'), 'Ticket context must start collapsed.');
        assert(details.getBoundingClientRect().top < region.getBoundingClientRect().top, 'Ticket context must be above the conversation.');
        const composer = document.querySelector('#mock-message');
        detailsToggle.click();
        await until(() => details.open, 'Ticket context did not expand.');
        assert(detailsBody.textContent.includes('Created') && detailsBody.textContent.includes('Content excluded'), 'Ticket metadata was lost when collapsed.');
        detailsToggle.click();
        await until(() => !details.open, 'Ticket context did not collapse.');
        assert(region.isConnected && composer === document.querySelector('#mock-message'), 'Toggling details must preserve the chat and composer nodes.');

        firstPaintMs = performance.now() - startedAt;
        initialCount = region.querySelectorAll('[data-message-id]').length;
        assert(initialCount === 20, `Expected 20 cached messages, got ${initialCount}.`);
        assert(refreshHeld, 'Normal refresh request was not held.');
        const statusVisible = () => document.body.innerText.includes('Refreshing messages…');
        await until(statusVisible, 'Visible “Refreshing messages…” status is missing during sync.');
        const olderControl = [...document.querySelectorAll('button')].find(button => /^(Load older messages|Loading older messages…)$/.test(button.textContent.trim()));
        assert(olderControl, 'Keyboard-accessible “Load older messages” fallback is missing.');
        assert(olderControl.tabIndex >= 0 && olderControl.tagName === 'BUTTON', 'Older history fallback must be keyboard accessible.');
        assert(cachedUrl?.searchParams.get('limit') === '20', 'Cached request must use limit=20.');
        assert(refreshUrl?.searchParams.get('limit') === '20' && !refreshUrl.searchParams.has('before') && !refreshUrl.searchParams.has('cached'),
            'Refresh request must be a normal first-page request with limit=20.');

        const originalRefreshStart = firstPaintMs;
        const messageNodes = [...region.querySelectorAll('[data-message-id]')];
        const oldCount = messageNodes.length;
        const controlDisabledDuringRefresh = olderControl.disabled;
        assert(controlDisabledDuringRefresh, 'Older history control must be disabled while refreshing.');
        midRefreshCount = oldCount;
        releaseRefresh();
        await until(() => !statusVisible(), 'Refresh status did not clear after releasing the normal request.');

        const beforeRequests = olderRequests;
        let resolveOlder;
        const olderRequested = new Promise(resolve => { resolveOlder = resolve; });
        olderResolve = resolveOlder;
        region.scrollTop = 0;
        region.dispatchEvent(new Event('scroll'));
        const anchor = [...region.querySelectorAll('[data-message-id]')].find(node => node.getBoundingClientRect().bottom > region.getBoundingClientRect().top);
        assert(anchor, 'Could not find a visible reading anchor at transcript top.');
        const anchorOffset = () => anchor.getBoundingClientRect().top - region.getBoundingClientRect().top;
        const anchorBefore = anchorOffset();
        await until(() => olderRequests > beforeRequests, 'Scrolling to the top did not request older history.');
        const olderRequest = olderUrl;
        assert(olderRequest, 'Older-page request URL was not captured.');
        assert(olderRequest.searchParams.get('limit') === '20', 'Older-page request must use limit=20.');
        assert(olderRequest.searchParams.get('before'), 'Older-page request must include a before cursor.');
        await until(() => region.querySelectorAll('[data-message-id]').length === 40, 'Older page did not increase the transcript to 40 messages.');
        await pause(100);
        assert(maxOlderInFlight === 1, `Older-page requests were not serial (max in flight ${maxOlderInFlight}).`);
        assert(olderRequests === beforeRequests + 1, `Expected one automatic older request, got ${olderRequests - beforeRequests}.`);
        assert(anchor.isConnected && Math.abs(anchorOffset() - anchorBefore) <= 2, 'Older history load moved the reading anchor by more than 2px.');
        assert(await Promise.race([olderRequested.then(() => true), pause(100).then(() => false)]), 'Older-page request did not complete.');
        assert(document.documentElement.scrollWidth <= innerWidth, 'The page overflows horizontally.');

        return {
            firstPaintMs: Math.round(originalRefreshStart),
            counts: { cachedWhileRefreshBlocked: midRefreshCount, afterOlder: region.querySelectorAll('[data-message-id]').length },
            serialOlder: { requests: olderRequests, maxInFlight: maxOlderInFlight, limit: Number(olderRequest.searchParams.get('limit')) },
            anchor: { before: Math.round(anchorBefore * 100) / 100, after: Math.round(anchorOffset() * 100) / 100, preservedWithinPx: 2 },
            viewport: { width: innerWidth, height: innerHeight, pageWidth: document.documentElement.scrollWidth },
        };
    } finally {
        releaseRefresh?.();
        window.fetch = originalFetch;
    }
}
