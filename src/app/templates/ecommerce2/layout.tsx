import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./CartContext";
import Footer from "./Footer";
import { ToastProvider } from "./Toast";

export const metadata: Metadata = {
  title: "E-commerce 2.0",
  description: "Storefront moderno baseado no Shadcn UI kit.",
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function Ecommerce2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <CartProvider>
        <ToastProvider>
          {children}
          <Footer />
        </ToastProvider>
      </CartProvider>
    </div>
  );
}
