const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

test('mock development serves React and isolated fake sign-in with protected actions', { timeout: 40_000 }, async t => {
    const child = spawn(process.execPath, [path.join(__dirname, 'ui-fixture.js'), '--dev'], {
        cwd: path.join(__dirname, '..'),
        env: { ...process.env, NODE_ENV: 'development', UI_FIXTURE_PORT: '0' },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    t.after(async () => {
        if (child.exitCode !== null || child.signalCode !== null) return;
        const exited = once(child, 'exit');
        const timer = setTimeout(() => child.kill('SIGKILL'), 5_000);
        child.kill('SIGTERM');
        try { await exited; } finally { clearTimeout(timer); }
    });
    const ready = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`Mock startup timed out: ${output.slice(-2000)}`)), 25_000);
        child.once('error', error => { clearTimeout(timer); reject(error); });
        child.once('exit', code => { clearTimeout(timer); reject(new Error(`Mock exited (${code}): ${output.slice(-2000)}`)); });
        child.stderr.on('data', chunk => { output = (output + chunk).slice(-8000); });
        let lines = '';
        child.stdout.on('data', chunk => {
            output = (output + chunk).slice(-8000);
            lines += chunk;
            let end;
            while ((end = lines.indexOf('\n')) >= 0) {
                const line = lines.slice(0, end); lines = lines.slice(end + 1);
                if (!line.startsWith('{')) continue;
                try {
                    const data = JSON.parse(line);
                    if (data.url && data.pid) { clearTimeout(timer); resolve(data); }
                } catch { /* Vite log lines are not the ready record. */ }
            }
        });
    });
    const request = (route, options) => fetch(`${ready.url}${route}`, options);
    const html = await (await request('/')).text();
    assert.match(html, /\/@vite\/client/);
    assert.equal((await request('/api/session')).status, 401);

    const login = await request('/auth/discord', { redirect: 'manual' });
    assert.equal(login.status, 302);
    assert.equal(login.headers.get('location'), '/');
    const cookie = login.headers.getSetCookie().map(value => value.split(';')[0]).join('; ');
    const session = await (await request('/api/session', { headers: { Cookie: cookie } })).json();
    assert.equal(session.user.username, 'Synthetic staff');
    assert.equal(session.capabilities.mockChat, true);
    assert.equal(session.capabilities.canReply, true);
    const list = await (await request('/api/tickets?status=all&pageSize=100', { headers: { Cookie: cookie } })).json();
    assert.equal(list.tickets.length, 32);
    assert(new Set(list.tickets.map(ticket => ticket.description)).size > 1);
    assert(list.tickets.some(ticket => ticket.lastMessageAt && ticket.lastMessageAt !== ticket.updatedAt));

    const chatPath = '/api/tickets/120000000000000100/messages';
    let page = await (await request(chatPath, { headers: { Cookie: cookie } })).json();
    const messages = [...page.messages];
    const threadTicket = list.tickets.find(ticket => ticket.threadId === '120000000000000100');
    assert.equal(threadTicket.lastMessageAt, page.messages[0].createdAt);
    while (page.nextBefore) {
        page = await (await request(`${chatPath}?before=${page.nextBefore}`, { headers: { Cookie: cookie } })).json();
        messages.push(...page.messages);
    }
    assert(messages.length > 50);
    assert(messages.some(message => /\*\*Bold\*\*/.test(message.content)));
    assert(messages.some(message => message.replyTo));
    assert(messages.some(message => message.reactions?.length));
    assert(messages.some(message => message.embeds?.[0]?.fields?.some(field => field.inline)));
    assert(messages.some(message => message.attachments?.some(file => file.name === 'example-log.txt')));
    for (const authorId of new Set(messages.map(message => message.authorId))) {
        const profiles = messages.filter(message => message.authorId === authorId).map(message => JSON.stringify([message.authorName, message.authorAvatarUrl, message.bot]));
        assert.equal(new Set(profiles).size, 1, 'a Discord author must keep the same mock identity across messages');
    }
    const download = await request('/fixture/example-log.txt');
    assert.equal(download.status, 200);
    assert.match(await download.text(), /Synthetic example log/);

    const send = (body, extraHeaders = {}) => request('/api/mock/tickets/120000000000000100/messages', {
        method: 'POST', headers: { Cookie: cookie, Origin: ready.url, 'X-CSRF-Token': session.csrfToken, 'Content-Type': 'application/json', ...extraHeaders },
        body: JSON.stringify(body),
    });
    assert.equal((await send({ content: '   ' })).status, 400);
    assert.equal((await send({ content: 'x'.repeat(2001) })).status, 400);
    assert.equal((await send({ content: 'Invalid sender', sender: 'bot' })).status, 400);
    assert.equal((await send({ content: 'Invalid origin' }, { Origin: 'https://untrusted.invalid' })).status, 403);
    assert.equal((await send({ content: 'Invalid token' }, { 'X-CSRF-Token': 'invalid' })).status, 403);
    const sentResponse = await send({ content: 'Synthetic staff reply' });
    assert.equal(sentResponse.status, 201);
    const sent = (await sentResponse.json()).message;
    assert.equal(sent.content, 'Synthetic staff reply');
    assert.equal(sent.authorId, session.user.id);
    assert.equal(sent.authorName, 'Synthetic staff');
    assert.equal(sent.webhookId, '120000000000000009');
    assert.equal(sent.staffAuthorId, session.user.id);
    assert.equal(sent.bot, true);
    const deadline = Date.now() + 4_500;
    let incoming;
    while (Date.now() < deadline && !incoming) {
        const current = await (await request(chatPath, { headers: { Cookie: cookie } })).json();
        assert(current.messages.some(message => message.id === sent.id), 'staff message should be persisted');
        incoming = current.messages.find(message => message.authorId !== sent.authorId && message.createdAt > sent.createdAt);
        if (!incoming) await new Promise(resolve => setTimeout(resolve, 150));
    }
    assert(incoming, 'expected the delayed synthetic requester reply');
    const requesterResponse = await send({ content: 'Synthetic requester message', sender: 'requester' });
    assert.equal(requesterResponse.status, 201);
    assert.equal((await requesterResponse.json()).message.content, 'Synthetic requester message');

    const action = origin => request('/api/tickets/120000000000000100/actions', {
        method: 'POST', headers: { Cookie: cookie, Origin: origin, 'X-CSRF-Token': session.csrfToken, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'close-lock', reason: 'Synthetic local check' }),
    });
    assert.equal((await action('https://untrusted.invalid')).status, 403);
    const updated = await action(ready.url);
    assert.equal(updated.status, 200);
    assert.equal((await updated.json()).ticket.status, 'locked');
    assert.equal((await send({ content: 'Ticket is closed' })).status, 409);

    const external = fs.mkdtempSync(path.join(os.tmpdir(), 'tickets-mock-private-'));
    t.after(() => fs.rmSync(external, { recursive: true, force: true }));
    fs.writeFileSync(path.join(external, 'private.txt'), 'synthetic private sentinel');
    const outside = await request(`/@fs/${path.join(external, 'private.txt')}`);
    assert([403, 404].includes(outside.status));
    assert(!(await outside.text()).includes('synthetic private sentinel'));

    assert.equal((await request('/auth/logout', { method: 'POST', headers: { Cookie: cookie, Origin: ready.url, 'X-CSRF-Token': session.csrfToken } })).status, 204);
    assert.equal((await request('/api/session', { headers: { Cookie: cookie } })).status, 401);
});
