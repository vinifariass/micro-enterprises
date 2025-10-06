import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const items = [
  {
    slug: "remake",
    title: "Remake (inspirado)",
    desc: "Layout moderno com foco em portfolio, secoes de projetos e depoimentos.",
    badge: "Tailwind",
    screenshot: "https://s.wordpress.com/mshots/v1/https://remake-template.vercel.app/?w=1200",
  },
  {
    slug: "sparrow",
    title: "Sparrow (inspirado)",
    desc: "Agencia criativa com hero impactante, servicos, pricing e blog teaser.",
    badge: "Tailwind",
    screenshot: "https://s.wordpress.com/mshots/v1/https://sparrow-template.vercel.app/?w=1200",
  },
  {
    slug: "powit",
    title: "Powit (inspirado)",
    desc: "Hero geometrico com overlay mobile, servicos e projetos.",
    badge: "Tailwind",
    screenshot: "https://s.wordpress.com/mshots/v1/https://powit-template.vercel.app/?w=1200",
  },
  {
    slug: "streetwear",
    title: "Streetwear Shop",
    desc: "E-commerce de roupas oversized e tenis com carrinho completo.",
    badge: "E-commerce",
    screenshot: "https://s.wordpress.com/mshots/v1/https://streetwear-template.vercel.app/?w=1200",
  },
  {
    slug: "ecommerce2",
    title: "E-commerce 2.0",
    desc: "Storefront + Admin com grid, PDP e carrinho leve estilo ShadCN.",
    badge: "E-commerce",
    screenshot: "https://s.wordpress.com/mshots/v1/https://ecommerce2-template.vercel.app/?w=1200",
  },
  {
    slug: "newsblog",
    title: "News & Tech Blog",
    desc: "Noticias estilo portal com destaques e posts dinamicos.",
    badge: "Blog",
    screenshot: "https://s.wordpress.com/mshots/v1/https://newsblog-template.vercel.app/?w=1200",
  },
  {
    slug: "videomaker",
    title: "Videomaker Portfolio",
    desc: "Portfolio com exemplos de videos e parallax leve.",
    badge: "Portfolio",
    screenshot: "https://s.wordpress.com/mshots/v1/https://videomaker-template.vercel.app/?w=1200",
  },
  {
    slug: "pet-care",
    title: "PetCare Finder",
    desc: "Busca estilo Airbnb com mapa, filtros e pagina detalhada para cuidadores de pet.",
    badge: "Aplicacao",
    screenshot: "https://s.wordpress.com/mshots/v1/https://pet-care-template.vercel.app/?w=1200",
  },
  {
    slug: "brboat",
    title: "MarAzul Experiences",
    desc: "Landing premium com hero em video, experiencias e concierge dedicado.",
    badge: "Luxury",
    screenshot: "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=1200&q=80",
  },

];

const filters = ["Todos", "E-commerce", "Portfolio", "Blog", "Aplicacao"];

function Heading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl", className)} {...props} />;
}

function Text({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-relaxed text-slate-600", className)} {...props} />;
}

export const metadata = {
  title: "Templates prontos",
  description: "Explore modelos de landing pages prontos para acelerar seu projeto.",
};

export default function TemplatesIndex() {
  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(148, 163, 184, 0.18) 0%, transparent 60%), radial-gradient(circle at 80% 10%, rgba(226, 232, 240, 0.3) 0%, transparent 55%)",
        }}
      />

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-50">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span className="size-2 rounded-full bg-emerald-500" /> Galeria de modelos
            </span>
            <Heading>Templates minimalistas prontos para personalizar</Heading>
            <Text>
              Escolha um ponto de partida, substitua textos e imagens e publique seu site em poucos minutos. Todos os modelos
              sao responsivos, seguem a mesma estetica clean da homepage e usam componentes modernos.
            </Text>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800">
                <Link href="/">Voltar para a home</Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full border-slate-300 px-6 text-sm text-slate-700">
                <Link href="https://portfolio-next-mvqg.vercel.app/" target="_blank" rel="noreferrer">
                  Ver portfolio completo
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl">
            <ul className="grid gap-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-slate-900" /> Paginas pensadas para conversao com CTA visivel
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-slate-900" /> Copys orientativas e secoes explicativas
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-slate-900" /> Facil de adaptar cores, fontes e imagens
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-slate-900" /> Componentes ShadCN/Tailwind prontos para reuso
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 text-sm text-slate-600 sm:px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <span key={filter} className="rounded-full border border-slate-300 bg-slate-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {filter}
              </span>
            ))}
          </div>
          <Text className="max-w-sm">
            Todos os templates podem ser clonados ou servem como referencia visual para criar algo totalmente novo.
          </Text>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((template) => (
              <Card key={template.slug} className="group flex h-full flex-col overflow-hidden border-slate-200 bg-white/90 transition hover:border-slate-400 hover:shadow-xl">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={template.screenshot}
                    alt={template.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <CardContent className="flex flex-1 flex-col gap-4 p-6">
                  <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-slate-100/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span className="size-2 rounded-full bg-emerald-500" /> {template.badge}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{template.title}</h2>
                    <Text className="mt-2 text-slate-600">{template.desc}</Text>
                  </div>
                  <Button asChild className="mt-auto rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800">
                    <Link href={`/templates/${template.slug}`}>
                      Ver template
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

