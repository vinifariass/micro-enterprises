"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PRODUCTS } from "../catalog";

type Selected = Record<string, boolean>;

export default function ProductsView() {
  const [selected, setSelected] = useState<Selected>({});
  const allChecked = useMemo(() => PRODUCTS.length > 0 && PRODUCTS.every(p => selected[p.id]), [selected]);
  const anyChecked = useMemo(() => Object.values(selected).some(Boolean), [selected]);

  const toggleAll = () => {
    if (allChecked) setSelected({});
    else {
      const next: Selected = {};
      PRODUCTS.forEach(p => { next[p.id] = true; });
      setSelected(next);
    }
  };

  const onToggle = (id: string) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="bg-white text-gray-900 min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-card-foreground">Produtos</h1>
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={allChecked} onChange={toggleAll} className="size-4 rounded border-gray-300" />
              Selecionar todos
            </label>
            <button disabled={!anyChecked} className="inline-flex items-center gap-2 h-9 px-3 rounded-md border text-sm shadow-sm disabled:opacity-50">
              Remover selecionados
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="bg-card text-card-foreground rounded-xl border py-6">
            <div className="px-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5">
              <div className="text-sm text-muted-foreground">Total Sales</div>
              <div className="font-semibold text-2xl lg:text-3xl">$30,230</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="product-card">
              <label className="absolute left-2 top-2 z-10 inline-flex items-center gap-2 rounded-full bg-white/80 px-2 py-1 text-xs shadow-sm">
                <input type="checkbox" checked={!!selected[p.id]} onChange={() => onToggle(p.id)} className="size-4 rounded border-gray-300" />
                Selecionar
              </label>
              <Link className="product-card__link" href={`/templates/ecommerce2/products/${p.id}`}>
                <figure className="product-card__figure">
                  {p.image && (
                    <Image src={p.image} alt={p.name} width={800} height={800} className="product-card__image" />
                  )}
                </figure>
              </Link>
              <div className="product-card__info">
                <div>
                  <h3 className="product-card__title" title={p.name}>{p.name}</h3>
                  <p className="product-card__category">{/tee|shirt|camiseta/i.test(p.name) ? 'Apparel' : 'Sneakers'}</p>
                </div>
                <p className="product-card__price">R$ {p.price.toFixed(2)}</p>
              </div>
              <div className="product-card__actions">
                <button className="product-card__button product-card__button--wishlist" aria-label="Favoritar">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.74 0-3.41.81-4.5 2.09A6.02 6.02 0 0 0 8.5 4 4.5 4.5 0 0 0 4 8.5C4 10.79 5.5 12.54 7 14l5 5Z"/></svg>
                </button>
                <button className="product-card__button product-card__button--add-to-cart">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
