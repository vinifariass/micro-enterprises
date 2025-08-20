"use client";

import * as React from "react";
import { SidebarContext } from "@/components/ui/sidebar";

export default function HeaderPad({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(SidebarContext)!;
  const padClass = ctx ? (ctx.collapsed ? "md:pl-[72px]" : "md:pl-64") : "";
  return <div className={"transition-[padding] duration-300 " + padClass}>{children}</div>;
}
