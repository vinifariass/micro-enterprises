"use client";

import * as React from "react";
import { StoreShell } from "@/app/(store)/StoreShell";

export default function LocatorWithSidebarLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell showTopBar={false}>{children}</StoreShell>;
}
