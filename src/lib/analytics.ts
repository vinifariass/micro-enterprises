export function gaPageview(url: string) {
  if (typeof window === 'undefined') return;
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return;
  // @ts-ignore
  window.gtag?.('config', id, { page_path: url });
}

export function gaEvent(action: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.gtag?.('event', action, params);
}
