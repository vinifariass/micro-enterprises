import Link from 'next/link';

export const metadata = {
  title: 'Templates prontos',
  description: 'Explore modelos de landing pages prontos para acelerar seu projeto.',
};

export default function TemplatesIndex() {
  const items = [
    {
      slug: 'remake',
      title: 'Remake (inspirado)',
      desc: 'Layout moderno com foco em portfólio, seções de projetos e depoimentos.',
      badge: 'Tailwind',
    },
    {
      slug: 'sparrow',
      title: 'Sparrow (inspirado)',
      desc: 'Agência criativa com hero impactante, serviços, pricing e blog teaser.',
      badge: 'Tailwind',
    },
    {
      slug: 'powit',
      title: 'Powit (inspirado)',
      desc: 'Hero geométrico com overlay mobile, serviços e projetos.',
      badge: 'Tailwind',
    },
    {
      slug: 'streetwear',
      title: 'Streetwear Shop',
      desc: 'E-commerce de roupas oversized e tênis (Air Force / Jordan) com carrinho.',
      badge: 'E-commerce',
    },
    {
      slug: 'ecommerce2',
      title: 'E-commerce 2.0',
      desc: 'Storefront + Admin com grid, PDP e carrinho leve (estilo Shadcn).',
      badge: 'E-commerce',
    },
    {
      slug: 'newsblog',
      title: 'News & Tech Blog',
      desc: 'Notícias estilo G1 + Tecnoblog, com adição de posts (localStorage).',
      badge: 'Blog',
    },
    {
      slug: 'videomaker',
      title: 'Videomaker Portfolio',
      desc: 'Portfólio com exemplos de vídeos e parallax scroll.',
      badge: 'Portfolio',
    },
  ];

  return (
    <main className="py-20 bg-white min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
        <p className="text-gray-600 mt-2">Modelos inspirados em temas populares, criados do zero com Tailwind CSS.</p>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {items.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group rounded-2xl border bg-white hover:shadow-lg transition overflow-hidden"
            >
              <div className="p-6">
                <div className="text-xs inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  <span className="inline-block size-2 rounded-full bg-emerald-500" />
                  {t.badge}
                </div>
                <h2 className="text-xl font-semibold mt-3 text-gray-900 group-hover:text-blue-600">{t.title}</h2>
                <p className="text-gray-600 mt-2">{t.desc}</p>
                <div className="mt-4 text-blue-600 font-medium">Ver template →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
