"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartButton() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  return (
    <Link
      href="/templates/ecommerce2/cart"
      className="relative inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm hover:bg-black hover:text-white transition-colors"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 min-w-5 rounded-full bg-black px-1.5 text-[10px] font-semibold text-white grid place-items-center">
          {count}
        </span>
      )}
    </Link>
  );
}
