"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
  SidebarTrigger,
  SidebarDrawer,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Shirt, PlusCircle, LineChart, Store, Cog } from "lucide-react";
import HeaderPad from "../HeaderPad";

const PRIMARY_LINKS = [
  { label: "Visão geral", href: "/templates/ecommerce2/admin", icon: LayoutDashboard },
  { label: "Produtos", href: "/templates/ecommerce2/admin/products", icon: Shirt },
  { label: "Cadastrar produto", href: "/templates/ecommerce2/admin/new", icon: PlusCircle },
  { label: "Relatórios", href: "/templates/ecommerce2/sales-dashboard", icon: LineChart },
];

const SUPPORT_LINKS = [
  { label: "Ver loja", href: "/templates/ecommerce2", icon: Store },
  { label: "Configurações", href: "/templates/ecommerce2/dashboard", icon: Cog },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Sidebar className="border-slate-200 bg-white/95 backdrop-blur">
          <SidebarHeader className="border-slate-200">
            <Link href="/templates/ecommerce2" className="font-semibold tracking-tight" aria-label="Ir para a loja">
              High Street Admin
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup title="Gestão">
              {PRIMARY_LINKS.map((link) => (
                <SidebarItem key={link.href} icon={link.icon} href={link.href} label={link.label} isActive={pathname.startsWith(link.href)} />
              ))}
            </SidebarGroup>
            <SidebarGroup title="Outros">
              {SUPPORT_LINKS.map((link) => (
                <SidebarItem key={link.href} icon={link.icon} href={link.href} label={link.label} isActive={pathname.startsWith(link.href)} />
              ))}
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-slate-200" />
        </Sidebar>

        <SidebarDrawer />

        <div className="flex min-h-screen flex-1 flex-col">
          <HeaderPad>
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
              <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
                <SidebarTrigger className="md:hidden" />
                <div className="font-semibold tracking-tight">Painel administrativo</div>
                <div className="ml-auto flex items-center gap-3 text-sm text-slate-500">
                  <Link href="/templates/ecommerce2" className="hover:text-slate-900">
                    Ir para loja
                  </Link>
                </div>
              </div>
            </header>
          </HeaderPad>

          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

