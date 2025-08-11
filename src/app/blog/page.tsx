import Link from 'next/link';

const posts = [
  {
    slug: 'como-um-site-profissional-aumenta-suas-vendas',
    title: 'Como um site profissional aumenta suas vendas',
    excerpt: 'Descubra práticas que transformam visitantes em clientes usando um site rápido e confiável.',
    date: '2025-08-01',
  },
  {
    slug: 'checklist-de-lancamento-de-site',
    title: 'Checklist de lançamento de site (sem esquecer nada)',
    excerpt: 'Um passo a passo simples para publicar seu site com SEO e métricas funcionando.',
    date: '2025-08-02',
  },
  {
    slug: 'seo-basico-para-pequenos-negocios',
    title: 'SEO básico para pequenos negócios',
    excerpt: 'O guia prático para aparecer no Google com poucos ajustes e sem complicação.',
    date: '2025-08-03',
  },
];

export default function BlogIndex() {
  return (
    <main className="py-16 bg-white min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="border rounded-xl p-6 hover:shadow">
              <h2 className="text-xl font-bold text-gray-900">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p className="text-gray-600 mt-2">{p.excerpt}</p>
              <div className="text-sm text-gray-500 mt-3">{new Date(p.date).toLocaleDateString('pt-BR')}</div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
