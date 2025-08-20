import * as React from 'react'
import { cn } from '@/lib/utils'

type SheetContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

export function Sheet({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode }) {
  return <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>
}

export function SheetContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(SheetContext)
  if (!ctx) return null
  if (!ctx.open) return null
  return (
    <div className="fixed inset-0 z-50" onClick={() => ctx.onOpenChange(false)}>
      <div className="absolute inset-0 bg-black/30" />
      <aside
        className={cn(
          'absolute right-0 top-0 h-full w-full max-w-md translate-x-0 bg-card text-card-foreground shadow-xl transition-transform duration-300 will-change-transform border-l',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </aside>
    </div>
  )
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-b px-6 py-4', className)} {...props} />
}
export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-lg font-semibold', className)} {...props} />
}
