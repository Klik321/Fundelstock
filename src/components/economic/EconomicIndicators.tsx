'use client'

import { memo, useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EconomicIndicator {
  id: string
  name: string
  value: number
  unit: string
  change: number
  changeType: 'up' | 'down' | 'flat'
}

function SkeletonIndicatorCard() {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 min-w-[160px] flex-shrink-0 animate-pulse">
      <div className="h-3 w-24 bg-bg-elevated rounded mb-3" />
      <div className="h-8 w-16 bg-bg-elevated rounded mb-2" />
      <div className="h-5 w-20 bg-bg-elevated rounded mb-3" />
      <div className="h-3 w-14 bg-bg-elevated rounded" />
    </div>
  )
}

function IndicatorCard({ indicator }: { indicator: EconomicIndicator }) {
  const { name, value, unit, change, changeType } = indicator

  const badgeClasses = cn(
    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
    changeType === 'up'   && 'bg-green-500/10 text-green-400',
    changeType === 'down' && 'bg-red-500/10 text-red-400',
    changeType === 'flat' && 'bg-bg-elevated text-text-tertiary',
  )

  const Icon =
    changeType === 'up'   ? TrendingUp  :
    changeType === 'down' ? TrendingDown : Minus

  const sign = changeType === 'up' ? '+' : ''

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 min-w-[160px] flex-shrink-0 flex flex-col gap-1">
      <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{name}</p>
      <p className="text-3xl font-bold text-text-primary leading-none mt-1">
        {value.toFixed(2)}
        <span className="text-sm font-normal text-text-tertiary ml-1">{unit}</span>
      </p>
      <div className={badgeClasses}>
        <Icon size={11} />
        <span>{sign}{change.toFixed(3)}</span>
      </div>
      <p className="text-[10px] text-text-tertiary mt-auto pt-1">Source: FRED</p>
    </div>
  )
}

function EconomicIndicators() {
  const [indicators, setIndicators] = useState<EconomicIndicator[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch('/api/economic')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setIndicators(data.indicators ?? [])
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIndicators([])
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonIndicatorCard key={i} />
        ))}
      </div>
    )
  }

  if (!indicators?.length) return null

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible">
      {indicators.map((indicator) => (
        <IndicatorCard key={indicator.id} indicator={indicator} />
      ))}
    </div>
  )
}

export default memo(EconomicIndicators)
