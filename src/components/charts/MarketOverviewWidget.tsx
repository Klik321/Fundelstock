'use client'

import { useEffect, useRef } from 'react'

interface Tab {
  title: string
  symbols: { s: string; d?: string }[]
  originalTitle?: string
}

interface MarketOverviewWidgetProps {
  tabs?: Tab[]
  height?: number
}

const DEFAULT_TABS: Tab[] = [
  {
    title: 'US Indices',
    symbols: [
      { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
      { s: 'FOREXCOM:NSXUSD', d: 'Nasdaq 100' },
      { s: 'DJ:DJI', d: 'Dow Jones' },
      { s: 'TVC:RUT', d: 'Russell 2000' },
      { s: 'TVC:VIX', d: 'VIX' },
    ],
  },
  {
    title: 'Global',
    symbols: [
      { s: 'XETR:DAX', d: 'DAX 40' },
      { s: 'SPREADEX:FTSE', d: 'FTSE 100' },
      { s: 'TVC:NI225', d: 'Nikkei 225' },
    ],
  },
  {
    title: 'Commodities',
    symbols: [
      { s: 'TVC:GOLD', d: 'Gold' },
      { s: 'TVC:SILVER', d: 'Silver' },
      { s: 'NYMEX:CL1!', d: 'Crude Oil WTI' },
      { s: 'NYMEX:NG1!', d: 'Natural Gas' },
    ],
  },
]

export default function MarketOverviewWidget({
  tabs = DEFAULT_TABS,
  height = 430,
}: MarketOverviewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>'

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      largeChartUrl: '',
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      width: '100%',
      height,
      tabs,
    })
    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [tabs, height])

  return (
    <div
      className="tradingview-widget-container w-full overflow-hidden rounded-2xl"
      style={{ height }}
      ref={containerRef}
    />
  )
}
