import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { SentimentType } from '@/types/news'
import { cn } from '@/lib/utils'

interface SentimentBadgeProps {
  sentiment: SentimentType
  size?: 'sm' | 'md'
  className?: string
}

const config = {
  bullish: {
    label: 'Bullish',
    icon: TrendingUp,
    classes: 'bg-accent-green-bg text-accent-green border-accent-green-border',
  },
  bearish: {
    label: 'Bearish',
    icon: TrendingDown,
    classes: 'bg-accent-red-bg text-accent-red border-accent-red-border',
  },
  neutral: {
    label: 'Neutral',
    icon: Minus,
    classes: 'bg-bg-elevated text-text-secondary border-border-medium',
  },
} as const

export default function SentimentBadge({
  sentiment,
  size = 'sm',
  className,
}: SentimentBadgeProps) {
  const { label, icon: Icon, classes } = config[sentiment]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        classes,
        className,
      )}
    >
      <Icon size={size === 'sm' ? 9 : 11} strokeWidth={2.5} />
      {label}
    </span>
  )
}
