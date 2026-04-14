'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false })

interface StockMarketWidgetProps {
  height?: number
  className?: string
}

export default function StockMarketWidget({
  height = 400,
  className,
}: StockMarketWidgetProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl', className)}
      style={{ height }}
    >
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js"
        config={{
          exchange: 'US',
          showChart: true,
          width: '100%',
          height,
          autosize: true,
          showSymbolLogo: true,
          showFloatingTooltip: false,
        }}
        className="h-full w-full"
        style={{ height }}
      />
    </div>
  )
}
