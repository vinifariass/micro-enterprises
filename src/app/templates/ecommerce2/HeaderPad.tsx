"use client";

import * as React from "react";
import { SidebarContext } from "@/components/ui/sidebar";

export default function HeaderPad({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(SidebarContext)!;
  // Apply padding only on desktop (lg+) to keep tablet layout clean
  const padClass = ctx ? (ctx.collapsed ? "lg:pl-[72px]" : "lg:pl-64") : "";
  return <div className={"transition-[padding] duration-300 " + padClass}>{children}</div>;
}
