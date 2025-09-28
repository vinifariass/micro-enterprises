"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "./CartContext";
import type { CartState } from "./CartContext";
import { useToast } from "./Toast";
import type { ToastOptions } from "./Toast";
import { PRODUCTS, type Product } from "./catalog";
import Filters, { type FiltersState } from "./products/Filters";
import ProductCard from "./components/ProductCard";
import { getPriceBounds, priceWindow, resolveBrand, resolveCategory } from "./utils/catalog";

const PRICE_BOUNDS = getPriceBounds(PRODUCTS);

const COLLECTION_FILTERS: Array<{ label: string; categories: string[] }> = [
  { label: "Novidades", categories: [] },
  { label: "Sneakers", categories: ["Sneakers"] },
  { label: "Apparel", categories: ["Apparel"] },
];

const SORT_OPTIONS = [
  { label: "Mais desejados", value: "featured" },
  { label: "Preço: menor", value: "price-asc" },
  { label: "Preço: maior", value: "price-desc" },
  { label: "Nome A-Z", value: "name" },
];

const CUSTOM_COLLECTION = "Custom";

type ToastFn = (opts: ToastOptions) => void;

export default function Storefront() {
  const { add } = useCart();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FiltersState>({ categories: [], brands: [], priceRange: PRICE_BOUNDS });
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState<string>(COLLECTION_FILTERS[0]?.label ?? "Novidades");
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0]?.value ?? "featured");

  const categories = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => set.add(resolveCategory(p.name)));
    return Array.from(set);
  }, []);
  const brands = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => set.add(resolveBrand(p.name)));
    return Array.from(set);
  }, []);

  const handleFiltersChange = (next: FiltersState) => {
    setFilters(next);
    const matched = COLLECTION_FILTERS.find((entry) => arraysEqual(entry.categories, next.categories));
    setActiveCollection(matched ? matched.label : CUSTOM_COLLECTION);
  };

  const filtered = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const category = resolveCategory(product.name);
      const brand = resolveBrand(product.name);
      const [minPrice, maxPrice] = priceWindow(product);
      const categoryOk = filters.categories.length ? filters.categories.includes(category) : true;
      const brandOk = filters.brands.length ? filters.brands.includes(brand) : true;
      const priceOk = minPrice <= filters.priceRange[1] && maxPrice >= filters.priceRange[0];
      const searchOk = search ? product.name.toLowerCase().includes(search.toLowerCase()) : true;
      return categoryOk && brandOk && priceOk && searchOk;
    });
  }, [filters, search]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => priceWindow(a)[0] - priceWindow(b)[0]);
      case "price-desc":
        return list.sort((a, b) => priceWindow(b)[1] - priceWindow(a)[1]);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [filtered, sort]);

  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <AnnouncementBar />
        <Hero onPrimaryCta={() => handleFiltersChange({ ...filters, categories: [] })} />
        <FlashSaleHighlight />

        <section className="mt-10 flex flex-wrap items-center gap-3">
          {COLLECTION_FILTERS.map((collection) => (
            <button
              key={collection.label}
              onClick={() => handleFiltersChange({ ...filters, categories: collection.categories })}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                activeCollection === collection.label ? "bg-black text-white" : "bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {collection.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <label htmlFor="search" className="hidden sm:block">
              Buscar
            </label>
            <input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Procure por camisetas, tênis, drops..."
              className="h-9 min-w-[220px] rounded-full border border-input bg-white px-4 text-sm transition focus-visible:border-black focus-visible:outline-none"
            />
            <button
              className="inline-flex h-9 items-center rounded-full border px-4 text-sm shadow-sm lg:hidden"
              onClick={() => setShowFilters(true)}
            >
              Filtros
            </button>
          </div>
        </section>

        <section id="colecao" className="mt-10 flex gap-8">
          <div className="hidden lg:block">
            <Filters values={filters} onChange={handleFiltersChange} allCategories={categories} allBrands={brands} priceBounds={PRICE_BOUNDS} />
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {sorted.length} peças selecionadas para sua vibe streetwear
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 rounded-full border border-input bg-white px-4 text-sm"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {sorted.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={(sku) => handleAdd(product, sku, add, toast)}
                  detailHref={`/templates/ecommerce2/${product.id}`}
                  variant="storefront"
                />
              ))}
            </div>

            {sorted.length === 0 && (
              <div className="rounded-2xl border border-dashed p-12 text-center text-sm text-muted-foreground">
                Nenhum produto corresponde aos filtros. Ajuste as opções e tente novamente.
              </div>
            )}
          </div>
        </section>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)}>
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Refinar busca</h2>
              <button onClick={() => setShowFilters(false)} className="text-sm text-muted-foreground hover:text-gray-900">
                Fechar
              </button>
            </div>
            <Filters
              values={filters}
              onChange={handleFiltersChange}
              allCategories={categories}
              allBrands={brands}
              priceBounds={PRICE_BOUNDS}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function handleAdd(product: Product, sku: string | undefined, add: CartState["add"], toast: ToastFn) {
  add(product.id, 1, sku);
  toast({ title: "Adicionado à sacola", description: product.name });
}

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((item, index) => item === sortedB[index]);
}

