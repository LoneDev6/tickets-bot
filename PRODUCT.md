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
- Encrypted on-disk archive of conversation pages already read, with no automatic expiry after ticket closure, locking or archiving. Existing records with a 30-day expiry are migrated before startup expiry checks; deleting a Discord thread immediately deletes its conversation and description, with residual deleted-ticket metadata expiring after 30 days. No new automatic full-history import. Opt-out, erasure and purge continue to prevent resurrection. Content collection uses an optional backend-only Discord Reader on demand, or direct bot reads after Message Content approval. WEB_CHAT_ENABLED is independently false by default. Staff can close, close and lock, reopen and escalate through the web app; replies remain Discord webhook/app messages and the user authorized enabling WEB_REPLIES_ENABLED for this deployment; the installation default remains false.
- Ticket detail shows the collapsible, default-closed Initial message and metadata card above the chat. Conversation history remains paginated in batches of 20 with automatic loading of older messages. List/chat refreshes coalesce: a newer revision does not abort useful in-flight work, and the visible window/anchor remains stable. Staff reply composer is available when authorized and enabled; sends show dimmed pending, Sent or Failed previews and require manual retry after failure. An optional UUIDv4 client nonce links the saved reply; it is not persisted for text-based matching.
- Reader pages are persisted in one SQLite transaction, encrypted at rest; a rollback restores touched cache entries and revision. A successful page commit emits one change event. The internal mentions lookup accepts at most four user/role IDs total, validates and rechecks staff and ticket access, returns cached snapshots immediately, and resolves member names in the background with bounded concurrency and failure cooldown.
- Dashboard and public privacy policy are in English. UTC daily aggregate counters contain no identifiers or content, are retained for 730 days and support daily, Monday-week and calendar-month API summaries.
- Cloudflared can be supervised by Node if the hosting permits a portable executable and outbound connections.
- No fake ticket data in production. Unknown deployment domain, hosting region and provider backup guarantees remain explicit setup requirements.

## Success

Staff can filter every retained ticket state, inspect the old card data, and open Discord in a new tab. Live state updates agree with the single Discord count. Unauthorized API access fails, stored private payloads are encrypted, and exclusion/deletion/retention are enforced.
