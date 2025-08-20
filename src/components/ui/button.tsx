import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'asChild'> & {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'icon' | 'sm'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild, ...props }, ref) => {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm leading-none font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      default: 'bg-black text-white hover:bg-black/90',
      outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
      ghost: 'hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-800'
    }
    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3',
      icon: 'size-9'
    }
    // Remove asChild from props so it doesn't go to DOM
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    )
  }
)
Button.displayName = 'Button'