function FlashSaleHighlight() {
  return (
    <section className="relative mt-12 overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-rose-200/50 via-white to-transparent" />
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="relative order-last lg:order-first">
          <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-2xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1200&auto=format&fit=crop"
                alt="Flash sale product"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 -z-10 h-40 w-40 rounded-full bg-rose-200/40 blur-3xl" />
        </div>
        <div className="text-center lg:text-left">
          <span className="mb-4 inline-flex items-center justify-center rounded-md bg-rose-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Flash Sale
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Don&apos;t Miss Out!</h2>
          <p className="mt-4 text-base text-gray-600">
            Limited time offer on our best-selling gaming monitor. Get 40% off while stocks last. Sale ends soon!
          </p>
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">Time Remaining</h3>
            <div className="mt-4 flex justify-center gap-4 sm:gap-6 lg:justify-start">
              {[
                { label: "days", value: "94" },
                { label: "hours", value: "11" },
                { label: "minutes", value: "26" },
                { label: "seconds", value: "04" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <span className="text-2xl font-semibold text-gray-900 sm:text-3xl">{item.value}</span>
                  <span className="text-xs uppercase text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <button className="inline-flex h-10 w-full items-center justify-center rounded-md bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90 sm:w-auto">
              Shop the Sale
            </button>
            <Link
              href="/templates/ecommerce2/products"
              className="inline-flex h-10 w-full items-center justify-center rounded-md border border-gray-300 px-6 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 sm:w-auto"
            >
              View Product Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnnouncementBar() {
  return (
    <div className="mb-6 flex items-center justify-between rounded-full border border-dashed border-gray-300 bg-white/70 px-6 py-2 text-xs uppercase tracking-[0.3em] text-gray-600">
      <span>Drop exclusivo FW25 liberado</span>
      <span className="hidden sm:inline-flex items-center gap-2 text-gray-500">
        Frete grátis acima de R$ 600
      </span>
    </div>
  );
}

function Hero({ onPrimaryCta }: { onPrimaryCta: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-700 px-6 py-12 text-white sm:px-10 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">High Street Lab · Drop 07</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Coleção Winter Drop com sizing premium</h1>
          <p className="max-w-lg text-sm text-white/80">
            Peças em algodão pesado, lavagens exclusivas e sneakers selecionados para elevar seu outfit.
            Garanta o seu antes de esgotar.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onPrimaryCta}
              className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/80"
            >
              Ver novidades
            </button>
            <a
              href="#colecao"
              className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver coleção completa
            </a>
          </div>
        </div>
        <div className="relative hidden justify-end lg:flex">
          <div className="relative h-64 w-64 rotate-3 overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl shadow-black/30">
            <Image src="/images/streetwear/tee-worldwide.jpg" alt="Camiseta destaque" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-6 hidden h-48 w-48 -rotate-6 overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl shadow-black/30 lg:block">
            <Image src="/images/streetwear/adidas-grey-gum.jpg" alt="Sneaker destaque" fill className="object-cover" />
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-3 text-xs uppercase tracking-[0.3em] text-white/70 sm:grid-cols-3">
        <span>Drop semanal · 20:00</span>
        <span>Pagamentos com Stripe · 3x sem juros*</span>
        <span>Embalagem colecionável</span>
      </div>
    </section>
  );
}














