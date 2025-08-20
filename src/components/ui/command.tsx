import * as React from 'react'
import { cn } from '@/lib/utils'

export function Command({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('overflow-hidden rounded-t-none border-t', className)} {...props} />
}
export function CommandInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <div className="p-2"><input className="h-9 w-full rounded-md border px-3 text-sm" {...props} /></div>
}
export function CommandList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}
export function CommandEmpty({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-2 text-sm text-muted-foreground', className)} {...props} />
}
export function CommandGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-2', className)} {...props} />
}
export function CommandItem({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('flex w-full items-center px-2 py-2 hover:bg-accent rounded-md', className)} {...props} />
}
