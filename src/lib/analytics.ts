type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function gaPageview(url: string) {
  if (typeof window === 'undefined') return;
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return;
  window.gtag?.('config', id, { page_path: url });
}

export function gaEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', action, params);
}

// Convenience wrappers for key funnel events
export function gaLead(email?: string) {
  gaEvent('generate_lead', { email_provided: !!email });
}

export function gaSubscribe(email?: string) {
  gaEvent('subscribe_lead', { email_provided: !!email });
}

export function gaWhatsApp(location: string) {
  gaEvent('click_whatsapp', { location });
}

export function gaViewPricing() {
  gaEvent('view_pricing');
}

export function gaBeginCheckout(plan: string) {
  gaEvent('begin_checkout', { plan });
}

export function gaContactCTA(location: string) {
  gaEvent('contact_cta', { location });
}
