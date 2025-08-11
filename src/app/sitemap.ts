export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://suaempresa.com.br';
  const routes = ['', '/#about', '/#services', '/#pricing', '/#contact'].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  return routes;
}
