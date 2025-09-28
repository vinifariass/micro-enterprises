"use client";

import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export type FiltersState = {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
};

type FiltersProps = {
  values: FiltersState;
  onChange: (next: FiltersState) => void;
  onClose?: () => void;
  allCategories: string[];
  allBrands: string[];
  priceBounds?: [number, number];
};

export default function Filters({ values, onChange, onClose, allCategories, allBrands, priceBounds }: FiltersProps) {
  const [open, setOpen] = React.useState({
    categories: true,
    brands: true,
    price: true,
    colors: true,
    sizes: true,
    rating: true,
  });
  const [range, setRange] = React.useState<[number, number]>(values.priceRange);

  React.useEffect(() => {
    setRange(values.priceRange);
  }, [values.priceRange]);

  const toggleIn = (key: keyof FiltersState) => (value: string) => {
    const set = new Set(values[key] as string[]);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    onChange({ ...values, [key]: Array.from(set) });
  };

  const handleRangeChange = (next: [number, number]) => {
    setRange(next);
    onChange({ ...values, priceRange: next });
  };

  const minPrice = priceBounds?.[0] ?? 0;
  const maxPrice = priceBounds?.[1] ?? 1000;

  return (
    <aside className="w-64 shrink-0">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        {onClose && (
          <button onClick={onClose} className="rounded-md border px-2.5 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground lg:hidden">
            Fechar
          </button>
        )}
      </div>

      <div className="space-y-1">
        {/* Price */}
        <section className="w-full">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-sm font-medium">Preço</h3>
            <button type="button" onClick={() => setOpen((o) => ({ ...o, price: !o.price }))} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              {open.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {open.price && (
            <div className="pb-4">
              <div className="text-xs text-muted-foreground">R$ {range[0].toFixed(0)} - R$ {range[1].toFixed(0)}</div>
              <div className="mt-3 space-y-2">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={range[0]}
                  onChange={(e) => {
                    const nextMin = Math.min(Number(e.target.value), range[1] - 10);
                    handleRangeChange([nextMin, range[1]]);
                  }}
                  className="w-full"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={range[1]}
                  onChange={(e) => {
                    const nextMax = Math.max(Number(e.target.value), range[0] + 10);
                    handleRangeChange([range[0], nextMax]);
                  }}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </section>

        <div className="bg-border h-px w-full" />

        {/* Categories */}
        <section className="w-full">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-sm font-medium">Categorias</h3>
            <button type="button" onClick={() => setOpen((o) => ({ ...o, categories: !o.categories }))} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              {open.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {open.categories && (
            <div className="pb-4 space-y-2">
              {allCategories.map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={values.categories.includes(cat)}
                    onChange={() => toggleIn("categories")(cat)}
                    className="size-4 rounded border-input"
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </section>

        <div className="bg-border h-px w-full" />

        {/* Brands */}
        <section className="w-full">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-sm font-medium">Marcas</h3>
            <button type="button" onClick={() => setOpen((o) => ({ ...o, brands: !o.brands }))} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              {open.brands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {open.brands && (
            <div className="pb-4 space-y-2">
              {allBrands.map((brand) => (
                <label key={brand} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={values.brands.includes(brand)}
                    onChange={() => toggleIn("brands")(brand)}
                    className="size-4 rounded border-input"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </section>

        <div className="bg-border h-px w-full" />

        {/* Colors (UI only for now) */}
        <section className="w-full">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-sm font-medium">Cores</h3>
            <button type="button" onClick={() => setOpen((o) => ({ ...o, colors: !o.colors }))} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              {open.colors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {open.colors && (
            <div className="pb-4">
              <div className="grid grid-cols-4 gap-2">
                {["#000", "#fff", "#f00", "#00f", "#0f0", "#ff0", "#800080", "#ffa500"].map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-input" style={{ backgroundColor: c }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="bg-border h-px w-full" />

        {/* Sizes (UI only for now) */}
        <section className="w-full">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-sm font-medium">Tamanhos</h3>
            <button type="button" onClick={() => setOpen((o) => ({ ...o, sizes: !o.sizes }))} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              {open.sizes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {open.sizes && (
            <div className="pb-4 grid grid-cols-3 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                <button key={s} className="rounded-md border px-3 h-8 text-sm hover:bg-accent hover:text-accent-foreground">{s}</button>
              ))}
            </div>
          )}
        </section>

        <div className="bg-border h-px w-full" />

        {/* Rating (UI only for now) */}
        <section className="w-full">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-sm font-medium">Avaliações</h3>
            <button type="button" onClick={() => setOpen((o) => ({ ...o, rating: !o.rating }))} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
              {open.rating ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          {open.rating && (
            <div className="pb-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <StarRow count={4} /> <span>&amp; acima</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRow count={3} /> <span>&amp; acima</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRow count={2} /> <span>&amp; acima</span>
              </div>
              <div className="flex items-center gap-2">
                <StarRow count={1} /> <span>&amp; acima</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </aside>
  );
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      ))}
    </div>
  );
}


