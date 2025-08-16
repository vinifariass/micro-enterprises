"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "../../catalog";
import { useCart } from "../../CartContext";

const SIZES = ["P", "M", "G", "GG", "GGG"];

export default function ProductDetailView({ product }: { product: Product }) {
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string | null>("M");
  const [qty, setQty] = useState(1);

  const gallery = product.images?.length ? product.images : product.image ? [product.image] : [];

  return (
    <main className="bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* header */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-card-foreground">{product.name}</h1>
            <div className="text-sm text-muted-foreground inline-flex flex-col gap-2 lg:flex-row lg:gap-4">
              <div><span className="text-gray-800 font-semibold">Seller :</span> Acme Store</div>
              <div><span className="text-gray-800 font-semibold">Published :</span> 20 Oct, 2024</div>
              <div><span className="text-gray-800 font-semibold">SKU :</span> {product.id.toUpperCase()}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 rounded-md bg-black text-white text-sm shadow-sm">Editar</button>
            <button className="size-9 rounded-md bg-red-500/90 text-white shadow-sm grid place-items-center" aria-label="Excluir">🗑️</button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          {/* Gallery column */}
          <div className="min-w-0 xl:col-span-1">
            <div className="sticky top-20 space-y-3">
              <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <div className="aspect-[3/2] w-full bg-white grid place-items-center lg:aspect-square">
                  {gallery[active] && (
                    <Image src={gallery[active]} alt={product.name} width={1200} height={900} className="w-full h-full object-contain p-4" />
                  )}
                </div>
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
                  {gallery.map((src, i) => (
                    <button key={src} onClick={() => setActive(i)} className={"relative aspect-square rounded-lg border overflow-hidden bg-white " + (active===i ? "ring-2 ring-black" : "border-gray-200") }>
                      <Image src={src} alt={product.name} fill sizes="120px" className="object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info column */}
          <div className="space-y-4 xl:col-span-2">
            {/* KPI cards */}
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Preço", value: `R$ ${product.price.toFixed(2)}` },
                { label: "Nº Pedidos", value: "250" },
                { label: "Estoque", value: "2.550" },
                { label: "Receita", value: "R$ 45.938" },
              ].map((k, i) => (
                <div key={i} className="hover:border-gray-300 bg-gray-50 grid auto-cols-max grid-flow-col gap-3 rounded-lg border border-gray-200 p-4">
                  <div className="text-gray-400">★</div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{k.label}</span>
                    <span className="text-base font-semibold">{k.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main card */}
            <div className="bg-white rounded-xl border border-gray-200 py-6">
              <div className="px-6 grid items-start gap-8 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2">
                  <div>
                    <h3 className="mb-2 font-semibold">Descrição:</h3>
                    <p className="text-sm text-muted-foreground">Peça inspirada em streetwear com caimento confortável. Material de alta qualidade com excelente acabamento.</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Destaques:</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Conforto para o dia a dia</li>
                      <li>Acabamento premium</li>
                      <li>Design moderno</li>
                      <li>Tecido respirável</li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-md border border-gray-200 bg-card text-card-foreground">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Categoria</td><td className="p-2 text-right">{/tee|shirt|camiseta/i.test(product.name) ? 'T-Shirt' : 'Sneakers'}</td></tr>
                      <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Marca</td><td className="p-2 text-right">Acme</td></tr>
                      <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Cor</td><td className="p-2 text-right">Preto</td></tr>
                      <tr><td className="p-2 font-semibold">Peso</td><td className="p-2 text-right">140 g</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="px-6 grid grid-cols-1 gap-8 mt-6 lg:grid-cols-2">
                <div>
                  <div className="mb-3 font-semibold">Cores:</div>
                  <div className="flex gap-2">
                    {["#22c55e", "#6366f1", "#a855f7"].map((c) => (
                      <span key={c} className="inline-block size-8 rounded-full border border-gray-200" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-3 font-semibold">Tamanhos:</div>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((s) => (
                      <button key={s} onClick={() => setSize(s)} className={(size===s ? "border-black bg-black/5 " : "") + "flex size-10 items-center justify-center rounded-md border border-gray-300 text-xs uppercase"}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pt-4 flex items-center gap-3">
                <div className="inline-flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty-1))} className="px-3 py-2">-</button>
                  <div className="w-10 text-center">{qty}</div>
                  <button onClick={() => setQty(qty+1)} className="px-3 py-2">+</button>
                </div>
                <button onClick={() => add(product.id, qty)} className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-black text-white text-sm shadow-sm">Adicionar ao carrinho</button>
                <button className="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-gray-300 text-sm shadow-sm">❤️ Favorito</button>
              </div>
            </div>

            {/* Reviews placeholder */}
            <div className="bg-white rounded-xl border border-gray-200 py-6">
              <div className="px-6 flex items-center justify-between">
                <div className="font-semibold">Avaliações</div>
                <button className="h-9 px-4 rounded-md border border-gray-300 text-sm shadow-sm">Escrever avaliação</button>
              </div>
              <div className="px-6 mt-4 grid gap-4">
                {["Ótima qualidade", "Design bonito", "Pode melhorar"].map((title, i) => (
                  <div key={i} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-grid place-items-center size-10 rounded-full bg-gray-100 text-gray-600">{["M","J","L"][i]}</span>
                      <div className="grid gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-medium">{["Marcos", "Julia", "Lucas"][i]}</div>
                          <div className="text-xs text-muted-foreground">{["5 dias", "2 semanas", "1 mês"][i]} atrás</div>
                        </div>
                        <div className="text-sm font-semibold">{title}</div>
                        <div className="text-sm text-muted-foreground">Produto conforme descrito. Muito satisfeito com a compra.</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <Link href="/templates/ecommerce2/products" className="hover:underline">Voltar para produtos</Link>
        </div>
      </div>
    </main>
  );
}
