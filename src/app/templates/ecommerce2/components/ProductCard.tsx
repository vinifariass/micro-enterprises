"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "../catalog";

type ProductCardProps = {
  product: Product;
  onAdd: (sku?: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  detailHref?: string;
  variant?: "storefront" | "compact";
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const RATING_MAP: Record<string, { rating: number; reviews: number }> = {
  "tee-worldwide": { rating: 4.8, reviews: 128 },
  "tee-open-mind": { rating: 4.7, reviews: 156 },
  "tee-batman": { rating: 4.5, reviews: 98 },
  "adidas-grey-gum": { rating: 4.9, reviews: 256 },
  "vans-old-skool": { rating: 4.7, reviews: 203 },
  "nb-480-bw": { rating: 4.8, reviews: 178 },
  "nb-480-br": { rating: 4.4, reviews: 112 },
};

const FALLBACK_RATING = { rating: 4.6, reviews: 96 };

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function deriveBrand(name: string) {
  if (/adidas/i.test(name)) return "Adidas";
  if (/vans/i.test(name)) return "Vans";
  if (/new balance/i.test(name)) return "New Balance";
  if (/asics/i.test(name)) return "Asics";
  if (/batman/i.test(name)) return "DC";
  return "High Street";
}

export default function ProductCard({
  product,
  onAdd,
  isFavorite = false,
  onToggleFavorite,
  detailHref,
  variant = "storefront",
}: ProductCardProps) {
  const hasVariants = !!product.variants?.length;
  const sizes = useMemo(
    () => Array.from(new Set(product.variants?.map((v) => v.size).filter(Boolean) as string[])),
    [product.variants],
  );
  const colors = useMemo(
    () => Array.from(new Set(product.variants?.map((v) => v.color).filter(Boolean) as string[])),
    [product.variants],
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] ?? null);
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0] ?? null);

  const matchingVariant = useMemo(
    () =>
      product.variants?.find(
        (v) =>
          (selectedSize ? v.size === selectedSize : true) &&
          (selectedColor ? v.color === selectedColor : true) &&
          (v.stock ?? 0) > 0,
      ),
    [product.variants, selectedSize, selectedColor],
  );

  const fallbackVariant = useMemo(
    () => product.variants?.find((v) => (v.stock ?? 0) > 0),
    [product.variants],
  );

  const soldOut = hasVariants ? !matchingVariant && !fallbackVariant : false;
  const finalHref = detailHref ?? `/templates/ecommerce2/${product.id}`;
  const brand = deriveBrand(product.name);
  const categoryLabel = product.category ?? "Streetwear";
  const ratingInfo = RATING_MAP[product.id] ?? FALLBACK_RATING;
  const activeVariant = matchingVariant ?? fallbackVariant ?? null;
  const currentPrice = activeVariant?.priceOverride ?? product.price;
  const originalPrice = Math.max(currentPrice + 60, Math.round(currentPrice * 1.2));
  const showOriginalPrice = originalPrice > currentPrice;

  const isCompact = variant === "compact";

  const containerClass = isCompact
    ? "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    : "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg";
  const badgeClass = isCompact
    ? "absolute left-4 top-4 inline-flex items-center justify-center rounded-md bg-rose-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
    : "absolute left-5 top-5 inline-flex items-center justify-center rounded-md bg-rose-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white";
  const favoriteClass = isCompact
    ? "absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm transition hover:text-black"
    : "absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm transition hover:text-black";
  const imageWrapperClass = isCompact
    ? "relative aspect-square overflow-hidden rounded-xl bg-gray-100"
    : "relative aspect-square overflow-hidden rounded-2xl bg-gray-100";
  const nameClass = isCompact
    ? "text-base font-semibold text-gray-900 transition hover:text-gray-700"
    : "text-lg font-semibold text-gray-900 transition hover:text-gray-700";
  const brandClass = isCompact
    ? "text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500"
    : "text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-500";
  const categoryClass = isCompact ? "text-xs text-gray-500" : "text-sm text-gray-500";
  const priceClass = isCompact ? "text-lg font-semibold text-gray-900" : "text-xl font-semibold text-gray-900";
  const contentClass = isCompact ? "mt-4 flex flex-1 flex-col gap-3" : "mt-5 flex flex-1 flex-col gap-4";
  const buttonClass = isCompact
    ? "inline-flex items-center justify-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
    : "inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500";

  return (
    <article className={containerClass}>
      {product.tag && <div className={badgeClass}>{product.tag}</div>}

      {onToggleFavorite && (
        <button
          type="button"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={onToggleFavorite}
          className={`${favoriteClass} ${isFavorite ? "text-rose-500" : ""}`}
        >
          <Heart className="h-5 w-5" strokeWidth={1.7} fill={isFavorite ? "currentColor" : "transparent"} />
        </button>
      )}

      <Link href={finalHref} className="block">
        <div className={imageWrapperClass}>
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </Link>

      <div className={contentClass}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className={brandClass}>{brand}</div>
            <Link href={finalHref} className={nameClass}>
              {product.name}
            </Link>
            <p className={categoryClass}>{categoryLabel}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1">
              <Star className="h-4 w-4 text-amber-400" fill="currentColor" strokeWidth={1.5} />
              <span className="text-sm font-medium text-gray-900">{ratingInfo.rating.toFixed(1)}</span>
            </div>
            <p className="text-xs text-gray-500">{ratingInfo.reviews} reviews</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={priceClass}>{formatCurrency(currentPrice)}</span>
            {showOriginalPrice && <span className="text-sm text-gray-400 line-through">{formatCurrency(originalPrice)}</span>}
          </div>
          <button
            type="button"
            onClick={() => onAdd(matchingVariant?.sku ?? fallbackVariant?.sku)}
            disabled={soldOut}
            className={buttonClass}
          >
            <ShoppingCart className="h-4 w-4" />
            {soldOut ? "Esgotado" : "Adicionar"}
          </button>
        </div>

        {hasVariants && (
          <div className="space-y-3">
            {colors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                      selectedColor === color ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            )}
            {sizes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-11 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                      selectedSize === size ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {soldOut && <p className="text-xs text-rose-500">Selecione outra combinacao ou aguarde reposicao.</p>}
      </div>
    </article>
  );
}


