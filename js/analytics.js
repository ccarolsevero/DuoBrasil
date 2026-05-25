/**
 * Google Analytics 4 — substitua pelo Measurement ID (ex: G-ABC123XYZ)
 * em https://analytics.google.com → Admin → Fluxos de dados → Web
 */
const GA_MEASUREMENT_ID = '';

function loadGA4() {
  if (!GA_MEASUREMENT_ID || !GA_MEASUREMENT_ID.startsWith('G-')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
}

function trackEvent(eventName, params) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

window.trackDUOEvent = trackEvent;

function initConversionTracking() {
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener('click', () => {
      trackEvent('whatsapp_click', {
        link_url: link.href,
        link_text: (link.textContent || '').trim().slice(0, 80),
      });
    });
  });
}

loadGA4();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConversionTracking);
} else {
  initConversionTracking();
}
