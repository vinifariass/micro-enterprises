"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "./catalog";
import { PRODUCTS } from "./catalog";

export type CartItem = { id: string; qty: number };

export type CartState = {
  items: CartItem[];
  total: number;
  add: (id: string, qty?: number) => void;
  dec: (id: string) => void;
  clear: () => void;
};

const CartCtx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (id: string, qty = 1) =>
    setItems((curr) => {
      const i = curr.findIndex((x) => x.id === id);
      if (i >= 0) {
        const copy = [...curr];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
        }
      return [...curr, { id, qty }];
    });

  const dec = (id: string) =>
    setItems((curr) =>
      curr.flatMap((x) => (x.id !== id ? [x] : x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []))
    );
  const clear = () => setItems([]);

  const total = useMemo(
    () =>
      items.reduce((sum, it) => {
        const p = PRODUCTS.find((x) => x.id === it.id);
        return sum + (p ? p.price * it.qty : 0);
      }, 0),
    [items]
  );

  const value: CartState = { items, total, add, dec, clear };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
