'use client'

import { memo } from 'react'
import TradingViewWidget from './TradingViewWidget'

interface Props {
  height?: number
}

function CryptoMarketsWidget({ height = 400 }: Props) {
  return (
    <TradingViewWidget
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
      config={{
        width: '100%',
        height,
        defaultColumn: 'overview',
        screener_type: 'crypto_mkt',
        displayCurrency: 'USD',
      }}
      className="overflow-hidden"
      style={{ height }}
    />
  )
}

export default memo(CryptoMarketsWidget)
