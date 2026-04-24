# Bolivian Pal

Proposal website for [Bolivian Pal](https://instagram.com/bolivianpal) — an adventure tourism business in La Paz, Bolivia run by Ivan Daynor.

Client proposes a site-for-photos trade: Ash builds and delivers this site; in exchange gets to shoot the tours (mountaineering, Death Road, Cholitas wrestling, Uyuni, Amazon) for use as portfolio work and to replace the current stock placeholders.

## Stack

Flat static — HTML + Tailwind (CDN) + vanilla JS. No build step.

## Pages

```
index.html          — home: hero, about teaser, featured tours, tips teaser, contact CTA
experiences.html    — all 9 experiences with modal briefs
gallery.html        — 10 stock mountain images with lightbox
la-paz.html         — insider tips (cable car, food, museums, viewpoints)
contact.html        — full contact + expanded about Ivan
```

## Shared files

- `components.js` — nav + footer rendered into every page via `<div id="nav-mount" data-page="X">` and `<div id="footer-mount">`
- `translations.js` — EN/ES dictionary + experience modal data
- `main.js` — nav scroll state, language toggle, mobile nav, filters, experience modal, gallery lightbox, image fallback
- `styles.css` — custom CSS beyond Tailwind (grain, marquee, modal, reveal)

## Language toggle

`data-i18n="key"` attributes on every translatable element. JS swaps `textContent` on toggle and persists choice in `localStorage`. To add a third language (FR, PT, etc.), add a new key to `window.TRANSLATIONS` and a new `<button data-lang="xx">` in `components.js::renderNav`.

## Experience modals

Click any experience card → modal opens with itinerary, what-to-bring, inclusions/exclusions, and a WhatsApp deep-link pre-filled per tour. Also supports direct linking — `experiences.html#huayna` opens Huayna Potosí's modal on load.

## Gallery lightbox

Click any gallery tile → fullscreen lightbox with prev/next arrows and keyboard (← → Esc).

## Image fallback

Every `<img>` with `data-fallback` automatically falls back to `picsum.photos` seeded by its alt text if the primary source fails. Ensures nothing ever shows as a broken icon.

## Contact

Single primary CTA throughout: WhatsApp `+591 75492774` (`wa.me/59175492774`), pre-filled with context-appropriate message per tour. Secondary: Instagram `@ivan.daynor`, `@bolivianpal`, email `bolivanpal@gmail.com`.

## Photos to swap later

Everything in `/index.html`, `/experiences.html`, `/gallery.html`, `/contact.html` with an `<img data-fallback>` tag. Also `EXPERIENCE_DATA[*].image` in `translations.js` (modal hero images).

## Deploy

GitHub Pages — auto-deploys from `main` branch. Live at `https://ashdabash2926.github.io/bolivian-pal/`.
