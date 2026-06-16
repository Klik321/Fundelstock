'use client'

import { memo } from 'react'
import TradingViewWidget from './TradingViewWidget'

interface Props {
  height?: number
}

function EconomicCalendarWidget({ height = 400 }: Props) {
  return (
    <TradingViewWidget
      scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
      config={{
        width: '100%',
        height,
        importanceFilter: '0,1',
        countryFilter: 'us,eu,gb,jp,cn',
      }}
      className="overflow-hidden"
      style={{ height }}
    />
  )
}

export default memo(EconomicCalendarWidget)
