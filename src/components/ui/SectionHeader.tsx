import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between', className)}>
      <div>
        <h2 className="section-header text-xl font-bold text-ink-primary">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm text-ink-secondary">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
