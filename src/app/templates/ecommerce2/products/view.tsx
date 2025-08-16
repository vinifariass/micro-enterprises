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
            <div key={p.id} data-slot="card" className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <label className="absolute left-2 top-2 z-10 inline-flex items-center gap-2 rounded-full bg-white/80 px-2 py-1 text-xs shadow-sm">
                <input type="checkbox" checked={!!selected[p.id]} onChange={() => onToggle(p.id)} className="size-4 rounded border-gray-300" />
                Selecionar
              </label>
              <Link className="block" href={`/templates/ecommerce2/products/${p.id}`}>
                <figure className="aspect-square w-full bg-gray-50">
                  {p.image && (
                    <Image src={p.image} alt={p.name} width={800} height={800} className="aspect-square w-full object-contain" />
                  )}
                </figure>
              </Link>
              <div data-slot="card-content" className="px-4 py-3">
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-tight truncate" title={p.name}>{p.name}</h3>
                    <p className="text-xs text-gray-500">{/tee|shirt|camiseta/i.test(p.name) ? 'Apparel' : 'Sneakers'}</p>
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap">R$ {p.price.toFixed(2)}</p>
                </div>
              </div>
              <div data-slot="card-footer" className="border-t border-gray-200 px-4 py-3">
                <button className="inline-flex items-center justify-center w-full h-9 rounded-md text-sm border shadow-sm bg-white hover:bg-gray-50">
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
