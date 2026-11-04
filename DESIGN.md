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

The panel is Operate: scan tickets with infinite loading, filter by owner, read details, prioritize escalation, apply staff actions and open Discord. Privacy is Read. Use English product copy, accessible labels and text statuses. Infinite loading has a keyboard-accessible Load more fallback and retry that preserves already loaded results.

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

The requested Discord conversation renderer uses Skyra Discord Components and Discord Markdown Parser in a single channel panel with the library's palette, a fixed header, a scrolling transcript and a fixed composer. This Discord surface is the requested exception to the surrounding shadcn styling. Load it only when a conversation is shown. Match the system theme, including Lit descendants when the theme changes. Keep the newest message in view while reading the bottom; preserve the visible message anchor when loading history or receiving updates while scrolled up. New messages and errors overlay the transcript instead of moving the layout. Background refresh uses aria-busy without inserting visible status paragraphs. Keep the same message/composer nodes during updates and never disable the textarea during sending. The composer is shown only with canReply; production requires the explicit replies flag in addition to the chat gates. Staff identity comes from the authenticated Discord member, and webhook posts retain the application badge. Only the mock exposes incoming-message simulation. The composer uses shadcn Textarea/Button controls with Enter to send, Shift+Enter for a newline, an IME guard, bounded multiline height and draft retention on failure or concurrent edits. Unread rows use Tailwind sky-50 in light mode and sky-950/30 in dark mode, plus the text badge Unread. Reading is shared across staff sessions and acknowledges only the latest visible message; without web chat, offer explicit Mark as read beside Open in Discord.

## Do's and Don'ts

Use English copy, accessible status text, and explicit new-tab Discord link labels. No charts, marketing, novelty animation, custom illustration, invented summary metrics, or bespoke visual components.

Source authority: shadcn Vite setup, official default theme, component registry and data-table documentation. Runtime checks cover desktop, narrow viewport, empty/error/retry, all statuses, keyboard tabs and disabled conversation using synthetic fixtures. Evidence and limits are recorded in `.tasks/private-tickets-web/STATUS.md`.
