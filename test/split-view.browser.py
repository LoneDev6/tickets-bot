"""Ticket workspace checks against synthetic data; requires Playwright and a web build."""
import json
import os
from pathlib import Path
import signal
import subprocess
import tempfile
import time
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]

def interrupted(_signal, _frame):
    raise KeyboardInterrupt('Browser test interrupted')
signal.signal(signal.SIGTERM, interrupted)

with tempfile.TemporaryFile(mode='w+') as log:
    fixture = subprocess.Popen(['node', 'test/ui-fixture.js'], cwd=ROOT,
        env={**os.environ, 'NODE_ENV': 'development', 'UI_FIXTURE_CHAT': 'true'},
        stdout=log, stderr=log, start_new_session=True)
    print(f'Fixture PID: {fixture.pid}', flush=True)
    try:
        url = None
        deadline = time.monotonic() + 20
        while not url:
            log.seek(0)
            for line in log.read().splitlines():
                try:
                    url = json.loads(line).get('login')
                    if url: break
                except (ValueError, AttributeError): pass
            if not url and (time.monotonic() > deadline or fixture.poll() is not None):
                log.seek(0)
                raise AssertionError('Fixture failed: ' + log.read()[-1500:])
            if not url: time.sleep(.1)
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            try:
                context = browser.new_context(viewport={'width': 1440, 'height': 1000})
                try:
                    page = context.new_page()
                    errors = []
                    page.on('pageerror', lambda error: errors.append(str(error)))
                    page.goto(url)
                    posts = page.get_by_role('region', name='Tickets', exact=True)
                    detail = page.get_by_role('region', name='Selected ticket', exact=True)
                    links = posts.locator('[data-ticket-link]')
                    expect(links).to_have_count(25)
                    expect(detail.get_by_text('Select a ticket', exact=True)).to_be_visible()
                    divider = page.get_by_role('separator', name='Resize ticket list')
                    box = divider.bounding_box()
                    page.mouse.move(box['x'] + 6, box['y'] + box['height'] / 2)
                    page.mouse.down()
                    page.mouse.move(box['x'] + 70, box['y'] + box['height'] / 2, steps=8)
                    page.mouse.up()
                    expect(divider).to_have_attribute('aria-valuenow', '448')
                    page.reload()
                    expect(divider).to_have_attribute('aria-valuenow', '448')
                    divider.press('Home')
                    expect(divider).to_have_attribute('aria-valuenow', '320')
                    for _ in range(4): divider.press('ArrowRight')
                    expect(divider).to_have_attribute('aria-valuenow', '384')
                    first = links.nth(0).get_attribute('href')
                    second = links.nth(1).get_attribute('href')
                    links.nth(0).click()
                    expect(detail.locator('#mock-message')).to_be_visible()
                    expect(posts).to_be_visible()
                    expect(posts.locator('[aria-current="page"]')).to_have_attribute('href', first)
                    disclosure = detail.locator('details')
                    assert not disclosure.evaluate('(el) => el.open')
                    field = detail.locator('#mock-message')
                    def pinned():
                        rect = field.bounding_box()
                        assert rect and rect['y'] >= 0 and rect['y'] + rect['height'] <= page.viewport_size['height'], rect
                        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
                        return rect['y'] + rect['height']
                    bottom = pinned()
                    disclosure.locator('summary').click()
                    expect(disclosure).to_have_attribute('open', '')
                    assert abs(pinned() - bottom) < 2
                    detail.get_by_role('button', name='Close ticket', exact=True).click()
                    dialog = page.get_by_role('dialog')
                    expect(dialog).to_be_visible()
                    assert dialog.bounding_box()['width'] < 1000
                    dialog.get_by_role('button', name='Cancel', exact=True).click()
                    disclosure.locator('summary').click()
                    detail.locator('.ticket-chat-scroll').evaluate('(el) => el.scrollTop = 0')
                    assert abs(pinned() - bottom) < 2
                    links.nth(1).focus()
                    links.nth(1).press('Enter')
                    expect(posts.locator('[aria-current="page"]')).to_have_attribute('href', second)
                    expect(field).to_be_visible()
                    assert not disclosure.evaluate('(el) => el.open')
                    posts.locator('#ticket-type').select_option('Payment')
                    expect(links).to_have_count(13)
                    expect(detail).to_be_visible()
                    assert '/tickets/' in page.url
                    expect(posts.locator('#ticket-type')).to_have_value('Payment')
                    page.reload()
                    expect(links).to_have_count(13)
                    expect(posts.locator('#ticket-type')).to_have_value('Payment')
                    expect(field).to_be_visible()
                    for width in [1024, 768, 390]:
                        page.set_viewport_size({'width': width, 'height': 844})
                        pinned()
                        if width < 1024:
                            expect(posts).to_be_hidden()
                            expect(divider).to_be_hidden()
                        else: expect(posts).to_be_visible()
                    if os.environ.get('UI_EVIDENCE_DIR'):
                        evidence = Path(os.environ['UI_EVIDENCE_DIR'])
                        page.screenshot(path=str(evidence / 'tickets-mobile.png'))
                    detail.get_by_role('link', name='All tickets', exact=True).click()
                    expect(posts).to_be_visible()
                    expect(posts.locator('#ticket-type')).to_have_value('Payment')
                    page.set_viewport_size({'width': 1440, 'height': 1000})
                    links.nth(0).click()
                    expect(field).to_be_visible()
                    page.emulate_media(color_scheme='dark')
                    page.wait_for_timeout(250)
                    if os.environ.get('UI_EVIDENCE_DIR'):
                        page.screenshot(path=str(evidence / 'tickets-desktop.png'))
                    assert not errors, errors
                    print('PASS: tickets split navigation, resize persistence, filters, disclosure, dialogs, pinned composer, mobile, theme')
                finally: context.close()
            finally: browser.close()
    finally:
        if fixture.poll() is None:
            os.killpg(fixture.pid, signal.SIGTERM)
            try: fixture.wait(timeout=5)
            except subprocess.TimeoutExpired:
                os.killpg(fixture.pid, signal.SIGKILL)
                fixture.wait(timeout=5)
        assert fixture.poll() is not None
