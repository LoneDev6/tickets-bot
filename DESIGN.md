---
name: LoneDev's Tickets
description: Pannello operativo basato sul registry ufficiale shadcn/ui, radix-nova neutral.
colors:
  primary: "oklch(0.205 0 0)"
  primaryForeground: "oklch(0.985 0 0)"
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  muted: "oklch(0.97 0 0)"
  mutedForeground: "oklch(0.556 0 0)"
  border: "oklch(0.922 0 0)"
typography:
  body:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  base: "0.625rem"
---

# Overview

The user pinned the complete visual system to https://ui.shadcn.com/. This instruction overrides new visual directions, custom palettes, component inventions and concept-choice interviews.

Use official registry components, their default neutral theme, typography and documented dashboard/table patterns. Keep generated primitives unchanged. Layout utilities may arrange them; no custom visual component or decorative stylesheet. Compose an operational table with filters and ticket detail, with official loading, empty, error, disabled and focus treatments.

The panel is Operate: scan tickets with infinite loading, filter by owner, read details, prioritize escalation, apply staff actions and open Discord. Privacy is Read. Use English product copy, accessible labels and text statuses. Infinite loading has a keyboard-accessible Load more fallback and retry that preserves already loaded results. In ticket detail, place the collapsible Initial message and ticket metadata card above the chat, collapsed by default; keep all conversation controls and the existing composer available below it.

## Colors

Use the generated neutral theme in `web/src/index.css`, including its semantic destructive, muted, border and focus-ring tokens. Do not add a palette.

Follow the system light/dark preference with `prefers-color-scheme`, including changes while the page is open. Use the existing official shadcn dark tokens and Tailwind's default dark variant; native controls follow the same preference through the HTML color-scheme metadata.

## Typography

Use the scaffold's Geist Variable font and shadcn text utilities. Dates use the English locale; historical unknown values are explicit.

## Layout

Use a table on desktop and the same information in a compact list on narrow viewports. Filters, status tabs, infinite-loading fallback and detail remain keyboard accessible. Mobile tabs wrap into a grid within their container.

Use the initial message as the list preview, with ellipsis and user-requested hover/focus scrolling; respect reduced motion. The whole row opens details while keeping a normal keyboard-accessible link and allowing text selection. Show requester Avatar with initials when an image is unavailable. Prefer cached Discord names, then saved names and an ID-checked legacy-title fallback.

## Elevation & Depth

Use the generated Card, Alert and overlay defaults.

## Shapes

Use the generated radius tokens without custom silhouettes.

## Components

Official registry primitives live in `web/src/components/ui/`; compose them in `App.tsx`. Keep generated primitives unchanged. Include loading, empty, error and disabled states. Failed filtered requests hide stale rows and offer retry. Staff action Buttons sit beside Open in Discord, wrapping on narrow viewports. Clicking opens the official Dialog at fullscreen size with an optional Textarea reason and explicit confirm/cancel; preserve text on error and restore focus on close. Hide the Conversation section when chat is unavailable or excluded; keep the single new-tab Discord link in the detail header. Show the section only when both server flags permit reading and the ticket is not excluded.

The requested Discord conversation renderer uses Skyra Discord Components and Discord Markdown Parser in a single channel panel with a fixed header, scrolling transcript and fixed composer. This Discord surface is the requested exception to surrounding shadcn styling. Load it only when a conversation is shown. Use Discord dark surfaces `#1a1a1e`, `#121214` header and `#222327` input through supported host styles; do not reach into component shadow DOM. Match the system theme when required. Keep the newest message in view while reading the bottom; preserve the visible message anchor when loading history or receiving updates while scrolled up. Coalesce list/chat refreshes so a newer revision does not abort useful in-flight requests. New messages and errors overlay the transcript instead of moving the layout. Background refresh uses aria-busy without inserting visible status paragraphs. Keep the same message/composer nodes during updates and never disable the textarea during sending. The composer is shown only with canReply; production requires the explicit replies flag in addition to the chat gates. Staff identity comes from the authenticated Discord member, and webhook posts retain the application badge. Optional UUIDv4 clientNonce correlates a preview to the stored message; do not persist it for text matching. Show dimmed Sending, Sent and Failed previews, with manual retry after failure. Only the mock exposes incoming-message simulation. The composer uses shadcn Textarea/Button controls with Enter to send, Shift+Enter for a newline, an IME guard, bounded multiline height and draft retention on failure or concurrent edits. Unread rows use Tailwind sky-50 in light mode and sky-950/30 in dark mode, plus the text badge Unread. Reading is shared across staff sessions and acknowledges only the latest visible message; without web chat, offer explicit Mark as read beside Open in Discord.

