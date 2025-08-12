'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  tag?: string;
  image?: string;
};

type CartItem = { id: string; qty: number };

const PRODUCTS: Product[] = [
  { id: 'tee-oversize', name: 'Oversized Tee – Preto', price: 129, tag: 'Nova' },
  { id: 'hoodie-oversize', name: 'Hoodie Oversized – Cinza', price: 249 },
  { id: 'af1-white', name: 'Nike Air Force 1 – White', price: 799, tag: 'Drop' },
  { id: 'aj1-bred', name: 'Air Jordan 1 – Bred', price: 1499 },
  { id: 'cargo', name: 'Calça Cargo – Areia', price: 199 },
  { id: 'cap', name: 'Dad Cap – Preto', price: 99 },
];

const SWATCHES: Record<string, string[]> = {
  'tee-oversize': ['#111827', '#9CA3AF', '#F3F4F6'],
  'hoodie-oversize': ['#6B7280', '#111827'],
  'af1-white': ['#F9FAFB', '#111827'],
  'aj1-bred': ['#111827', '#DC2626'],
  cargo: ['#D1D5DB', '#F59E0B'],
  cap: ['#111827', '#374151'],
};

export default function StreetwearView() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const total = useMemo(
    () => cart.reduce((sum, it) => {
      const p = PRODUCTS.find((x) => x.id === it.id);
      return sum + (p ? p.price * it.qty : 0);
    }, 0),
    [cart]
  );

  const add = (id: string) => setCart((c) => {
    const i = c.findIndex((x) => x.id === id);
    if (i >= 0) { const copy = [...c]; copy[i] = { ...copy[i], qty: copy[i].qty + 1 }; return copy; }
    return [...c, { id, qty: 1 }];
  });
  const dec = (id: string) => setCart((c) => c.flatMap((x) => x.id !== id ? [x] : (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : [])));
  const clear = () => setCart([]);

  return (
    <main className="bg-white">
      {/* Announcement bar + header */}
      <div className="text-center text-[11px] tracking-wide bg-black text-white py-2">FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299 • TROCA FÁCIL</div>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/templates" className="font-extrabold tracking-widest text-gray-900">STREETLAB</Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-700">
            <a href="#capsule" className="hover:text-black">Collabs</a>
            <a href="#favorite" className="hover:text-black">Favorite Styles</a>
            <a href="#sneakers" className="hover:text-black">Sneakers</a>
            <a href="#apparel" className="hover:text-black">Apparel</a>
          </nav>
          <button className="relative px-3 py-1 rounded-full border text-sm" aria-label="Abrir carrinho">
            Cart <span className="ml-2 inline-block text-xs bg-black text-white px-2 py-0.5 rounded-full">{cart.reduce((n, x) => n + x.qty, 0)}</span>
          </button>
        </div>
      </header>

      {/* Hero banner */}
      <section className="relative">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8">
          <div className="aspect-[16/7] sm:rounded-none lg:rounded-b-[2rem] bg-gray-100 border overflow-hidden" />
        </div>
      </section>

      {/* Capsule rail */}
      <section id="capsule" className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[11px] tracking-[0.2em] font-semibold text-gray-900">SHOP THE CAPSULE</h2>
          <div className="mt-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="min-w-max grid grid-flow-col auto-cols-[220px] gap-5">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="rounded-2xl border bg-white overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-100" />
                  <div className="p-4">
                    <div className="text-sm text-gray-900 font-medium">{p.name}</div>
                    <div className="text-sm text-gray-600">R$ {p.price.toFixed(2)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      {(SWATCHES[p.id] || []).map((c) => (
                        <span key={c} className="inline-block size-4 rounded-full border" style={{ background: c }} />
                      ))}
                    </div>
                    <button onClick={() => add(p.id)} className="mt-3 w-full px-3 py-2 rounded-lg bg-black text-white text-sm font-semibold">Adicionar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Favorite styles grid */}
      <section id="favorite" className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-gray-900">FAVORITE STYLES</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="rounded-2xl border bg-white overflow-hidden group">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-black">{p.name}</div>
                      <div className="text-xs text-gray-500">R$ {p.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {(SWATCHES[p.id] || []).slice(0, 5).map((c) => (
                        <span key={c} className="inline-block size-3 rounded-full border" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                  <button onClick={() => add(p.id)} className="mt-3 w-full px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50">Adicionar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-700">@streetlabofficial</div>
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Cart */}
      <section id="cart" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">Seu carrinho</h2>
          {cart.length === 0 ? (
            <p className="mt-4 text-gray-600">Seu carrinho está vazio.</p>
          ) : (
            <div className="mt-4 rounded-2xl border bg-white divide-y">
              {cart.map((it) => {
                const p = PRODUCTS.find((x) => x.id === it.id)!;
                return (
                  <div key={it.id} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">R$ {p.price.toFixed(2)} • Qtde: {it.qty}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => dec(it.id)} className="px-2 py-1 rounded border">-</button>
                      <button onClick={() => add(it.id)} className="px-2 py-1 rounded border">+</button>
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
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">Finalizar compra</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
