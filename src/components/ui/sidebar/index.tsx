"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

// Sidebar context
export const SidebarContext = React.createContext<{ collapsed: boolean; setCollapsed: (v: boolean) => void; open: boolean; setOpen: (v: boolean) => void } | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const value = React.useMemo(() => ({ collapsed, setCollapsed, open, setOpen }), [collapsed, open]);
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function SidebarTrigger({ className }: { className?: string }) {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <button className={cn("inline-flex items-center justify-center rounded-md border px-2.5 py-2 text-sm shadow-xs hover:bg-accent hover:text-accent-foreground", className)} onClick={() => ctx.setOpen(true)}>
      <Menu className="size-4" />
    </button>
  );
}

export function Sidebar({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <div
      className={cn(
        "group/sidebar fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-card text-card-foreground transition-[width] duration-300 md:block",
        ctx.collapsed && "w-[72px]",
        className,
      )}
      aria-label="Sidebar"
    >
      {children}
    </div>
  );
}

export function SidebarHeader({ className, children }: { className?: string; children?: React.ReactNode }) {
  const ctx = React.useContext(SidebarContext)!;
  const hasChildren = React.Children.count(children) > 0;
  return (
    <div className={cn("flex items-center justify-between border-b px-4 py-3", className)}>
      <div className={cn("flex-1 font-semibold transition-opacity", ctx.collapsed && "opacity-0 pointer-events-none")}>{hasChildren ? children : "Shadcn UI Kit"}</div>
      <button
        className="inline-flex items-center justify-center rounded-md border px-2.5 py-2 text-sm shadow-xs hover:bg-accent hover:text-accent-foreground"
        onClick={() => ctx.setCollapsed(!ctx.collapsed)}
        aria-label="Collapse sidebar"
      >
        {ctx.collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
      </button>
    </div>
  );
}

export function SidebarContent({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("h-[calc(100%-116px)] overflow-auto p-2", className)}>{children}</div>;
}

export function SidebarGroup({ title, children }: { title: string; children?: React.ReactNode }) {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <div className="mb-4">
      <div className={cn("px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition-opacity", ctx.collapsed && "opacity-0 pointer-events-none")}>{title}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export function SidebarItem({ icon: Icon, label, href = "#", className, isActive }: { icon?: React.ComponentType<{ className?: string }>; label: string; href?: string; className?: string; isActive?: boolean }) {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <a
      href={href}
      data-active={isActive ? "true" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors data-[active=true]:bg-black data-[active=true]:text-white hover:bg-accent hover:text-accent-foreground",
        ctx.collapsed && "justify-center",
        className,
      )}
    >
      {Icon && <Icon className="size-4" />}
      <span className={cn("truncate transition-opacity", ctx.collapsed && "opacity-0 pointer-events-none hidden")}>{label}</span>
    </a>
  );
}

export function SidebarFooter({ className }: { className?: string }) {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <div className={cn("border-t px-3 py-3", className)}>
      <div className={cn("grid grid-cols-2 gap-2 text-xs", ctx.collapsed && "hidden")}
      >
        <a className="rounded-md border px-2 py-1 text-center hover:bg-accent hover:text-accent-foreground" href="https://shadcnuikit.com/components" target="_blank" rel="noreferrer">Components</a>
        <a className="rounded-md border px-2 py-1 text-center hover:bg-accent hover:text-accent-foreground" href="https://shadcnuikit.com/blocks" target="_blank" rel="noreferrer">Blocks</a>
        <a className="rounded-md border px-2 py-1 text-center hover:bg-accent hover:text-accent-foreground" href="https://shadcnuikit.com/templates" target="_blank" rel="noreferrer">Templates</a>
        <a className="rounded-md border px-2 py-1 text-center hover:bg-accent hover:text-accent-foreground" href="https://github.com/shadcn" target="_blank" rel="noreferrer">Github</a>
        <a className="col-span-2 rounded-md border px-2 py-1 text-center hover:bg-accent hover:text-accent-foreground" href="https://shadcnuikit.com" target="_blank" rel="noreferrer">Download Shadcn UI Kit</a>
      </div>
    </div>
  );
}

// Mobile Drawer
export function SidebarDrawer() {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <div className={cn("fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden", ctx.open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
      onClick={() => ctx.setOpen(false)}
    >
      <aside className={cn(
        "absolute left-0 top-0 h-full w-72 translate-x-0 border-r bg-card text-card-foreground shadow-xl transition-transform duration-300",
        ctx.open ? "translate-x-0" : "-translate-x-full"
      )} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="font-semibold">Shadcn UI Kit</div>
          <button className="inline-flex items-center justify-center rounded-md border px-2.5 py-2 text-sm shadow-xs hover:bg-accent hover:text-accent-foreground" onClick={() => ctx.setOpen(false)}>
            <X className="size-4" />
          </button>
        </div>
        <div className="h-[calc(100%-52px)] overflow-auto p-2">
          {/* Consumers should render SidebarContent groups here on mobile */}
        </div>
      </aside>
    </div>
  );
}
