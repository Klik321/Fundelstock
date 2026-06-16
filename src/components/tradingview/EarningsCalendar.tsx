'use client'

import { memo } from 'react'
import TradingViewWidget from './TradingViewWidget'

interface Props {
  height?: number
}

function EarningsCalendarWidget({ height = 400 }: Props) {
  return (
    <TradingViewWidget
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
      config={{
        width: '100%',
        height,
        importanceFilter: '-1,0,1',
        countryFilter: 'us,eu,gb,jp,cn,ca,au',
      }}
      className="overflow-hidden"
      style={{ height }}
    />
  )
}

export default memo(EarningsCalendarWidget)
