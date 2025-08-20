"use client";

import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StoreShell } from "./StoreShell";

// Next.js layout for the (store) route group must accept only { children }
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StoreShell showTopBar useExistingProvider>
        {children}
      </StoreShell>
    </SidebarProvider>
  );
}
