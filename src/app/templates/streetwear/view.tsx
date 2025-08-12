'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PRODUCTS } from './catalog';

type CartItem = { id: string; qty: number };

// (swatches removed for now; can be reintroduced under each product card)

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
    <main className="bg-white text-gray-900">
      {/* Utility bar */}
      <div className="bg-black text-white text-[11px] tracking-wide">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-center text-center">
          Frete grátis para Brasil em todos os pedidos acima de R$ 600
        </div>
      </div>

      {/* Category nav */}
      <div className="border-b sticky top-0 z-20 bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-12 hidden md:flex items-center gap-6 text-[13px]">
          {['FEATURED','JORDAN','ADIDAS','NIKE','NEW BALANCE','ASICS','MENS','WOMENS','KIDS','APPAREL','COLLECTIBLES','BRANDS'].map((c) => (
            <a key={c} href="#" className="hover:text-black">{c}</a>
          ))}
          <div className="ml-auto text-gray-500">Search</div>
        </div>
      </div>

      {/* Hero heading */}
      <section className="relative overflow-hidden">
        <div className="h-40 sm:h-48 lg:h-56 bg-gray-900 text-white grid place-items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest">STREETWEAR</h1>
        </div>
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white border text-sm">
              <span aria-hidden>▾</span> FILTER BY
            </button>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14">
            {PRODUCTS.map((p) => {
              const isShoe = /adidas|vans|nb-480/.test(p.id);
              return (
              <Link href={`/templates/streetwear/${p.id}`} key={p.id} className="text-center block group">
                <div className={(isShoe ? 'aspect-[4/3]' : 'aspect-[3/4]') + ' bg-gray-100 rounded overflow-hidden grid place-items-center'}>
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={isShoe ? 800 : 600}
                      height={isShoe ? 600 : 800}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className={'w-full h-full transition-transform duration-200 group-hover:scale-[1.02] ' + (isShoe ? 'object-contain p-4' : 'object-cover')}
                      priority={p.id === 'tee-worldwide'}
                    />
                  ) : null}
                </div>
                <div className="mt-3 text-xs tracking-widest text-gray-500 font-semibold" aria-label="categoria">{p.name.split('–')[0]?.trim().toUpperCase()}</div>
                <div className="text-sm font-semibold" aria-label="nome do produto">{p.name.split('–')[1]?.trim() || p.name}</div>
                <div className="text-xs text-gray-500">R$ {p.price.toFixed(0)}</div>
                <button onClick={(e) => { e.preventDefault(); add(p.id); }} className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded border text-sm">Adicionar</button>
              </Link>
            );})}
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
