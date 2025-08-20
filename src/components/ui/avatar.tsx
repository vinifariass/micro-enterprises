import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type AvatarProps = React.HTMLAttributes<HTMLSpanElement>

export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <span data-slot="avatar" className={cn('relative flex size-8 shrink-0 rounded-full overflow-hidden md:size-10', className)} {...props}>
      {children}
    </span>
  )
}

export function AvatarImage({ className, alt = "", src = "", ...props }: React.ComponentProps<typeof Image>) {
  // Note: provide a default size; callers can override via className or size props
  return <Image data-slot="avatar-image" className={cn('aspect-square size-full', className)} alt={alt} src={src} width={40} height={40} {...props} />
}

export function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span data-slot="avatar-fallback" className={cn('bg-muted flex size-full items-center justify-center rounded-full', className)} {...props} />
}
