# maldorne.org Design Guidelines

Retro gaming association blog. English language. MUDs, roguelikes, game development.

## Design Philosophy

Sharp edges everywhere. No rounded corners on any element. The design uses straight lines, 90-degree angles, and angled clip-paths for visual interest instead of curves.

## Color Scheme

| Role                  | Value     |
| --------------------- | --------- |
| Background            | `#fff`    |
| Font (body)           | `#363636` |
| Font secondary (meta) | `#767676` |
| Post content color    | `#545454` |
| Accent / link hover   | `#2d96bd` |
| Post link             | `#2d96bd` |
| Post meta             | `#696969` |
| Border                | `#e8e8e8` |
| Code font             | `#c7254e` |
| Code background       | `#f8f5ec` |

No dark mode.

### Category Color Schemes

Posts in specific categories get full-width dark backgrounds with their own color scheme:

| Color        | Hexagon (cool)     | Capital City (warm) |
| ------------ | ------------------ | ------------------- |
| Primary (bg) | `#183B3F`          | `#1E2A3A`           |
| Accent       | `#81D8D9`          | `#E8B84B`           |
| Text         | `rgb(246,240,228)` | `rgb(246,240,228)`  |

## Typography

| Role     | Font                           |
| -------- | ------------------------------ |
| Body     | Source Sans Pro (sans-serif)    |
| Headings | IvyMode (display, self-hosted) |
| Title    | IvyMode (display)              |
| Alt/Nav  | Source Sans Pro                 |

IvyMode is a high-contrast sans-serif display font by Jan Maack (The Ivy Foundry). Self-hosted in `source/fonts/IvyMode/` as woff2 + woff. Used for post titles, content headings (h2-h6), and archive section titles.

## Corners and Borders

Everything uses sharp corners (border-radius: 0):
- Images in post content
- Code blocks (inline and figure.highlight)
- Video player (.plyr)
- Miniblog post cards
- Category mobile badges
- Tooltips
- Dropdown menus

No element in maldorne should have rounded corners.

## Header

- Desktop: horizontal navbar with logo icon + "House of Maldorne" text + menu items (Archive, Docs dropdown, Games, Play, About)
- Docs has a dropdown with grouped sections (PROGRAMMING, GAMES headers in uppercase/small + indented sub-links)
- Dropdown uses `<button>` elements with `aria-expanded`
- Mobile: hamburger icon (3 spans, absolute positioning, transforms to symmetric X), vertical menu with touch-friendly padding

## Footer

Shows site title. Plyr video player loads conditionally (only when `.js-player` elements exist).

## Navigation

- Desktop: flex row navbar with dropdown support
- Dropdown: grouped headers (uppercase, small, secondary color) + indented links, subtle border separators
- Mobile: full-width menu, dropdown sections indented (32px headers, 44px links)
- All interactive elements use semantic `<button>` instead of `<div onclick>`

## Home Page

Profile section with:
- Avatar image (SVG logo) with hover animation
- Site description from i18n file
- Social icon links (Archive, Twitter, LinkedIn, GitHub)
- `height: auto` and `margin-bottom: 2em` on mobile

## Post Layout

- Post titles with `#` prefix marker in verdana font, positioned absolute to the left
- IvyMode for title and headings
- Post meta: 0.93em, letter-spacing 0.02em, line-height 1.5em, margin-top -5px
- Author links use `config.authors` system (links to neverbot.com)
- Images: no border-radius, block display
- Code blocks: no border-radius
- Image captions: centered, 0.85em, uses `img ~ em` selector
- Miniblog posts: bordered cards with sharp corners, `#` as permalink link (not pseudo-element)
  - Desktop: `#` positioned absolute to the left of the card
  - Mobile: `#` inline with `float: left`, 1.5em, within the card, reduced padding

## Category Posts (Hexagon / Capital City)

- Full-width dark background that breaks out of the centered container (`width: 100vw`, `margin-left: 50%`, `transform: translateX(-50%)`)
- Angled edges via `clip-path: polygon(0 30px, 100% 0, 100% calc(100% - 30px), 0 100%)` — straight diagonal lines, not curves
- Mobile: clip-path disabled, posts get left/right padding instead
- Category icon: 60x60px in a white square with 10px padding (`background-origin: content-box`), positioned to the left of content area
  - Icon top edge aligns with the visual top of the title's capital letters
- Tooltip below icon on hover: dark background, text "This is a post about the [category name]", arrow pointing up
  - Arrow is not visible on dark post backgrounds (dark on dark) — this is acceptable
- Mobile: icon hidden, replaced by text badge (uppercase, sharp corners, category accent color)
- All text colors overridden for dark background (title, meta, content, links, code, blockquotes)
- Between consecutive category posts: no extra transition needed, backgrounds are continuous

## Comments

Giscus (GitHub Discussions). Theme set to `light` (not `preferred_color_scheme`).

## i18n

The theme supports English and Spanish via language files. Navigation labels use i18n keys (`nav.archive`, `nav.docs.name`, etc.).

## Unique Features

- IvyMode display font for headings
- Sharp corners design system (no border-radius anywhere)
- Full-width category post sections with angled diagonal edges
- Category icon in white square with tooltip (desktop) / badge (mobile)
- Dropdown navbar with grouped sections
- Bilingual support (en/es)
- Plyr video player (conditional loading from CDN 3.8.4)
- DGD documentation generation before build (netlify.toml command)
- `document.ready` polyfill removed — all JS uses native `DOMContentLoaded`
- Semantic HTML: `<button>` for actions, `<time>` for dates, `<main>` landmark
