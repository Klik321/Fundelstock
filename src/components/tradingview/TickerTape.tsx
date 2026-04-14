'use client'

import dynamic from 'next/dynamic'
import { TICKER_TAPE_SYMBOLS } from '@/data/indices'

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false })

export default function TickerTape() {
  return (
    <div className="h-[46px] w-full overflow-hidden bg-bg-ticker">
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
        config={{
          symbols: TICKER_TAPE_SYMBOLS,
          showSymbolLogo: true,
          displayMode: 'adaptive',
        }}
        className="h-[46px] w-full rounded-none"
        style={{ height: 46 }}
      />
    </div>
  )
}
