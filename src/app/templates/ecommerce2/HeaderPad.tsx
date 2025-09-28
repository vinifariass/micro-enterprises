"use client";

import * as React from "react";

export default function HeaderPad({ children }: { children: React.ReactNode }) {
  return <div className="transition-[padding] duration-300">{children}</div>;
}
