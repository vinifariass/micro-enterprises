"use client";

import { useEffect } from "react";

export default function ChunkReload() {
  useEffect(() => {
  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
        const reason: unknown = (event as PromiseRejectionEvent).reason;
        const rObj = (typeof reason === "object" && reason !== null ? (reason as Record<string, unknown>) : {});
        const msg = String((rObj.message as string) || "");
        const name = String((rObj.name as string) || "");
        if (name === "ChunkLoadError" || msg.includes("Loading chunk") || msg.includes("failed to fetch dynamically imported module")) {
        event.preventDefault?.();
        window.location.reload();
      }
    };

    const onResourceError = (event: Event) => {
      const target = event.target as HTMLScriptElement | null;
      if (target && target.tagName === "SCRIPT") {
        const src = (target as HTMLScriptElement).src || "";
        if (src.includes("/_next/static/chunks/")) {
          window.location.reload();
        }
      }
    };

      window.addEventListener("unhandledrejection", onUnhandledRejection as EventListener);
    window.addEventListener("error", onResourceError, true);
    return () => {
        window.removeEventListener("unhandledrejection", onUnhandledRejection as EventListener);
      window.removeEventListener("error", onResourceError, true);
    };
  }, []);

  return null;
}
