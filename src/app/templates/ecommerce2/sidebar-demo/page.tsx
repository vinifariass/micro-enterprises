"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarItem, SidebarFooter, SidebarTrigger, SidebarDrawer } from "@/components/ui/sidebar";
import { BarChart3, ShoppingCart, Wallet, Mail, Calendar, Users, FileText, LayoutDashboard } from "lucide-react";

export default function SidebarDemoPage() {
  return (
    <SidebarProvider>
      <div className="min-h-dvh bg-background text-foreground">
        <div className="sticky top-0 z-30 flex items-center gap-2 border-b bg-card/70 p-2 backdrop-blur supports-[backdrop-filter]:bg-card/70 md:hidden">
          <SidebarTrigger />
          <div className="text-sm font-medium">Dashboard</div>
        </div>

        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup title="Dashboards">
              <SidebarItem icon={LayoutDashboard} label="Default" href="#" />
              <SidebarItem icon={BarChart3} label="Analytics" href="#" />
              <SidebarItem icon={Wallet} label="Finance" href="#" />
            </SidebarGroup>
            <SidebarGroup title="Apps">
              <SidebarItem icon={Mail} label="Mail" href="#" />
              <SidebarItem icon={Calendar} label="Calendar" href="#" />
              <SidebarItem icon={Users} label="Contacts" href="#" />
              <SidebarItem icon={ShoppingCart} label="Ecommerce" href="#" />
            </SidebarGroup>
            <SidebarGroup title="Pages">
              <SidebarItem icon={FileText} label="Invoices" href="#" />
              <SidebarItem icon={Users} label="Customers" href="#" />
              <SidebarItem icon={FileText} label="Settings" href="#" />
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>

        <SidebarDrawer />

        <main className="md:pl-64">
          <div className="mx-auto max-w-5xl p-6">
            <h1 className="text-2xl font-semibold">Sidebar (Shadcn UI Kit – Default)</h1>
            <p className="mt-2 text-sm text-muted-foreground">Colapse via botão no header da sidebar. Em mobile, use o Trigger para abrir como drawer.</p>
            <div className="mt-6 rounded-lg border p-6">Conteúdo do dashboard aqui…</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
