# maldorne.org Design Guidelines

Retro gaming association blog. English language. MUDs, roguelikes, game development.

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

See `/docs/category-wave-edge-effect.md` in the workspace root for technical details on the wave edge transition.

## Typography

| Role     | Font                           |
| -------- | ------------------------------ |
| Body     | Source Sans Pro (sans-serif)   |
| Headings | IvyMode (display, self-hosted) |
| Title    | IvyMode (display)              |
| Alt/Nav  | Source Sans Pro                |

IvyMode is a high-contrast sans-serif display font. Self-hosted in `source/fonts/IvyMode/` as woff2 + woff. Used for post titles, content headings (h2-h6), and archive section titles.

## Header

- Desktop: horizontal navbar with logo icon + "House of Maldorne" text + menu items (Archive, Docs dropdown, Games, Play, About)
- Docs has a dropdown with grouped sections (PROGRAMMING, GAMES headers + sub-links)
- Dropdown uses `<button>` elements with `aria-expanded`
- Mobile: hamburger icon (3 spans, absolute positioning, transforms to symmetric X), vertical menu

## Footer

Shows site title. Plyr video player loads conditionally.

## Navigation

- Desktop: flex row navbar with dropdown support
- Dropdown redesigned with grouped headers (uppercase, small, secondary color) + indented links
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
- Images: `border-radius: 9px`
- Code blocks: `border-radius: 9px`
- Image captions: centered, 0.85em, uses `img ~ em` selector
- Miniblog posts: bordered cards, `#` as permalink link (not pseudo-element)
  - Desktop: `#` positioned absolute to the left of the card
  - Mobile: `#` inline with `float: left`, 1.5em, within the card

## Category Posts (Hexagon / Capital City)

- Full-width dark background that breaks out of the centered container
- SVG clip-path wave edges (objectBoundingBox units, consistent across viewport sizes)
- Category icon: 60x60px, positioned to the left of content area in desktop
- Tooltip on icon hover: centered below with arrow, dark background
- Mobile: icon hidden, replaced by text badge (uppercase pill)
- All text colors overridden for dark background (title, meta, content, links, code, blockquotes)

## Comments

Giscus (GitHub Discussions). Theme set to `light`.

## i18n

The theme supports English and Spanish via language files. Navigation labels use i18n keys (`nav.archive`, `nav.docs.name`, etc.).

## Unique Features

- IvyMode display font for headings
- Full-width category post sections with wave edge transitions
- Category icon with tooltip (desktop) / badge (mobile)
- Dropdown navbar with grouped sections
- Bilingual support (en/es)
- SVG clip-path for organic edges between post sections
- Plyr video player (conditional loading from CDN)
- DGD documentation generation before build (`build.sh`)
