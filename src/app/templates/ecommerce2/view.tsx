"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { PRODUCTS } from "./catalog";

export default function Storefront() {
  const { add, items, total, dec, clear } = useCart();

  return (
    <main className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="h-40 sm:h-56 lg:h-64 bg-black text-white grid place-items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-card-foreground">Coleção Destaque</h1>
        </div>
        <div className="bg-gray-100 py-3 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white border text-sm">
              <span aria-hidden>▾</span> Filtrar
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {PRODUCTS.map((p) => (
              <Link href={`/templates/ecommerce2/${p.id}`} key={p.id} className="text-center block group">
                <div className={(/adidas|vans|nb-480/.test(p.id) ? "aspect-[4/3]" : "aspect-[3/4]") + " bg-gray-100 rounded overflow-hidden grid place-items-center"}>
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={800}
                      height={800}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="w-full h-full object-contain p-4 transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  )}
                </div>
                <div className="mt-3 text-xs tracking-widest text-muted-foreground font-semibold">
                  {p.name.split("–")[0]?.trim().toUpperCase()}
                </div>
                <div className="text-sm font-semibold" aria-label="nome do produto">
                  {p.name.split("–")[1]?.trim() || p.name}
                </div>
                <div className="text-xs text-muted-foreground">R$ {p.price.toFixed(0)}</div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    add(p.id);
                  }}
                  className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded border text-sm"
                >
                  Adicionar
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cart */}
      <section id="cart" className="py-12 bg-gray-50 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">Seu carrinho</h2>
          {items.length === 0 ? (
            <p className="mt-4 text-gray-600">Seu carrinho está vazio.</p>
          ) : (
            <div className="mt-4 rounded-2xl border bg-white divide-y">
              {items.map((it) => {
                const p = PRODUCTS.find((x) => x.id === it.id)!;
                return (
                  <div key={it.id} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">R$ {p.price.toFixed(2)} • Qtde: {it.qty}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => dec(it.id)} className="px-2 py-1 rounded border">
                        -
                      </button>
                      <button onClick={() => add(it.id)} className="px-2 py-1 rounded border">
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="p-4 flex items-center justify-between">
                <div className="text-gray-600">Total</div>
                <div className="text-xl font-extrabold">R$ {total.toFixed(2)}</div>
              </div>
              <div className="p-4 flex items-center justify-end gap-3">
                <button onClick={clear} className="px-4 py-2 rounded-lg border">Limpar</button>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                  Finalizar compra
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
