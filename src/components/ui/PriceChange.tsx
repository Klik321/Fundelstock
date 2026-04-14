import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatChange } from '@/lib/utils'

interface PriceChangeProps {
  change: number
  changePercent?: number
  showIcon?: boolean
  showAbsolute?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function PriceChange({
  change,
  changePercent,
  showIcon = true,
  showAbsolute = false,
  size = 'md',
  className,
}: PriceChangeProps) {
  const isPositive = change > 0
  const isNegative = change < 0
  const isNeutral = change === 0

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size]

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  }[size]

  const colorClass = isPositive
    ? 'text-bull'
    : isNegative
    ? 'text-bear'
    : 'text-ink-secondary'

  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium tabular-nums',
        textSize,
        colorClass,
        className,
      )}
    >
      {showIcon && <Icon size={iconSize} strokeWidth={2.5} />}
      {showAbsolute && (
        <span>{formatChange(change)}</span>
      )}
      {changePercent !== undefined && (
        <span>{formatChange(changePercent, true)}</span>
      )}
      {changePercent === undefined && !showAbsolute && (
        <span>{formatChange(change, true)}</span>
      )}
    </span>
  )
}
