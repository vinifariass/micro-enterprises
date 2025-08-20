"use client";

import * as React from "react";
import { StoreShell } from "@/app/(store)/layout";

export default function LocatorWithSidebarLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell showTopBar={false} useExistingProvider>{children}</StoreShell>;
}
