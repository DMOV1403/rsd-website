# RSD Website — Draft

A static, brand-aligned draft built from the **RSD Website Proposal (June 2026)**.
Tagline: *Where Vision Builds.*

## Pages
| File | Page | Covers |
|------|------|--------|
| `index.html` | Home | Full-bleed hero, 3-line intro, three sector cards, featured project, contact CTA |
| `about.html` | About | Founding story, vision & mission, core values, founding partners, regions |
| `what-we-do.html` | What We Do | Mining · Investment · Industrial Technology — scope & approach each |
| `projects.html` | Projects | Filterable card grid, sector tags, location/status, expandable cards |
| `contact.html` | Contact | Form (name, company, email, message) + email, phone, address, LinkedIn |

## Brand
Built to the proposal's design direction (page 03):
- **Palette** — Obsidian `#0A0A0A`, Ivory `#FEF9F2`, Pure White `#FAFAFA`; secondary blues Midnight `#080B2B`, Deep Sea `#0A2947`, Royal `#102E80` used at accents/transitions.
- **Type** — Montserrat throughout.
- **Motion** — kept minimal; respects `prefers-reduced-motion`.
- **Voice** — copy follows the four principles: considered, direct, confident, respectful.

Logos in `assets/` (ivory-on-dark for the dark UI, black version available for light contexts).

## How to view
Open `index.html` in a browser, or serve the folder:
```
npx serve .
```

## Before launch — replace placeholders
- [ ] Real **operational photography** (hero + featured project use CSS placeholders)
- [ ] Real **project entries** (current six are layout demos)
- [ ] Founding **partner titles** (and photos if desired)
- [ ] Confirmed **regions** list
- [ ] Live **contact details**: email, phone, office address, LinkedIn URL
- [ ] Wire the **contact form** to email or a form service (currently demo-only)
- [ ] Confirm **domain** (proposal flags `rsd.services` as best value at $9.99/yr)

## Notes / assumptions
Built as plain HTML/CSS/JS (no build step) for an easy handoff and cheap hosting
(the proposal's Hostinger plan serves static sites fine). Content marked
"placeholder" on-page is filler drawn from the proposal's intent — review against
final brand copy before going live.
