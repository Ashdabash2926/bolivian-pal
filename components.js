// Bolivian Pal — shared UI components (nav + footer) injected per page.
// Each page has <div id="nav-mount"></div> and <div id="footer-mount"></div>.

(function () {
  // ============ IMAGE FALLBACK HANDLER ============
  // Any <img data-fallback> that fails falls back to picsum seeded by alt text.
  // Invoked via global handler so it works on JS-rendered + static images alike.
  window.imgFallback = function (img) {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = '1';
    const seed = (img.alt || 'mountain').replace(/[^a-z0-9]+/gi, '').toLowerCase() || 'mountain';
    const w = img.getAttribute('data-w') || 1600;
    const h = img.getAttribute('data-h') || 1000;
    img.src = `https://picsum.photos/seed/${seed}-${w}x${h}/${w}/${h}`;
  };

  // ============ NAV ============
  function renderNav(currentPage) {
    const pages = [
      { id: 'home', href: 'index.html', i18n: 'nav.home', label: 'Home' },
      { id: 'experiences', href: 'experiences.html', i18n: 'nav.experiences', label: 'Experiences' },
      { id: 'gallery', href: 'gallery.html', i18n: 'nav.gallery', label: 'Gallery' },
      { id: 'la-paz', href: 'la-paz.html', i18n: 'nav.tips', label: 'La Paz' },
      { id: 'contact', href: 'contact.html', i18n: 'nav.contact', label: 'Contact' }
    ];
    const links = pages.map(p => `
      <a href="${p.href}" class="hover:text-clay transition-colors ${p.id === currentPage ? 'text-clay' : ''}" data-i18n="${p.i18n}">${p.label}</a>
    `).join('');
    const mobileLinks = pages.map(p => `
      <a href="${p.href}" class="block font-display text-5xl leading-none ${p.id === currentPage ? 'text-clay' : ''}" data-i18n="${p.i18n}">${p.label}</a>
    `).join('');

    return `
      <nav class="fixed top-0 inset-x-0 z-50 transition-all duration-500" id="nav">
        <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-5 flex items-center justify-between">
          <a href="index.html" class="flex items-center gap-3 group">
            <svg width="34" height="34" viewBox="0 0 40 40" class="text-bone group-hover:rotate-[-6deg] transition-transform duration-500">
              <path d="M4 32 L14 14 L20 22 L26 10 L36 32 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <circle cx="28" cy="10" r="2" fill="currentColor"/>
            </svg>
            <div class="leading-none">
              <div class="font-display font-semibold text-[15px] tracking-[0.12em] text-bone uppercase" style="font-variation-settings: 'opsz' 144, 'SOFT' 100;">Bolivian Pal</div>
              <div class="font-mono text-[9px] tracking-[0.3em] text-bone/60 mt-1 uppercase">Local Expeditions · EST. La Paz</div>
            </div>
          </a>

          <div class="hidden md:flex items-center gap-10 font-mono text-[11px] tracking-[0.2em] uppercase text-bone/80">
            ${links}
          </div>

          <div class="flex items-center gap-4">
            <div class="hidden md:flex items-center font-mono text-[11px] tracking-[0.2em] text-bone/70">
              <button data-lang="en" class="lang-btn px-2 py-1 hover:text-clay transition-colors">EN</button>
              <span class="text-bone/30">/</span>
              <button data-lang="es" class="lang-btn px-2 py-1 hover:text-clay transition-colors">ES</button>
            </div>
            <a href="https://wa.me/59175492774?text=Hola%20Ivan%2C%20vi%20tu%20sitio%20web%20y%20quiero%20reservar%20una%20aventura." target="_blank" rel="noopener" class="hidden sm:inline-flex items-center gap-2 bg-clay hover:bg-clay-deep text-bone px-5 py-2.5 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 2.6 16.8L1 22.5l5.8-1.5a11 11 0 0 0 16.1-9.5 11 11 0 0 0-2.4-8Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.4.9.9-3.3-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.5a.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.5-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1 2.8s1.9 2.9 4.6 4a14.3 14.3 0 0 0 1.5.5 3.5 3.5 0 0 0 1.6.1c.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3Z"/></svg>
              <span data-i18n="nav.book">Book</span>
            </a>
            <button id="mobileNavToggle" class="md:hidden text-bone" aria-label="Open menu">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 17h18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <div id="mobileNav" class="fixed inset-0 z-[70] bg-ink text-bone translate-x-full transition-transform duration-500 ease-out">
        <div class="p-6 flex justify-between items-center">
          <div class="font-display uppercase tracking-[0.15em] text-sm">Bolivian Pal</div>
          <button id="mobileNavClose" aria-label="Close menu">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </div>
        <div class="px-8 mt-12 space-y-6">
          ${mobileLinks}
          <div class="pt-8 font-mono text-xs tracking-[0.2em]">
            <button data-lang="en" class="lang-btn px-2">EN</button>
            <span class="text-bone/30">/</span>
            <button data-lang="es" class="lang-btn px-2">ES</button>
          </div>
          <a href="https://wa.me/59175492774" target="_blank" rel="noopener" class="inline-flex items-center gap-3 bg-clay text-bone px-5 py-3 font-mono text-[11px] tracking-[0.22em] uppercase mt-6">
            WhatsApp +591 75492774
          </a>
        </div>
      </div>
    `;
  }

  // ============ FOOTER ============
  function renderFooter() {
    return `
      <footer class="bg-ink text-bone/60 border-t border-bone/10">
        <div class="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-20">
          <div class="grid md:grid-cols-12 gap-10">
            <div class="md:col-span-4">
              <div class="flex items-center gap-3 mb-6">
                <svg width="26" height="26" viewBox="0 0 40 40" class="text-bone/80">
                  <path d="M4 32 L14 14 L20 22 L26 10 L36 32 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                  <circle cx="28" cy="10" r="2" fill="currentColor"/>
                </svg>
                <div class="font-display text-sm tracking-[0.15em] uppercase text-bone">Bolivian Pal</div>
              </div>
              <p class="text-sm leading-relaxed max-w-sm" data-i18n="footer.blurb">A local's guide to the best of Bolivia — expeditions, adventure, culture and the Amazon. Run by Ivan Daynor.</p>
            </div>

            <div class="md:col-span-2">
              <div class="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-4" data-i18n="footer.site">Site</div>
              <ul class="space-y-2 text-sm">
                <li><a href="index.html" class="hover:text-clay" data-i18n="nav.home">Home</a></li>
                <li><a href="experiences.html" class="hover:text-clay" data-i18n="nav.experiences">Experiences</a></li>
                <li><a href="gallery.html" class="hover:text-clay" data-i18n="nav.gallery">Gallery</a></li>
                <li><a href="la-paz.html" class="hover:text-clay" data-i18n="nav.tips">La Paz</a></li>
                <li><a href="contact.html" class="hover:text-clay" data-i18n="nav.contact">Contact</a></li>
              </ul>
            </div>

            <div class="md:col-span-3">
              <div class="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-4" data-i18n="footer.reach">Reach Ivan</div>
              <ul class="space-y-2 text-sm">
                <li><a href="https://wa.me/59175492774" target="_blank" rel="noopener" class="hover:text-clay">WhatsApp · +591 75492774</a></li>
                <li><a href="mailto:bolivanpal@gmail.com" class="hover:text-clay">bolivanpal@gmail.com</a></li>
                <li><a href="https://instagram.com/ivan.daynor" target="_blank" rel="noopener" class="hover:text-clay">@ivan.daynor</a></li>
                <li><a href="https://instagram.com/bolivianpal" target="_blank" rel="noopener" class="hover:text-clay">@bolivianpal</a></li>
              </ul>
            </div>

            <div class="md:col-span-3">
              <div class="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-4" data-i18n="footer.base">Base</div>
              <div class="text-sm leading-relaxed">
                Yati Hostel<br>
                229 Tarija Street<br>
                La Paz, Bolivia
              </div>
              <div class="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mt-6 mb-2" data-i18n="footer.hours">Hours</div>
              <div class="text-sm" data-i18n="footer.hoursVal">Available 24 hours</div>
            </div>
          </div>

          <div class="mt-14 pt-6 border-t border-bone/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div class="font-mono text-[10px] tracking-[0.3em] uppercase">© 2026 Ivan Daynor · Bolivian Pal</div>
            <div class="font-mono text-[10px] tracking-[0.3em] uppercase" data-i18n="footer.coord">16°29'S · 68°08'W · 3 640 m</div>
          </div>
        </div>
      </footer>
    `;
  }

  // ============ MOUNT ============
  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');

  if (navMount) {
    const page = navMount.getAttribute('data-page') || 'home';
    navMount.outerHTML = renderNav(page);
  }
  if (footerMount) {
    footerMount.outerHTML = renderFooter();
  }

  // Install global error handler for images with data-fallback
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG' && e.target.hasAttribute('data-fallback')) {
      window.imgFallback(e.target);
    }
  }, true);
})();
