import * as React from 'react'
import { cn } from '@/lib/utils'

type AvatarProps = React.HTMLAttributes<HTMLSpanElement>

export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <span data-slot="avatar" className={cn('relative flex size-8 shrink-0 rounded-full overflow-hidden md:size-10', className)} {...props}>
      {children}
    </span>
  )
}

export function AvatarImage({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img data-slot="avatar-image" className={cn('aspect-square size-full', className)} {...props} />
}

export function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span data-slot="avatar-fallback" className={cn('bg-muted flex size-full items-center justify-center rounded-full', className)} {...props} />
}
