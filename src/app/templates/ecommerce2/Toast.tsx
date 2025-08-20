"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type ToastOptions = {
  title?: string;
  description?: string;
  durationMs?: number;
};

type ToastItem = ToastOptions & { id: number };

type ToastCtx = {
  toast: (opts: ToastOptions) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((opts: ToastOptions) => {
    const id = Date.now() + Math.random();
    const item: ToastItem = { id, durationMs: 2500, ...opts };
    setItems((prev) => [...prev, item]);
    const dur = item.durationMs ?? 2500;
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), dur);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {/* Viewport */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[2000] flex w-[calc(100%-1rem)] max-w-sm flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            aria-live="polite"
            className="pointer-events-auto rounded-xl border bg-background/95 shadow-lg backdrop-blur p-4 text-sm"
          >
            {t.title && <div className="font-medium">{t.title}</div>}
            {t.description && <div className="text-muted-foreground mt-1">{t.description}</div>}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
