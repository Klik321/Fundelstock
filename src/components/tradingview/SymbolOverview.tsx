'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false })

interface SymbolOverviewProps {
  symbols: string[][]
  height?: number
  className?: string
}

export default function SymbolOverview({
  symbols,
  height = 200,
  className,
}: SymbolOverviewProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl', className)}
      style={{ height }}
    >
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
        config={{
          symbols,
          chartOnly: false,
          width: '100%',
          height,
          autosize: true,
          showVolume: false,
          showMA: false,
          hideDateRanges: false,
          hideMarketStatus: false,
          hideSymbolLogo: false,
          scalePosition: 'right',
          scaleMode: 'Normal',
          fontFamily: 'var(--font-sans)',
          fontSize: '10',
          noTimeScale: false,
          valuesTracking: '1',
          changeMode: 'price-and-percent',
          chartType: 'area',
          lineWidth: 2,
          lineType: 0,
        }}
        className="h-full w-full"
        style={{ height }}
      />
    </div>
  )
}
