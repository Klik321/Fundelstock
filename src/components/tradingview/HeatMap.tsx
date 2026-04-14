'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false })

interface HeatMapProps {
  dataSource?: string
  grouping?: string
  height?: number
  className?: string
}

export default function HeatMap({
  dataSource = 'SPX500',
  grouping = 'sector',
  height = 400,
  className,
}: HeatMapProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl', className)}
      style={{ height }}
    >
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
        config={{
          exchanges: [],
          dataSource,
          grouping,
          blockSize: 'market_cap_basic',
          blockColor: 'change',
          width: '100%',
          height,
          autosize: true,
          hasTopBar: false,
          isDataSetEnabled: false,
          isZoomEnabled: true,
          hasSymbolTooltip: true,
        }}
        className="h-full w-full"
        style={{ height }}
      />
    </div>
  )
}
