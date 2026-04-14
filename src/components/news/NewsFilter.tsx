'use client'

import { cn } from '@/lib/utils'
import { SECTORS } from '@/data/sectors'
import type { SentimentType } from '@/types/news'

interface NewsFilterProps {
  activeSectors: string[]
  activeSentiments: SentimentType[]
  onSectorToggle: (slug: string) => void
  onSentimentToggle: (s: SentimentType) => void
  className?: string
}

const SENTIMENTS: { value: SentimentType; label: string; color: string; bg: string; border: string }[] = [
  {
    value: 'bullish',
    label: 'Bullish',
    color: 'text-accent-green',
    bg: 'bg-accent-green-bg',
    border: 'border-accent-green-border',
  },
  {
    value: 'bearish',
    label: 'Bearish',
    color: 'text-accent-red',
    bg: 'bg-accent-red-bg',
    border: 'border-accent-red-border',
  },
  {
    value: 'neutral',
    label: 'Neutral',
    color: 'text-text-secondary',
    bg: 'bg-bg-elevated',
    border: 'border-border-medium',
  },
]

export default function NewsFilter({
  activeSectors,
  activeSentiments,
  onSectorToggle,
  onSentimentToggle,
  className,
}: NewsFilterProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Sentiment toggles */}
      <div className="flex flex-wrap gap-2">
        {SENTIMENTS.map((s) => {
          const active = activeSentiments.includes(s.value)
          return (
            <button
              key={s.value}
              onClick={() => onSentimentToggle(s.value)}
              className={cn(
                'pill transition-all duration-150',
                active
                  ? `${s.bg} ${s.color} ${s.border}`
                  : 'bg-bg-elevated text-text-tertiary border-border-subtle hover:border-border-medium hover:text-text-secondary',
              )}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* Sector pills — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => {
            // "All" clears all sector filters
            SECTORS.forEach((s) => {
              if (activeSectors.includes(s.slug)) onSectorToggle(s.slug)
            })
          }}
          className={cn(
            'pill shrink-0 transition-all duration-150',
            activeSectors.length === 0
              ? 'bg-accent-blue-bg text-accent-blue border-accent-blue-border'
              : 'bg-bg-elevated text-text-tertiary border-border-subtle hover:border-border-medium hover:text-text-secondary',
          )}
        >
          All Sectors
        </button>
        {SECTORS.map((s) => {
          const active = activeSectors.includes(s.slug)
          return (
            <button
              key={s.slug}
              onClick={() => onSectorToggle(s.slug)}
              className={cn(
                'pill shrink-0 transition-all duration-150',
                active
                  ? 'bg-accent-blue-bg text-accent-blue border-accent-blue-border'
                  : 'bg-bg-elevated text-text-tertiary border-border-subtle hover:border-border-medium hover:text-text-secondary',
              )}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: active ? undefined : s.color }}
              />
              {s.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
