const DUO_WHATSAPP = '5519993552609';

function buildFormWhatsAppMessage() {
  const nome = document.getElementById('f-nome')?.value.trim() || '';
  const tel = document.getElementById('f-tel')?.value.trim() || '';
  const email = document.getElementById('f-email')?.value.trim() || '';
  const empresa = document.getElementById('f-empresa')?.value.trim() || '';

  const lines = [
    'Olá Monique, quero agendar meu diagnóstico gratuito.',
    '',
    `Nome: ${nome}`,
    `WhatsApp: ${tel}`,
    `E-mail: ${email}`,
  ];

  if (empresa) lines.push(`Empresa / segmento: ${empresa}`);

  return lines.join('\n');
}

function submitForm() {
  const fields = ['f-nome', 'f-tel', 'f-email'];
  let ok = true;

  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#dc3545';
      el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
      ok = false;
    }
  });

  if (!ok) return;

  if (typeof window.trackDUOEvent === 'function') {
    window.trackDUOEvent('form_submit', { form_name: 'diagnostico_gratuito' });
  }

  const btn = document.getElementById('submit-btn');
  const label = btn.querySelector('.form-submit-label');
  if (label) {
    label.dataset.default = label.textContent;
    label.textContent = 'Abrindo WhatsApp...';
  }
  btn.disabled = true;

  const message = buildFormWhatsAppMessage();
  const url = `https://wa.me/${DUO_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');

  setTimeout(() => {
    document.getElementById('form-fields').style.display = 'none';
    document.getElementById('success-state').style.display = 'block';
    btn.disabled = false;
    if (label && label.dataset.default) label.textContent = label.dataset.default;
  }, 400);
}

function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  document.querySelectorAll('.faq-q.open').forEach((b) => {
    b.classList.remove('open');
    b.nextElementSibling.style.display = 'none';
  });

  if (!isOpen) {
    btn.classList.add('open');
    answer.style.display = 'block';
  }
}

function initNavMenu() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const overlay = document.getElementById('nav-overlay');

  if (!nav || !toggle || !menu) return;

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
    if (overlay) overlay.hidden = true;
  }

  function openMenu() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
    if (overlay) overlay.hidden = false;
  }

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) closeMenu();
    else openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 900px)').matches) closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 901px)').matches) closeMenu();
  });
}

function scrollToContato(e) {
  const href = e.currentTarget.getAttribute('href') || '';
  const onHome = document.getElementById('contato');

  if (href === '#contato' && onHome) {
    e.preventDefault();
    onHome.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.matchMedia('(max-width: 900px)').matches) {
      document.querySelector('.site-nav')?.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      const overlay = document.getElementById('nav-overlay');
      if (overlay) overlay.hidden = true;
      const toggle = document.querySelector('.nav-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      }
    }
  }
}

document.querySelectorAll('a[href="#contato"], a[href*="index.html#contato"]').forEach((a) => {
  a.addEventListener('click', scrollToContato);
});

function initEpicReveal() {
  const epicGrid = document.querySelector('.epic-grid');
  if (!epicGrid) return;

  const cards = [...epicGrid.querySelectorAll('.epic-card')];
  const letters = cards.map((card) => card.querySelector('.epic-letter'));
  const inners = cards.map((card) => card.querySelector('.epic-card-inner'));

  const LETTER_STAGGER = 240;
  const INNER_STAGGER = 180;

  let hasPlayed = false;
  const timeouts = [];

  function showAllInstant() {
    letters.forEach((el) => el?.classList.add('is-visible'));
    inners.forEach((el) => el?.classList.add('is-visible'));
  }

  function playSequence() {
    if (hasPlayed) return;
    hasPlayed = true;
    epicGrid.classList.add('is-sequencing');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAllInstant();
      return;
    }

    letters.forEach((letter, index) => {
      if (!letter) return;
      const id = window.setTimeout(() => {
        letter.classList.add('is-visible');
      }, index * LETTER_STAGGER);
      timeouts.push(id);
    });

    const innerStart = (letters.length - 1) * LETTER_STAGGER;

    inners.forEach((inner, index) => {
      if (!inner) return;
      const id = window.setTimeout(() => {
        inner.classList.add('is-visible');
      }, innerStart + index * INNER_STAGGER);
      timeouts.push(id);
    });
  }

  function isInView() {
    const rect = epicGrid.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom > 80;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playSequence();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '80px 0px' }
    );
    observer.observe(epicGrid);
  }

  if (isInView()) {
    playSequence();
  }
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('[data-carousel-track]');
    const prev = root.querySelector('.carousel-nav--prev');
    const next = root.querySelector('.carousel-nav--next');
    if (!track || !prev || !next) return;

    const scrollAmount = () => {
      const item = track.querySelector('.feedback-shot, .case-video-card');
      if (!item) return Math.round(track.clientWidth * 0.85);
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return item.getBoundingClientRect().width + gap;
    };

    const updateNav = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const hasOverflow = maxScroll > 4;
      root.classList.toggle('is-scrollable', hasOverflow);
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= maxScroll - 4;
    };

    const scrollByDir = (dir) => {
      track.scrollBy({ left: dir * scrollAmount(), behavior: 'smooth' });
    };

    prev.addEventListener('click', () => scrollByDir(-1));
    next.addEventListener('click', () => scrollByDir(1));

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByDir(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByDir(1);
      }
    });

    track.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(updateNav);
      ro.observe(track);
    }
    updateNav();
  });
}

function initPage() {
  initNavMenu();
  initEpicReveal();
  initCarousels();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
