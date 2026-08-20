/**
 * Analítica — GA4.
 *
 * Todo está detrás de la variable de entorno VITE_GA4_ID. Sin esa variable
 * no se carga ningún script de terceros y no se envía nada: el sitio se
 * comporta exactamente como antes. Para activarlo, definir en Vercel:
 *
 *   VITE_GA4_ID = G-XXXXXXXXXX
 */

const GA4_ID = import.meta.env.VITE_GA4_ID;

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const analyticsEnabled = Boolean(GA4_ID);

/** Carga gtag.js una sola vez e inicializa GA4. */
export function initAnalytics(): void {
  if (!GA4_ID || typeof window === 'undefined') return;
  if (window.gtag) return; // ya inicializado

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  // send_page_view: false — las vistas las manda trackPageView() en cada
  // cambio de ruta, porque en una SPA no hay recarga que las dispare.
  window.gtag('config', GA4_ID, { send_page_view: false });

  trackPageView();
  listenWhatsAppClicks();
}

/** Envía un evento a GA4. Es no-op si la analítica está apagada. */
export function trackEvent(name: string, params: GtagParams = {}): void {
  window.gtag?.('event', name, params);
}

/** Vista de página. Llamar en cada cambio de ruta del router. */
export function trackPageView(): void {
  if (typeof window === 'undefined') return;
  trackEvent('page_view', {
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
    page_location: window.location.href,
  });
}

/**
 * Un único listener delegado en document captura el clic de CUALQUIER link
 * de WhatsApp del sitio. Así no hay que instrumentar los nueve botones a
 * mano ni acordarse de hacerlo en los que se agreguen después.
 */
let whatsAppListenerAttached = false;

export function listenWhatsAppClicks(): void {
  if (whatsAppListenerAttached || typeof document === 'undefined') return;
  whatsAppListenerAttached = true;

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
      if (!link) return;

      trackEvent('whatsapp_click', {
        link_url: link.href,
        page_path: window.location.pathname,
        // Texto del botón: sirve para distinguir qué CTA convierte mejor.
        cta_text: (link.textContent || '').trim().slice(0, 100),
      });
    },
    { capture: true },
  );
}
