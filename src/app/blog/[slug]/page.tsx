import { notFound } from 'next/navigation';

const posts = [
  {
    slug: 'como-um-site-profissional-aumenta-suas-vendas',
    title: 'Como um site profissional aumenta suas vendas',
    content: `Um site profissional transmite confiança e reduz fricção. Alguns pontos-chave:\n\n- Velocidade e responsividade\n- CTAs claros (WhatsApp, compra)\n- Provas sociais (depoimentos, cases)\n- SEO básico para gerar tráfego qualificado\n\nImplemente essas práticas e acompanhe métricas no GA4.`,
    date: '2025-08-01',
  },
  {
    slug: 'checklist-de-lancamento-de-site',
    title: 'Checklist de lançamento de site (sem esquecer nada)',
    content: `Antes de publicar:\n\n- Domínio e SSL configurados\n- SEO: title/description, OG, sitemap, robots\n- Analytics (GA4) e metas de conversão\n- Testes em mobile e desktop\n- Formulários funcionando (contato, lead)`,
    date: '2025-08-02',
  },
  {
    slug: 'seo-basico-para-pequenos-negocios',
    title: 'SEO básico para pequenos negócios',
    content: `Otimize seu site com:\n\n- Palavras-chave no título e headings\n- Conteúdo útil e direto\n- Links internos para serviços\n- Google Business Profile\n- Sitemap e robots corretos`,
    date: '2025-08-03',
  },
];

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="py-16 bg-white min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <article>
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="text-sm text-gray-500 mt-2">{new Date(post.date).toLocaleDateString('pt-BR')}</div>
          <div className="prose prose-neutral mt-6 whitespace-pre-line">{post.content}</div>
        </article>
      </div>
    </main>
  );
}
