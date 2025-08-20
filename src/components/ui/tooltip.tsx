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
type ContentProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode
  sideOffset?: number
}
export function TooltipContent({ children, sideOffset, style, ...props }: ContentProps) {
  const mergedStyle = sideOffset != null ? { marginTop: sideOffset, ...style } : style
  return (
    <span {...props} style={mergedStyle}>
      {children}
    </span>
  )
}
