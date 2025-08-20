import * as React from 'react'
import { cn } from '@/lib/utils'

const MenuContext = React.createContext<{
  open: boolean
  setOpen: (o: boolean) => void
} | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return <MenuContext.Provider value={{ open, setOpen }}>{children}</MenuContext.Provider>
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  const ctx = React.useContext(MenuContext)!
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>
    const handleClick = (e: React.MouseEvent) => {
      child.props?.onClick?.(e)
      ctx.setOpen(!ctx.open)
    }
    return React.cloneElement(child, { onClick: handleClick })
  }
  return <button onClick={() => ctx.setOpen(!ctx.open)}>{children}</button>
}

export function DropdownMenuContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(MenuContext)!
  if (!ctx.open) return null
  return (
    <div className={cn('absolute z-50 mt-2 min-w-40 rounded-md border bg-card p-1 text-card-foreground shadow-md', className)}>
      {children}
    </div>
  )
}

export function DropdownMenuItem({ className, onClick, children }: { className?: string; onClick?: () => void; children: React.ReactNode }) {
  const ctx = React.useContext(MenuContext)!
  return (
    <button
      className={cn('w-full cursor-pointer select-none rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-accent', className)}
      onClick={() => { onClick?.(); ctx.setOpen(false) }}
    >
      {children}
    </button>
  )
}
