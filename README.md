# Bolivian Pal

Proposal website for [Bolivian Pal](https://instagram.com/bolivianpal) — an adventure tourism business in La Paz, Bolivia run by Ivan Daynor.

Client proposes a site-for-photos trade: Ash builds and delivers this site; in exchange gets to shoot the tours (mountaineering, Death Road, Cholitas wrestling, Uyuni, Amazon) for use as portfolio work and to replace the current Unsplash placeholders.

## Stack

Flat static — HTML + Tailwind (CDN) + vanilla JS. No build step.

- `index.html` — all page structure, EN copy inline
- `styles.css` — custom CSS beyond Tailwind (grain, marquee, modal, reveal)
- `translations.js` — EN/ES dictionary + full experience detail data
- `main.js` — nav, language toggle, experience modal, filters, scroll reveal

## Language toggle

`data-i18n="key"` attributes on every translatable element. JS swaps `textContent` on toggle and persists choice in `localStorage`. To add a third language (FR, PT, etc.), add a new key to `window.TRANSLATIONS` and a new `<button data-lang="xx">` in nav.

## Experience modals

Click any experience card → modal opens with itinerary, what-to-bring, inclusions/exclusions, and a WhatsApp deep-link pre-filled per tour. All copy lives in `window.EXPERIENCE_DATA` in `translations.js`.

## Contact

Single primary CTA throughout: WhatsApp `+591 75492774` (`wa.me/59175492774`), pre-filled with context-appropriate message. Secondary: Instagram `@ivan.daynor`, `@bolivianpal`, email `bolivanpal@gmail.com`.

## Photos

Current images are Unsplash placeholders. Once Ash shoots original material, swap:

- `index.html` — nine `<img src="https://images.unsplash.com/...">` tags in the experience grid + hero + about
- `translations.js` — `EXPERIENCE_DATA[*].image` for modal hero images
