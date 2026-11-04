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

The panel is Operate: scan tickets, filter, read details, open Discord. Privacy is Read. Use Italian product copy, accessible labels and text statuses.

## Colors

Use the generated neutral theme in `web/src/index.css`, including its semantic destructive, muted, border and focus-ring tokens. Do not add a palette.

## Typography

Use the scaffold's Geist Variable font and shadcn text utilities. Dates use the Italian locale; historical unknown values are explicit.

## Layout

Use a table on desktop and the same information in a compact list on narrow viewports. Filters, status tabs, pagination and detail remain keyboard accessible. Mobile tabs wrap into a grid within their container.

## Elevation & Depth

Use the generated Card, Alert and overlay defaults.

## Shapes

Use the generated radius tokens without custom silhouettes.

## Components

Official registry primitives live in `web/src/components/ui/`; compose them in `App.tsx`. Keep generated primitives unchanged. Include loading, empty, error and disabled states. Failed filtered requests hide stale rows and offer retry. Conversation and web management controls remain disabled until the relevant capabilities exist.

## Do's and Don'ts

Use Italian copy, accessible status text, and explicit new-tab Discord link labels. No charts, marketing, novelty animation, custom illustration, invented summary metrics, or bespoke visual components.

Source authority: shadcn Vite setup, official default theme, component registry and data-table documentation. Runtime checks cover desktop, narrow viewport, empty/error/retry, all statuses, keyboard tabs and disabled conversation using synthetic fixtures. Evidence and limits are recorded in `.tasks/private-tickets-web/STATUS.md`.
