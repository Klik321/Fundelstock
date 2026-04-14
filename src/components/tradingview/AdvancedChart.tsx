'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false })

interface AdvancedChartProps {
  symbol: string
  height?: number
  interval?: string
  className?: string
}

export default function AdvancedChart({
  symbol,
  height = 500,
  interval = 'D',
  className,
}: AdvancedChartProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl', className)}
      style={{ height }}
    >
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
        config={{
          symbol,
          interval,
          height,
          width: '100%',
          allow_symbol_change: true,
          hide_side_toolbar: false,
          autosize: true,
          timezone: 'Etc/UTC',
          style: '1',
          backgroundColor: 'rgba(0,0,0,0)',
          gridColor: 'rgba(255,255,255,0.04)',
          calendar: false,
          support_host: 'https://www.tradingview.com',
        }}
        className="h-full w-full"
        style={{ height }}
      />
    </div>
  )
}
