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

document.querySelectorAll('a[href="#contato"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEpicReveal);
} else {
  initEpicReveal();
}
