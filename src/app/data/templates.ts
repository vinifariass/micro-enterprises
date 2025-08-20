export type TemplateItem = {
  slug: string;
  title: string;
  desc: string;
  badge: string;
  image?: string;
};

export const templates: TemplateItem[] = [
  {
    slug: "remake",
    title: "Remake (inspirado)",
    desc: "Layout moderno com foco em portfólio, seções de projetos e depoimentos.",
    badge: "Tailwind",
    image: "/images/streetwear/tee-worldwide.jpg",
  },
  {
    slug: "sparrow",
    title: "Sparrow (inspirado)",
    desc: "Agência criativa com hero impactante, serviços, pricing e blog teaser.",
    badge: "Tailwind",
    image: "/images/streetwear/tee-open-mind.jpg",
  },
  {
    slug: "powit",
    title: "Powit (inspirado)",
    desc: "Hero geométrico com overlay mobile, serviços e projetos.",
    badge: "Tailwind",
    image: "/images/streetwear/tee-batman.jpg",
  },
  {
    slug: "streetwear",
    title: "Streetwear Shop",
    desc: "E-commerce de roupas oversized e tênis com carrinho.",
    badge: "E-commerce",
    image: "/images/streetwear/vans-old-skool.jpg",
  },
  {
    slug: "ecommerce2",
    title: "E-commerce 2.0",
    desc: "Storefront + Admin com grid, PDP e carrinho leve.",
    badge: "E-commerce",
    image: "/images/streetwear/nb-480-br.jpg",
  },
  {
    slug: "newsblog",
    title: "News & Tech Blog",
    desc: "Notícias estilo G1 + Tecnoblog, com adição de posts.",
    badge: "Blog",
    image: "/images/streetwear/adidas-grey-gum.jpg",
  },
];
