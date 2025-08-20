"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../catalog";
import Filters, { type FiltersState } from "./Filters";
import HeroCarousel from "./HeroCarousel";
import { useCart } from "../CartContext";
import { useToast } from "../Toast";

type Favorites = Record<string, boolean>;

export default function ProductsView() {
  const { add } = useCart();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorites>({});
  const [filters, setFilters] = useState<FiltersState>({ categories: [], brands: [] });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  // Load and persist favorites in localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("e2.favorites");
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("e2.favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);
  const onToggleFav = (id: string) => setFavorites(prev => ({ ...prev, [id]: !prev[id] }));

  // Derive categories/brands from product names (simple heuristic for demo)
  const categories = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach(p => set.add(/tee|shirt|camiseta/i.test(p.name) ? "Clothing" : "Shoes"));
    return Array.from(set);
  }, []);
  const brands = ["Adidas", "Vans", "New Balance", "Batman"];

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const cat = /tee|shirt|camiseta/i.test(p.name) ? "Clothing" : "Shoes";
      const brand = /adidas/i.test(p.name)
        ? "Adidas"
        : /vans/i.test(p.name)
        ? "Vans"
        : /new balance/i.test(p.name)
        ? "New Balance"
        : /batman/i.test(p.name)
        ? "Batman"
        : "";

      const catOk = filters.categories.length ? filters.categories.includes(cat) : true;
      const brandOk = filters.brands.length ? (brand && filters.brands.includes(brand)) : true;
      return catOk && brandOk;
    });
  }, [filters]);

  return (
    <main className="bg-white text-gray-900 min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero carousel */}
        <HeroCarousel className="mb-8" />

        <div className="flex flex-wrap items-center gap-3 justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-card-foreground">Shop Products</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowMobileFilters(true)} className="lg:hidden inline-flex items-center gap-2 h-9 px-4 rounded-md border text-sm shadow-sm">Filters</button>
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

        <div className="mt-6 flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <Filters values={filters} onChange={setFilters} allCategories={categories} allBrands={brands} />
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">{filtered.length} products found</div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((p) => {
            const firstInStockSku = p.variants?.find(v => (v.stock ?? 0) > 0)?.sku;
            const hasVariants = !!p.variants?.length;
            const priceDisplay = hasVariants && p.variants?.some(v => v.priceOverride && v.priceOverride !== p.price)
              ? `R$ ${Math.min(p.price, ...p.variants!.map(v => v.priceOverride ?? p.price)).toFixed(2)}+`
              : `R$ ${p.price.toFixed(2)}`;
            const outOfStock = hasVariants && !firstInStockSku;
            return (
            <div key={p.id} className="product-card">
              {/* Favorite heart overlay */}
              <button
                type="button"
                aria-label={favorites[p.id] ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                aria-pressed={!!favorites[p.id]}
                className="product-card__fav"
                onClick={() => onToggleFav(p.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-heart ${favorites[p.id] ? 'text-primary' : ''}`}>
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.74 0-3.41.81-4.5 2.09A6.02 6.02 0 0 0 8.5 4 4.5 4.5 0 0 0 4 8.5C4 10.79 5.5 12.54 7 14l5 5Z" fill={favorites[p.id] ? 'currentColor' : 'none'} />
                </svg>
              </button>
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
        <p className="product-card__price">{priceDisplay}</p>
              </div>
              <div className="product-card__actions">
        <button disabled={outOfStock} className="product-card__button product-card__button--add-to-cart disabled:opacity-50" onClick={() => { add(p.id, 1, firstInStockSku); toast({ title: "Adicionado ao carrinho", description: p.name }); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
      );})}
            </div>
          </div>
        </div>

        {/* Mobile filters panel */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setShowMobileFilters(false)}>
            <div className="absolute left-0 top-0 h-full w-72 bg-background p-4" onClick={(e) => e.stopPropagation()}>
              <Filters values={filters} onChange={setFilters} allCategories={categories} allBrands={brands} onClose={() => setShowMobileFilters(false)} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
