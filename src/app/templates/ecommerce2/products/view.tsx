"use client";

import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../catalog";
import Filters, { type FiltersState } from "./Filters";
import HeroCarousel from "./HeroCarousel";
import { useCart } from "../CartContext";
import { useToast } from "../Toast";
import ProductCard from "../components/ProductCard";
import { getPriceBounds, priceWindow, resolveBrand, resolveCategory } from "../utils/catalog";

type Favorites = Record<string, boolean>;

const PRICE_BOUNDS = getPriceBounds(PRODUCTS);

export default function ProductsView() {
  const { add } = useCart();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorites>({});
  const [filters, setFilters] = useState<FiltersState>({ categories: [], brands: [], priceRange: PRICE_BOUNDS });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  const filtered = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const category = resolveCategory(product.name);
      const brand = resolveBrand(product.name);
      const [minPrice, maxPrice] = priceWindow(product);
      const categoryOk = filters.categories.length ? filters.categories.includes(category) : true;
      const brandOk = filters.brands.length ? filters.brands.includes(brand) : true;
      const priceOk = minPrice <= filters.priceRange[1] && maxPrice >= filters.priceRange[0];
      return categoryOk && brandOk && priceOk;
    });
  }, [filters]);

  return (
    <main className="min-h-[60vh] bg-white text-gray-900">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <HeroCarousel className="mb-8" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-card-foreground">Coleção completa</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="inline-flex h-9 items-center gap-2 rounded-md border px-4 text-sm shadow-sm lg:hidden"
            >
              Filtros
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-card py-6 text-card-foreground">
            <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
              <div className="text-sm text-muted-foreground">Pedidos no último drop</div>
              <div className="text-2xl font-semibold lg:text-3xl">+480</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-8">
          <div className="hidden lg:block">
            <Filters values={filters} onChange={setFilters} allCategories={categories} allBrands={brands} priceBounds={PRICE_BOUNDS} />
          </div>

          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">{filtered.length} produtos encontrados</div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={!!favorites[product.id]}
                  onToggleFavorite={() => setFavorites((prev) => ({ ...prev, [product.id]: !prev[product.id] }))}
                  onAdd={(sku) => {
                    add(product.id, 1, sku);
                    toast({ title: "Adicionado ao carrinho", description: product.name });
                  }}
                  detailHref={`/templates/ecommerce2/products/${product.id}`}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>

        {showMobileFilters && (
          <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setShowMobileFilters(false)}>
            <div className="absolute left-0 top-0 h-full w-72 bg-background p-4" onClick={(e) => e.stopPropagation()}>
              <Filters
                values={filters}
                onChange={setFilters}
                allCategories={categories}
                allBrands={brands}
                priceBounds={PRICE_BOUNDS}
                onClose={() => setShowMobileFilters(false)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

