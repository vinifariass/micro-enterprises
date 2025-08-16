import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./CartContext";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E-commerce 2.0",
  description: "Storefront moderno baseado no Shadcn UI kit.",
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function Ecommerce2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <CartProvider>
        <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-6">
            <Link href="/templates/ecommerce2" className="font-bold tracking-tight">E-commerce 2.0</Link>
            <nav className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <Link href="/templates/ecommerce2" className="hover:text-black">Home</Link>
              <Link href="/templates/ecommerce2/admin" className="hover:text-black">Admin</Link>
              <Link href="/templates/ecommerce2/dashboard" className="hover:text-black">Dashboard</Link>
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <Link href="#cart" className="rounded-md border px-3 py-1.5 text-sm">Carrinho</Link>
            </div>
          </div>
        </header>
        {children}
      </CartProvider>
    </div>
  );
}
