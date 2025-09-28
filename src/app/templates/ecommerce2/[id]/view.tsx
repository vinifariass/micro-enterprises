"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../streetwear/catalog";
import { useCart } from "../CartContext";
import type { CartState } from "../CartContext";
import { useToast } from "../Toast";
import type { ToastOptions } from "../Toast";
import { priceWindow, resolveBrand, resolveCategory } from "../utils/catalog";

type ToastFn = (opts: ToastOptions) => void;

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const { toast } = useToast();

  const gallery = product.images?.length ? product.images : product.image ? [product.image] : [];
  const isSneaker = /adidas|vans|nb-480/i.test(product.id);
  const sizes = useMemo(() => Array.from(new Set(product.variants?.map((v) => v.size).filter(Boolean) as string[])), [product.variants]);
  const colors = useMemo(() => Array.from(new Set(product.variants?.map((v) => v.color).filter(Boolean) as string[])), [product.variants]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] ?? null);
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0] ?? null);
  const [qty, setQty] = useState(1);

  const matchingVariant = useMemo(
    () =>
      product.variants?.find((variant) =>
        (selectedSize ? variant.size === selectedSize : true) &&
        (selectedColor ? variant.color === selectedColor : true)
      ),
    [product.variants, selectedSize, selectedColor]
  );

  const maxStock = matchingVariant?.stock ?? product.variants?.reduce((sum, variant) => sum + (variant.stock ?? 0), 0) ?? 10;
  const price = matchingVariant?.priceOverride ?? product.price;
  const brand = resolveBrand(product.name);
  const category = resolveCategory(product.name);
  const [minPrice, maxPrice] = priceWindow(product);

  useEffect(() => {
    setQty((current) => Math.min(Math.max(current, 1), Math.max(1, maxStock)));
  }, [maxStock]);

  const disableAdd = product.variants?.length ? !matchingVariant || (matchingVariant.stock ?? 0) === 0 : false;

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-10">
        <Breadcrumbs brand={brand} category={category} />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Gallery gallery={gallery} active={activeImage} onChange={setActiveImage} isSneaker={isSneaker} />
          <section>
            <header className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">{brand}</p>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{product.name}</h1>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>SKU {matchingVariant?.sku ?? product.id.toUpperCase()}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden />
                <span>Estoque {matchingVariant?.stock ?? maxStock}</span>
              </div>
              <PriceDisplay price={price} minPrice={minPrice} maxPrice={maxPrice} />
            </header>

            <section className="mt-8 space-y-6">
              {colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gray-500">
                    Cor
                    <span className="rounded-full border border-gray-200 px-3 py-1 text-[11px] normal-case tracking-normal text-gray-600">
                      {selectedColor ?? colors[0]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                          selectedColor === color ? "bg-black text-white" : "bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gray-500">
                  Tamanho
                  <Link href="#" className="text-[11px] normal-case tracking-normal text-gray-600 underline">
                    Guia de medidas
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(sizes.length ? sizes : ["Único"]).map((sizeOption) => (
                    <button
                      key={sizeOption}
                      onClick={() => setSelectedSize(sizeOption === "Único" ? null : sizeOption)}
                      className={`min-w-12 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                        selectedSize === sizeOption || (sizeOption === "Único" && !selectedSize)
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {sizeOption}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-xs uppercase tracking-[0.3em] text-gray-500">Quantidade</div>
                <div className="inline-flex items-center rounded-full border">
                  <button onClick={() => setQty((current) => Math.max(1, current - 1))} className="px-4 py-2 text-lg" aria-label="Diminuir quantidade">
                    −
                  </button>
                  <span className="min-w-10 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((current) => Math.min(Math.max(1, maxStock), current + 1))}
                    className="px-4 py-2 text-lg"
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">{Math.max(0, maxStock)} unidades disponíveis</span>
              </div>

              <div className="space-y-3">
                <button
                  disabled={disableAdd}
                  onClick={() => handleAdd(product, matchingVariant?.sku, qty, add, toast)}
                  className="w-full rounded-full bg-black py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                >
                  Adicionar à sacola
                </button>
                <button className="w-full rounded-full border border-gray-300 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-gray-700 transition hover:border-black hover:text-black">
                  Comprar com 1 clique (em breve)
                </button>
                {disableAdd && <p className="text-xs text-red-500">Selecione uma combinação disponível para continuar.</p>}
              </div>
            </section>

            <section className="mt-10 grid gap-6 rounded-3xl border border-gray-200 bg-white/80 p-6 text-sm text-gray-600">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Detalhes</h2>
                <p className="mt-2 leading-relaxed text-gray-700">
                  Modelagem oversized, algodão premium 240g e lavagem especial. Desenvolvida no Brasil com acabamento manual.
                </p>
              </div>
              <ul className="grid gap-2 text-gray-600 sm:grid-cols-2">
                <li>• Malha penteada pré-encolhida</li>
                <li>• Etiqueta comemorativa exclusiva</li>
                <li>• Embalagem colecionável</li>
                <li>• Garantia de 30 dias</li>
              </ul>
              <div className="grid gap-1 text-xs text-gray-500 sm:grid-cols-2">
                <InfoRow label="Categoria" value={category} />
                <InfoRow label="Marca" value={brand} />
                <InfoRow label="Código" value={matchingVariant?.sku ?? product.id.toUpperCase()} />
                <InfoRow label="Composição" value={isSneaker ? "Couro sintético e mesh" : "100% algodão"} />
              </div>
            </section>

            <section className="mt-8 grid gap-4 rounded-3xl border border-gray-200 bg-white/70 p-6 text-sm text-gray-600 md:grid-cols-3">
              <Feature icon="🚚" title="Envio express">Postagem em até 24h para todo Brasil.</Feature>
              <Feature icon="♻️" title="Troca garantida">30 dias para ajuste ou devolução.</Feature>
              <Feature icon="💳" title="Stripe Checkout">Parcelamento em até 3x sem juros.</Feature>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}

function handleAdd(product: Product, sku: string | undefined, qty: number, add: CartState["add"], toast: ToastFn) {
  add(product.id, qty, sku);
  toast({ title: "Adicionado à sacola", description: `${qty}× ${product.name}` });
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-full border border-gray-200 bg-white px-4 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function Feature({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <span className="text-lg" aria-hidden>{icon}</span>
      <div>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <p className="text-xs text-gray-500">{children}</p>
      </div>
    </div>
  );
}

function Breadcrumbs({ brand, category }: { brand: string; category: string }) {
  return (
    <nav className="mb-8 text-xs uppercase tracking-[0.25em] text-gray-500" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/templates/ecommerce2" className="transition hover:text-black">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/templates/ecommerce2/products" className="transition hover:text-black">
            {category}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="text-gray-700">{brand}</li>
      </ol>
    </nav>
  );
}

function Gallery({ gallery, active, onChange, isSneaker }: { gallery: string[]; active: number; onChange: (index: number) => void; isSneaker: boolean }) {
  return (
    <section className="space-y-4">
      <div className={`relative overflow-hidden rounded-3xl border border-gray-200 bg-white ${isSneaker ? "aspect-[4/3]" : "aspect-square"}`}>
        {gallery[active] && (
          <Image
            src={gallery[active]}
            alt="Produto"
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 60vw, 100vw"
            className="object-contain p-6"
          />
        )}
      </div>
      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6">
          {gallery.map((src, index) => (
            <button
              key={src}
              onClick={() => onChange(index)}
              className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
                active === index ? "border-black" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image src={src} alt="Miniatura" fill sizes="120px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function PriceDisplay({ price, minPrice, maxPrice }: { price: number; minPrice: number; maxPrice: number }) {
  const isRange = minPrice !== maxPrice;
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-bold text-gray-900">R$ {price.toFixed(2)}</span>
      {isRange && <span className="text-xs uppercase tracking-[0.3em] text-gray-400">varia conforme combinação</span>}
    </div>
  );
}

