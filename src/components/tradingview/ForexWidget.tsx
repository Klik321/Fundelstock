'use client'

import { memo } from 'react'
import TradingViewWidget from './TradingViewWidget'

interface Props {
  height?: number
}

function ForexWidgetComponent({ height = 400 }: Props) {
  return (
    <TradingViewWidget
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js"
      config={{
        width: '100%',
        height,
        currencies: ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD'],
      }}
      className="overflow-hidden"
      style={{ height }}
    />
  )
}

export default memo(ForexWidgetComponent)
