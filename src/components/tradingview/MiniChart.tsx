'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false })

interface MiniChartProps {
  symbol: string
  height?: number
  dateRange?: '1D' | '1W' | '1M' | '3M' | '12M'
  className?: string
}

export default function MiniChart({
  symbol,
  height = 160,
  dateRange = '1D',
  className,
}: MiniChartProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl', className)} style={{ height }}>
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
        config={{
          symbol,
          width: '100%',
          height,
          dateRange,
          autosize: true,
        }}
        className="h-full w-full"
        style={{ height }}
      />
    </div>
  )
}
