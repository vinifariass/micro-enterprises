export default async function sitemap() {
  const base = 'https://suaempresa.com.br'; // Altere para o domínio real
  const routes = ['', '/#about', '/#services', '/#pricing', '/#contact'].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  return routes;
}
