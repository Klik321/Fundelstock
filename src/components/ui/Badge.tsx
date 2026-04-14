import { cn } from '@/lib/utils'

type Variant = 'green' | 'red' | 'blue' | 'amber' | 'purple' | 'neutral'

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  size?: 'sm' | 'md'
  className?: string
  dot?: boolean
}

const variantClasses: Record<Variant, string> = {
  green: 'bg-accent-green-bg text-accent-green border-accent-green-border',
  red: 'bg-accent-red-bg text-accent-red border-accent-red-border',
  blue: 'bg-accent-blue-bg text-accent-blue border-accent-blue-border',
  amber: 'bg-accent-amber-bg text-accent-amber border-accent-amber-border',
  purple: 'bg-accent-purple-bg text-accent-purple border border-[rgba(124,77,255,0.25)]',
  neutral: 'bg-bg-elevated text-text-secondary border-border-medium',
}

const dotClasses: Record<Variant, string> = {
  green: 'bg-accent-green',
  red: 'bg-accent-red',
  blue: 'bg-accent-blue',
  amber: 'bg-accent-amber',
  purple: 'bg-accent-purple',
  neutral: 'bg-text-tertiary',
}

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        variantClasses[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotClasses[variant])}
        />
      )}
      {children}
    </span>
  )
}
