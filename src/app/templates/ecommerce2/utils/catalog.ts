import type { Product } from "../catalog";

export function resolveCategory(name: string) {
  return /tee|shirt|camiseta/i.test(name) ? "Apparel" : "Sneakers";
}

export function resolveBrand(name: string) {
  if (/adidas/i.test(name)) return "Adidas";
  if (/vans/i.test(name)) return "Vans";
  if (/new balance/i.test(name)) return "New Balance";
  if (/asics/i.test(name)) return "Asics";
  if (/batman/i.test(name)) return "DC";
  return "High Street";
}

export function getPriceBounds(products: Product[]): [number, number] {
  const prices: number[] = [];
  for (const product of products) {
    if (product.variants?.length) {
      product.variants.forEach((variant) => prices.push(variant.priceOverride ?? product.price));
    } else {
      prices.push(product.price);
    }
  }
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return [Math.floor(min), Math.ceil(max)] as [number, number];
}

export function priceWindow(product: Product): [number, number] {
  if (product.variants?.length) {
    const prices = product.variants.map((variant) => variant.priceOverride ?? product.price);
    return [Math.min(...prices), Math.max(...prices)];
  }
  return [product.price, product.price];
}

