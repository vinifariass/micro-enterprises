import Link from "next/link";

export const metadata = {
  title: "E-commerce 2.0 · Admin",
  description: "Painel de controle do template E-commerce 2.0",
};

const KPI = [
  { label: "Faturamento (30d)", value: "R$ 128.920", delta: "+18%" },
  { label: "Pedidos", value: "742", delta: "+12%" },
  { label: "Ticket médio", value: "R$ 173", delta: "+6%" },
  { label: "Abandono de checkout", value: "24%", delta: "-4%" },
];

const RECENT_ORDERS = [
  { id: "#1001", customer: "Ana Souza", total: "R$ 389,00", status: "Enviado" },
  { id: "#1000", customer: "Pedro Lima", total: "R$ 219,00", status: "Separando" },
  { id: "#0999", customer: "Marina Soares", total: "R$ 749,00", status: "Pago" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">High Street Admin</p>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Visão geral</h1>
          <p className="mt-1 text-sm text-gray-600">
            Acompanhe a performance da loja, pedidos recentes e status de estoque.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/templates/ecommerce2/admin/products"
            className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-black hover:text-black"
          >
            Produtos
          </Link>
          <Link
            href="/templates/ecommerce2/admin/new"
            className="inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
          >
            Cadastrar produto
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI.map((card) => (
          <div key={card.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{card.label}</p>
            <div className="mt-3 text-2xl font-bold text-gray-900">{card.value}</div>
            <span className="text-xs font-semibold text-emerald-600">{card.delta}</span>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900">Pedidos recentes</h2>
          <p className="text-xs text-gray-500">Últimas compras aprovadas na Stripe</p>
          <div className="mt-4 divide-y divide-gray-100">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.total}</p>
                  <span className="text-xs uppercase tracking-[0.25em] text-emerald-600">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">Estoque crítico</h3>
            <p className="text-xs text-gray-500">Monitore itens com poucas unidades</p>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li className="flex items-center justify-between">
                <span>Tee Worldwide — P</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">5 un.</span>
              </li>
              <li className="flex items-center justify-between">
                <span>New Balance 480 — 41</span>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">2 un.</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Vans Old Skool — 40</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">3 un.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">Configurar Stripe</h3>
            <p className="text-xs text-gray-500">
              Salve as chaves <code>STRIPE_SECRET_KEY</code> e <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> no <code>.env.local</code>
              e use <Link href="/templates/ecommerce2/cart" className="underline">/cart</Link> para testar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

