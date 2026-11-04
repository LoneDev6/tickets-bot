# Product

<!-- impeccable:product-schema 1 -->

## Platform

web, backed by the existing Discord bot.

## Stack

Existing CommonJS Node.js, Express and Enmap. The user requires official shadcn/ui components and styles throughout the panel; React/Vite is the build tool for those components. The user delegated implementation decisions and asked to proceed autonomously.

## Users and purpose

The owner and authorized Discord support staff triage private Generic and Payment tickets. They need a complete list, accurate states, details formerly shown in notification cards, and an external Discord link. Other Discord members must not see private tickets through the web app.

## Constraints

- HumbleServers Pterodactyl Node.js container, fixed port 7777; no system installations.
- One persistent Discord open-count message replaces duplicate per-ticket notification cards.
- Public dedicated privacy URL. Deletion contact: info@devs.beer.
- Encrypted conversation archive while open and up to 30 days after closure; content capability and web writes disabled pending Discord authorization.
- Cloudflared can be supervised by Node if the hosting permits a portable executable and outbound connections.
- No fake ticket data in production. Unknown deployment domain, hosting region and provider backup guarantees remain explicit setup requirements.

## Success

Staff can filter every retained ticket state, inspect the old card data, and open Discord in a new tab. Live state updates agree with the single Discord count. Unauthorized API access fails, stored private payloads are encrypted, and exclusion/deletion/retention are enforced.
