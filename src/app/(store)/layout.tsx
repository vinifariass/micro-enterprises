"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarItem, SidebarFooter, SidebarTrigger, SidebarDrawer, SidebarContext } from "@/components/ui/sidebar";
import { Home, MapPin, Heart, Settings } from "lucide-react";

export function PaddedArea({ children, showTopBar = true }: { children: React.ReactNode; showTopBar?: boolean }) {
  const ctx = React.useContext(SidebarContext)!;
  // Desktop padding matches the sidebar width and animates on collapse/expand
  const padClass = ctx.collapsed ? "md:pl-[72px]" : "md:pl-64";
  return (
    <div>
      {/* Animate only the header padding on desktop */}
      {showTopBar && (
        <div className={"transition-[padding] duration-300 " + padClass}>
          <div className="sticky top-0 z-40 flex items-center gap-2 border-b bg-card/80 p-2 backdrop-blur md:hidden">
            <SidebarTrigger />
            <div className="text-sm font-medium">Menu</div>
          </div>
        </div>
      )}
      {/* Keep page content with fixed sidebar offset so it doesn't shift */}
      <div className="p-3 md:p-6 md:pl-64">{children}</div>
    </div>
  );
}

type StoreShellProps = { children: React.ReactNode; showTopBar?: boolean; useExistingProvider?: boolean };

function StoreShellInner({ children, showTopBar = true }: { children: React.ReactNode; showTopBar?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup title="Menu">
            <SidebarItem icon={Home} label="Home" href="/" />
            <SidebarItem icon={MapPin} label="Store Locator" href="/locator" />
            <SidebarItem icon={Heart} label="Favorites" href="#" />
            <SidebarItem icon={Settings} label="Settings" href="#" />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>

      <PaddedArea showTopBar={showTopBar}>{children}</PaddedArea>

      <SidebarDrawer />
    </div>
  );
}

export function StoreShell({ children, showTopBar = true, useExistingProvider = false }: StoreShellProps) {
  if (useExistingProvider) {
    return <StoreShellInner showTopBar={showTopBar}>{children}</StoreShellInner>;
  }
  return (
    <SidebarProvider>
      <StoreShellInner showTopBar={showTopBar}>{children}</StoreShellInner>
    </SidebarProvider>
  );
}

// Next.js layout for the (store) route group must accept only { children }
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StoreShellInner showTopBar>{children}</StoreShellInner>
    </SidebarProvider>
  );
}