## Do's and Don'ts

Use English copy, accessible status text, and explicit new-tab Discord link labels. No charts, marketing, novelty animation, custom illustration, invented summary metrics, or bespoke visual components.

Source authority: shadcn Vite setup, official default theme, component registry and data-table documentation. Runtime checks cover desktop, narrow viewport, empty/error/retry, all statuses, keyboard tabs and disabled conversation using synthetic fixtures. Evidence and limits are recorded in `.tasks/private-tickets-web/STATUS.md`.

## Discord conversation fidelity

Keep Skyra Discord Components 4.0.2 for the live React transcript. The [Derock components](https://github.com/ItzDerock/discord-components) used by [discord-html-transcripts](https://github.com/ItzDerock/discord-html-transcripts) extend the same component family; that exporter generates static HTML with React SSR. [DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter) likewise exports documents rather than providing the live React conversation. Neither supplies a guarantee of pixel parity with every Discord client version.

Revert Tailwind's base reset only on the transcript's custom-element hosts, so the library retains its message spacing, reply indentation, attachment and embed styles. Use 16 px messages, 40 px avatars, grouped authors, theme-aware links and readable reply names. Image attachments retain their aspect ratio, never enlarge small originals, fit both the message column and a 320×288 px preview, and open the original through a keyboard-accessible new-tab link. Use the library's documented custom-image slot instead of reaching into its shadow DOM.

Load gg sans locally from `web/public/fonts`, scoped by the conversation's font family; the surrounding dashboard keeps Geist. Normal weights 400/500/600/700 and italic 400 were obtained from Discord's own public client stylesheet on 2026-11-06: [official stylesheet](https://discord.com/assets/952007.9601106278c99c24.css). Its original asset IDs are `66d715454104d24e`, `b272b33815319bae`, `2df2c3ff74408972`, `189422196a4f8b53`, and `dd24010f3cf7def7`, respectively. These font files remain Discord assets; the library's MIT license does not apply to them. Local delivery avoids third-party font requests and the official asset server's cross-origin restriction.

Keep the transcript to 20 messages per page. On open, render the encrypted cached page before refreshing it from Discord; show the accessible `Refreshing messages…` status in the header while refresh or catch-up is active. Load older history automatically when scrolling to the top, with the keyboard-accessible `Load older messages` button as a fallback. Issue one batch of at most 20 per explicit response, and continue catch-up while the reader reports `syncing`. Preserve the reading anchor when prepending history. Persist a reader page in one SQLite transaction: encrypted records and checkpoints roll back together, and a successful page emits one change event.

The authenticated native Discord audit was isolated and read-only. One actual example with 11 messages, 16 px gg sans and 22 px line height, and six resolved mentions was checked. This is evidence for that example, not a promise of pixel parity across every Discord client feature or API field. Mention lookup is internal to the backend, accepts at most four user/role IDs total, rechecks staff and ticket access, returns cached sparse maps immediately, and resolves names in the background (four concurrent lookups globally, 60-second failure cooldown, 1000-entry bound). Missing names fall back to IDs; role color is included when available. The first preview must not wait for lookup completion.

The reader may provide an optional `avatar_url`, validated to the Discord CDN; the browser loads that image directly. Do not call `userProfiles` for reader messages. Keep the SDK user cache and saved-avatar fallbacks, and persist `openerAvatarUrl` for ticket-list avatars. Preserve webhook staff attribution. Retain rich embed fields and attachment MIME/size supplied by the reader, and show cached reply context without recovering deleted content. Missing upstream fields (including reactions and message components not supplied by this contract) cannot be reconstructed by a renderer.

## Shared staff workspace

Match the forum console: full viewport shell, neutral Geist/shadcn controls, compact stacked list, 384px default sidebar, and a keyboard-accessible draggable separator. Width is 320–720px, leaving at least 480px for detail; localStorage `tickets.postListWidth` preserves it. Both panes remain mounted with independent scrolling; narrow screens show the selected pane. Filters retain selection through a validated `from` query. Details and management use the default-closed disclosure above the flex-height chat, with a scrollable body capped at 45% of the pane. The composer stays at the bottom. Moderation uses standard dialogs; unread colors, selection outlines, date format and focus treatment match the forum.
