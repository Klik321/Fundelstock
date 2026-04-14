import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  noPadding?: boolean
  hover?: boolean
}

export default function GlassCard({
  children,
  className,
  elevated = false,
  noPadding = false,
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card',
        elevated && 'glass-card-elevated',
        !noPadding && 'p-5',
        hover && 'transition-all duration-200',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
