"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import CartButton from "./CartButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Drops", href: "/templates/ecommerce2" },
  { label: "Coleção", href: "/templates/ecommerce2/products" },
  { label: "Lookbook", href: "/templates/ecommerce2/locator" },
  { label: "Admin", href: "/templates/ecommerce2/admin" },
];

export default function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="border-b border-gray-200 bg-black text-[11px] font-medium uppercase tracking-[0.3em] text-white">
        <div className="mx-auto flex h-8 w-full max-w-6xl items-center justify-between px-4">
          <span>Frete grátis acima de R$ 600</span>
          <span className="hidden sm:block">Suporte rápido via WhatsApp</span>
        </div>
      </div>

      <header className="border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4">
          <button className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-700 md:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/templates/ecommerce2" className="font-semibold uppercase tracking-[0.35em]">
            High Street Lab
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-gray-600 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-black",
                  pathname.startsWith(link.href) ? "text-black font-semibold" : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link href="#" className="hidden text-gray-500 transition hover:text-black sm:inline-block">
              Entrar
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      <div>{children}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-72 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-semibold uppercase tracking-[0.4em] text-gray-800">High Street</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu" className="rounded-full border border-gray-200 p-2 text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-sm">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={cn("uppercase tracking-[0.3em]", pathname.startsWith(link.href) ? "text-black" : "text-gray-500" )} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}




