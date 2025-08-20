import * as React from 'react'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
export function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
type TriggerProps = React.HTMLAttributes<HTMLSpanElement> & { asChild?: boolean; children: React.ReactNode }
export function TooltipTrigger({ children, ...props }: TriggerProps) {
  return <span {...props}>{children}</span>
}
type ContentProps = React.HTMLAttributes<HTMLSpanElement> & { children: React.ReactNode }
export function TooltipContent({ children, ...props }: ContentProps) {
  return <span {...props}>{children}</span>
}
