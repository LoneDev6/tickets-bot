# Product

<!-- impeccable:product-schema 1 -->

## Platform

web, backed by the existing Discord bot.

## Stack

Existing CommonJS Node.js, Express and Enmap. The user requires official shadcn/ui components and styles throughout the panel; React/Vite is the build tool for those components. The user delegated implementation decisions and asked to proceed autonomously.

## Users and purpose

Discord members with the configured SUPPORT_TEAM_ROLE_ID triage private Generic and Payment tickets. The owner must also hold that role; OWNER_ID is only the escalation recipient. Staff need accurate states, owner search, infinite scrolling, old card details, staff actions and an external Discord link. Other Discord members must not see private tickets through the web app. A separate server-to-server Bearer token grants aggregate statistics only.

## Constraints

- HumbleServers Pterodactyl Node.js container, fixed port 7777; no system installations.
- One persistent Discord open-count message replaces duplicate per-ticket notification cards.
- Public dedicated privacy URL. Deletion contact: info@devs.beer.
- Encrypted conversation archive while open and up to 30 days after closure; content collection remains disabled pending Discord authorization. WEB_CHAT_ENABLED is independently false by default. Staff can close, close and lock, reopen and escalate through the web app; replies remain in Discord.
- Dashboard and public privacy policy are in English. UTC daily aggregate counters contain no identifiers or content, are retained for 730 days and support daily, Monday-week and calendar-month API summaries.
- Cloudflared can be supervised by Node if the hosting permits a portable executable and outbound connections.
- No fake ticket data in production. Unknown deployment domain, hosting region and provider backup guarantees remain explicit setup requirements.

## Success

Staff can filter every retained ticket state, inspect the old card data, and open Discord in a new tab. Live state updates agree with the single Discord count. Unauthorized API access fails, stored private payloads are encrypted, and exclusion/deletion/retention are enforced.
