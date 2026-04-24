// Bolivian Pal — main interactions
(function() {
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ============ NAV SCROLL STATE ============
  const nav = $('#nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ============ MOBILE NAV ============
  const mobileNav = $('#mobileNav');
  const openMobile  = () => mobileNav.classList.add('open');
  const closeMobile = () => mobileNav.classList.remove('open');
  $('#mobileNavToggle')?.addEventListener('click', openMobile);
  $('#mobileNavClose')?.addEventListener('click', closeMobile);
  $$('#mobileNav a').forEach(a => a.addEventListener('click', closeMobile));

  // ============ LANGUAGE TOGGLE ============
  const LS_KEY = 'bolivianpal.lang';
  const defaultLang = 'en';
  let currentLang = localStorage.getItem(LS_KEY) || defaultLang;

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LS_KEY, lang);
    document.documentElement.setAttribute('lang', lang);

    const dict = window.TRANSLATIONS?.[lang];
    if (!dict) return;

    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });

    // Update language button states
    $$('.lang-btn').forEach(btn => {
      btn.classList.toggle('active-lang', btn.getAttribute('data-lang') === lang);
    });
  }

  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang')));
  });

  // Initialise with stored/default language
  if (currentLang !== 'en') applyLanguage(currentLang);
  else applyLanguage('en'); // ensures active-lang styling applied

  // ============ REVEAL ON SCROLL ============
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal, .exp-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ============ FILTERS ============
  const filterBtns = $$('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      $$('.exp-card').forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) card.classList.remove('hidden-filter');
        else card.classList.add('hidden-filter');
      });
    });
  });

  // ============ EXPERIENCE MODAL ============
  const modal = $('#expModal');
  const modalBody = $('#modalBody');
  const modalClose = $('#modalClose');

  function openModal(expId) {
    const data = window.EXPERIENCE_DATA?.[expId];
    if (!data) return;
    const locale = data[currentLang] || data.en;

    // Build modal content
    const waText = encodeURIComponent(
      currentLang === 'es'
        ? `Hola Ivan, quiero reservar el tour de ${locale.title}.`
        : `Hi Ivan, I'd like to book the ${locale.title} tour.`
    );
    const waUrl = `https://wa.me/59175492774?text=${waText}`;

    const bookLabel  = currentLang === 'es' ? 'Reservar por WhatsApp' : 'Book on WhatsApp';
    const itinLabel  = currentLang === 'es' ? 'Itinerario' : 'Itinerary';
    const bringLabel = currentLang === 'es' ? 'Qué traer' : 'What to bring';
    const incLabel   = currentLang === 'es' ? 'Incluye' : 'Included';
    const excLabel   = currentLang === 'es' ? 'No incluye' : 'Not included';
    const fromLabel  = currentLang === 'es' ? 'desde' : 'from';

    modalBody.innerHTML = `
      <div class="modal-hero">
        <img src="${data.image}" alt="${locale.title}" />
        <div class="absolute top-5 left-5 font-mono text-[10px] tracking-[0.25em] uppercase text-bone/80 z-10">N°${data.number}</div>
        <div class="absolute bottom-5 left-6 right-6 md:left-12 md:right-12 z-10">
          <div class="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-clay mb-3">${locale.meta.join(' · ')}</div>
          <h2 class="font-display font-light text-4xl md:text-6xl leading-[0.92] tracking-[-0.01em] text-bone" style="font-variation-settings: 'opsz' 144, 'SOFT' 50;">${locale.title}</h2>
          <p class="mt-3 text-bone/85 text-base md:text-lg max-w-2xl">${locale.subtitle}</p>
        </div>
      </div>
      <div class="modal-content">
        <div class="md:grid md:grid-cols-12 md:gap-10">
          <div class="md:col-span-7">
            <p class="text-ink/80 text-lg leading-relaxed">${locale.description}</p>

            <h3 class="mt-10 font-mono text-[10px] tracking-[0.3em] uppercase text-clay">${itinLabel}</h3>
            <ol class="mt-4 space-y-3 text-ink/85">
              ${locale.itinerary.map((step, i) => `
                <li class="flex gap-4">
                  <span class="font-mono text-[11px] text-clay tracking-wider pt-1 shrink-0">${String(i+1).padStart(2,'0')}</span>
                  <span class="text-[0.95rem] leading-relaxed">${step}</span>
                </li>
              `).join('')}
            </ol>
          </div>

          <div class="md:col-span-5 mt-10 md:mt-0 space-y-4">
            <div class="info-box">
              <div class="label">${bringLabel}</div>
              <ul>${locale.bring.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
            <div class="info-box">
              <div class="label">${incLabel}</div>
              <ul>${locale.included.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
            <div class="info-box">
              <div class="label">${excLabel}</div>
              <ul>${locale.excluded.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-ink/10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div class="font-mono text-[11px] tracking-[0.22em] uppercase">
            <span class="text-ink/50">${fromLabel}</span> <span class="text-ink text-lg font-display tracking-normal normal-case">$XX</span>
          </div>
          <a href="${waUrl}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-3 bg-clay hover:bg-clay-deep text-bone px-6 py-4 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 2.6 16.8L1 22.5l5.8-1.5a11 11 0 0 0 16.1-9.5 11 11 0 0 0-2.4-8Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.4.9.9-3.3-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.5a.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.5-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1 2.8s1.9 2.9 4.6 4a14.3 14.3 0 0 0 1.5.5 3.5 3.5 0 0 0 1.6.1c.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3Z"/></svg>
            <span>${bookLabel}</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.classList.add('modal-open');
    modal.scrollTo(0, 0);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  // Wire up card clicks
  $$('.exp-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-exp');
      if (id) openModal(id);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // ============ IMAGE LOAD FADE ============
  $$('img').forEach(img => {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'));
  });
})();
