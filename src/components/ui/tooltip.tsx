import * as React from 'react'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
export function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
export function TooltipTrigger({ asChild, children, ...props }: any) {
  return <span {...props}>{children}</span>
}
export function TooltipContent({ children, ...props }: any) {
  return <span {...props}>{children}</span>
}
