"use client";

import * as React from "react";
import StoreShellLayout from "@/app/(store)/layout";

export default function LocatorWithSidebarLayout({ children }: { children: React.ReactNode }) {
  return <StoreShellLayout showTopBar={false} useExistingProvider>{children}</StoreShellLayout>;
}
