'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false })

const DEFAULT_TABS = [
  {
    title: 'US Indices',
    symbols: [
      { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
      { s: 'NASDAQ:IXIC', d: 'NASDAQ' },
      { s: 'DJ:DJI', d: 'Dow Jones' },
      { s: 'TVC:RUT', d: 'Russell 2000' },
      { s: 'TVC:VIX', d: 'VIX' },
    ],
  },
  {
    title: 'Global',
    symbols: [
      { s: 'XETR:DAX', d: 'DAX' },
      { s: 'FTSE:UKX', d: 'FTSE 100' },
      { s: 'TVC:NI225', d: 'Nikkei 225' },
      { s: 'TVC:HSI', d: 'Hang Seng' },
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

interface MarketOverviewProps {
  height?: number
  className?: string
}

export default function MarketOverview({ height = 430, className }: MarketOverviewProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl', className)}
      style={{ height }}
    >
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
        config={{
          dateRange: '12M',
          showChart: true,
          showSymbolLogo: true,
          showFloatingTooltip: true,
          width: '100%',
          height,
          tabs: DEFAULT_TABS,
        }}
        className="h-full w-full"
        style={{ height }}
      />
    </div>
  )
}
