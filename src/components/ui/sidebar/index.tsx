"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { PanelLeft, X, ChevronLeft, ChevronRight } from "lucide-react";

export const SidebarContext = React.createContext<{
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

type SidebarProviderProps = {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  defaultOpen?: boolean;
};

export function SidebarProvider({ children, defaultCollapsed = false, defaultOpen = false }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [open, setOpen] = React.useState(defaultOpen);
  const value = React.useMemo(() => ({ collapsed, setCollapsed, open, setOpen }), [collapsed, open]);
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function SidebarTrigger({ className }: { className?: string }) {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        className,
      )}
      onClick={() => {
        if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
          ctx.setCollapsed((prev) => !prev);
        } else {
          ctx.setOpen((prev) => !prev);
        }
      }}
    >
      <PanelLeft className="size-4" />
    </button>
  );
}

export function Sidebar({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <div
      className={cn(
        "group/sidebar fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white/95 text-slate-700 shadow-sm transition-[width] duration-300 md:block",
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
    <div className={cn("flex items-center justify-between border-b border-slate-200 px-3 py-3", className)}>
      <div className={cn("flex-1 text-sm font-semibold tracking-tight text-slate-900 transition-opacity", ctx.collapsed && "pointer-events-none opacity-0")}>{hasChildren ? children : "Sidebar"}</div>
      <button
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
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
      <div className={cn("px-2 pb-1 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400 transition-opacity", ctx.collapsed && "pointer-events-none -translate-y-3 opacity-0")}>{title}</div>
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
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200",
        "data-[active=true]:bg-slate-900 data-[active=true]:text-white",
        ctx.collapsed && "justify-center",
        className,
      )}
    >
      {Icon && <Icon className="size-4" />}
      <span className={cn("truncate transition-opacity", ctx.collapsed && "pointer-events-none hidden opacity-0")}>{label}</span>
    </a>
  );
}

export function SidebarFooter({ className }: { className?: string }) {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <div className={cn("border-t border-slate-200 px-3 py-3", className)}>
      <div className={cn("grid grid-cols-2 gap-2 text-xs text-slate-600", ctx.collapsed && "hidden")}
      >
        <a className="rounded-md border border-slate-200 px-2 py-1 text-center transition hover:bg-slate-100 hover:text-slate-900" href="https://shadcnuikit.com/components" target="_blank" rel="noreferrer">Components</a>
        <a className="rounded-md border border-slate-200 px-2 py-1 text-center transition hover:bg-slate-100 hover:text-slate-900" href="https://shadcnuikit.com/blocks" target="_blank" rel="noreferrer">Blocks</a>
        <a className="rounded-md border border-slate-200 px-2 py-1 text-center transition hover:bg-slate-100 hover:text-slate-900" href="https://shadcnuikit.com/templates" target="_blank" rel="noreferrer">Templates</a>
        <a className="rounded-md border border-slate-200 px-2 py-1 text-center transition hover:bg-slate-100 hover:text-slate-900" href="https://github.com/shadcn" target="_blank" rel="noreferrer">Github</a>
        <a className="col-span-2 rounded-md border border-slate-200 px-2 py-1 text-center transition hover:bg-slate-100 hover:text-slate-900" href="https://shadcnuikit.com" target="_blank" rel="noreferrer">Download Shadcn UI Kit</a>
      </div>
    </div>
  );
}

export function SidebarDrawer() {
  const ctx = React.useContext(SidebarContext)!;
  return (
    <div
      className={cn("fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden", ctx.open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}
      onClick={() => ctx.setOpen(false)}
    >
      <aside
        className={cn(
          "absolute left-0 top-0 h-full w-72 translate-x-0 border-r border-slate-200 bg-white text-slate-700 shadow-xl transition-transform duration-300",
          ctx.open ? "translate-x-0" : "-translate-x-full",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
          Menu
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900" onClick={() => ctx.setOpen(false)}>
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


