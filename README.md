# Micro Enterprises

> Template Next.js completo para pequenos negócios com Ecommerce, Dashboard, Locator (mapa), Chat, Blog, SEO e componentes reutilizáveis.

## Visão Geral

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS e componentes “shadcn-like” (Button, Card, Input, Dialog, Sidebar etc.)
- Gráficos com Recharts e ícones com lucide-react
- Mapa com Leaflet + OpenStreetMap (SSR-safe)
- Ecommerce 2.0 com catálogo, produto, carrinho global, toasts e resumo de pedido
- SEO (OpenGraph, sitemap, robots) e helpers de Analytics (GA4)
- APIs utilitárias (contato, subscribe, métricas)

## Estrutura

```
src/
  app/
    page.tsx                         # Home com carrossel de templates
    globals.css                      # Tema, utilitários e ajustes de camadas (Leaflet)
    opengraph-image.tsx              # Imagem OG padrão
    robots.ts, sitemap.ts            # SEO básico

    api/
      contact/route.ts               # POST contato (Resend + Webhook opcional)
      metrics/ga-sessions/route.ts   # Exemplo de métrica/telemetria
      subscribe/route.ts             # Exemplo de inscrição

    (store)/                         # Grupo com Sidebar para Locator e Store Details
      layout.tsx
      locator/page.tsx
      store/[id]/page.tsx

    templates/
      page.tsx                       # Catálogo de templates
      ecommerce2/
        layout.tsx                   # Header + CartButton + ToastProvider + Footer
        page.tsx                     # Vitrine (catálogo)
        [id]/page.tsx, view.tsx      # Página de produto
        products/[id]/page.tsx       # Variação de produto
        products/page.tsx            # Lista de produtos (demo)
        cart/page.tsx                # Carrinho + Order Summary
        CartContext.tsx              # Estado do carrinho (add/dec/remove/clear/total)
        CartButton.tsx               # Botão do carrinho (client) com badge
        Toast.tsx                    # Toast leve (provider + hook)
        Footer.tsx                   # Footer “ShopCraft”
        dashboard/*                  # Dashboard/KPIs/Recharts
        chat/*                       # Chat com áudio + call dialog (scaffold)
        locator/*                    # Locator dentro do template (variação)

      streetwear/                    # Catálogo base (imagens locais)

  components/
    TemplatesCarousel.tsx            # Carrossel responsivo da Home
    ui/*                             # Primitivas “shadcn-like” (button, card, input, …)

  config/business.ts                 # Dados padrão de negócio/contato
  lib/analytics.ts                   # Wrappers GA4 opcionais
```

## Módulos e Funcionalidades

### Ecommerce 2.0
- Catálogo usa `streetwear/catalog.ts` (imagens locais em `public/images/streetwear`).
- Produto: galeria com thumbs, variação de tamanho, controle de quantidade e CTA “ADICIONAR À SACOLA”.
- Carrinho (global):
  - `CartContext`: `add(id, qty?)`, `dec(id)`, `remove(id)`, `clear()`, `total`.
  - `CartButton` (client): ícone com badge somando as quantidades totais.
  - `ToastProvider`: feedback “Adicionado ao carrinho” no grid e no detalhe.
- Página do carrinho: layout com cards de itens, +/−, remover, subtotal, frete fixo ($5.99) e total.
- Footer ShopCraft (links e redes) incluído no layout do template.

Rotas principais do Ecommerce:
- Catálogo: `/templates/ecommerce2`
- Produto: `/templates/ecommerce2/[id]` (ou `/templates/ecommerce2/products/[id]`)
- Carrinho: `/templates/ecommerce2/cart`
- Dashboard/Chat/Admin: `/templates/ecommerce2/{sales-dashboard,chat,admin}`

### Dashboard de Vendas
- KPIs padronizados.
- `RevenueChartCard` com Recharts e tema via variáveis CSS.

### Store Locator (mapa)
- Leaflet + OSM com markers, busca/sugestões, filtro de raio, “Usar minha localização”, lista lateral no desktop e bottom sheet no mobile.
- Detalhe da loja em `/(store)/store/[id]` (reviews, site externo, endereço, tags).
- Layout do grupo `(store)` inclui Sidebar com navegação.

### Chat (demo)
- Envios de áudio (gravação/playback) e diálogo de chamada (voz/vídeo/screen) como scaffolding com UI e estados básicos.

### Blog e SEO
- Blog simples em `/blog` e `/blog/[slug]`.
- SEO: OpenGraph image, sitemap e robots prontos.

## Executar o projeto

Pré-requisitos: Node 18+

```bash
npm install
npm run dev
# produção
npm run build
npm start
```

No VS Code há uma tarefa: “Executar Template - Desenvolvimento”.

## Variáveis de Ambiente (.env.local)

```bash
# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Envio de emails (opcionais)
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=destino@dominio.com
CONTACT_FROM_EMAIL=no-reply@seusite.com

# Webhook de contato (opcional)
CONTACT_WEBHOOK_URL=https://exemplo.com/webhook
```

- API de contato: `POST /api/contact` — usa Resend e/ou webhook; sem envs, apenas loga.

## Customização

- Tema e utilitários globais: `src/app/globals.css` (inclui CSS do Leaflet e ajustes de z-index para sobrepor sugestões, header etc.).
- UI base: `src/components/ui/*` (mantém API e classes utilitárias Tailwind).
- Carrossel da Home: `src/components/TemplatesCarousel.tsx` (dados em `src/app/data/templates.ts`).
- Dados do negócio: `src/config/business.ts`.
- Analytics: `src/lib/analytics.ts` (wrappers `gaEvent`, `gaPageview`, `gaBeginCheckout` etc.).

Dicas:
- Qualquer componente que use hooks de cliente (ex.: `useCart`) deve ser Client Component ("use client").
- Páginas com Leaflet devem evitar SSR ou usar dynamic import conforme necessário.

## Testes rápidos (manuais)
- Adicionar itens no catálogo do Ecommerce: ver toast e badge do carrinho aumentar.
- Abrir `/templates/ecommerce2/cart`: testar +/−/remover e total.
- Locator: usar “Minha localização”, filtrar por raio e abrir detalhe da loja.
- Dashboard: verificar gráfico de receita renderizando com tema.

## Deploy
- Recomendado: Vercel. Configure as mesmas variáveis do `.env.local` no projeto.
- Outras plataformas funcionarão desde que suportem Next.js 15.

---

Feito para acelerar a entrega de sites profissionais com UX moderna, código limpo e exemplos práticos (ecommerce, mapas, chat, dashboards).
