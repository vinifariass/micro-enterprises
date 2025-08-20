"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { PRODUCTS, type Product } from "./catalog";
import type { Coupon, Category } from "./types";
import { COUPONS, PROMOTIONS } from "./data/promotions";

export type CartItem = { id: string; qty: number; sku?: string };

export type CartTotals = {
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon?: string;
};

export type CartState = {
  items: CartItem[];
  totals: CartTotals;
  add: (id: string, qty?: number, sku?: string) => void;
  dec: (id: string, sku?: string) => void;
  remove: (id: string, sku?: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  coupon?: Coupon;
};

const CartCtx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | undefined>(undefined);

  const add = (id: string, qty = 1, sku?: string) =>
    setItems((curr) => {
      const i = curr.findIndex((x) => x.id === id && x.sku === (sku ?? x.sku));
      if (i >= 0) {
        const copy = [...curr];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
        }
      return [...curr, { id, qty, sku }];
    });

  const dec = (id: string, sku?: string) =>
    setItems((curr) =>
      curr.flatMap((x) => (x.id !== id || (sku && x.sku !== sku) ? [x] : x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []))
    );
  const remove = (id: string, sku?: string) => setItems((curr) => curr.filter((x) => x.id !== id || (sku && x.sku !== sku)));
  const clear = () => setItems([]);

  const applyCoupon = (code: string) => {
    const found = COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
    setCoupon(found);
    return !!found;
  };

  const totals = useMemo<CartTotals>(() => {
    const subtotal = items.reduce((sum, it) => {
      const p = PRODUCTS.find((x) => x.id === it.id);
      if (!p) return sum;
      const price = (p.variants?.find((v) => v.sku === it.sku)?.priceOverride) ?? p.price;
      return sum + price * it.qty;
    }, 0);

    // Apply promotions (category-level percent off)
    let promoDiscount = 0;
    for (const rule of PROMOTIONS) {
      if (!rule.active) continue;
      const pct = rule.percentOff ?? 0;
      const amt = rule.amountOff ?? 0;
      if (pct === 0 && amt === 0) continue;
      const eligible = items.reduce((sum, it) => {
        const p = PRODUCTS.find((x) => x.id === it.id) as Product | undefined;
        if (!p) return sum;
        const inCat = rule.categories ? (p.category ? (rule.categories as Category[]).includes(p.category as Category) : false) : true;
        const inList = rule.productIds ? rule.productIds.includes(p.id) : true;
        if (!(inCat && inList)) return sum;
        const price = (p.variants?.find((v) => v.sku === it.sku)?.priceOverride) ?? p.price;
        return sum + price * it.qty;
      }, 0);
      promoDiscount += eligible * (pct / 100) + amt;
    }

    // Apply coupon on top
    let couponDiscount = 0;
    if (coupon) {
      const now = new Date();
      const startsOk = coupon.startsAt ? now >= new Date(coupon.startsAt) : true;
      const endsOk = coupon.endsAt ? now <= new Date(coupon.endsAt) : true;
      if (startsOk && endsOk && (!coupon.minSubtotal || subtotal >= coupon.minSubtotal)) {
        const eligibleSubtotal = items.reduce((sum, it) => {
          const p = PRODUCTS.find((x) => x.id === it.id) as Product | undefined;
          if (!p) return sum;
          const inCat = coupon.categories ? (p.category ? (coupon.categories as Category[]).includes(p.category as Category) : false) : true;
          const inList = coupon.productIds ? coupon.productIds.includes(p.id) : true;
          if (!(inCat && inList)) return sum;
          const price = (p.variants?.find((v) => v.sku === it.sku)?.priceOverride) ?? p.price;
          return sum + price * it.qty;
        }, 0);
        if (coupon.percentOff) couponDiscount += eligibleSubtotal * (coupon.percentOff / 100);
        if (coupon.amountOff) couponDiscount += coupon.amountOff;
      }
    }

    const discount = Math.min(subtotal, promoDiscount + couponDiscount);
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total, appliedCoupon: coupon?.code };
  }, [items, coupon]);

  const value: CartState = { items, totals, add, dec, remove, clear, applyCoupon, coupon };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
