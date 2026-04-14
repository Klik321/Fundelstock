'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false })

interface TopStoriesProps {
  height?: number
  className?: string
}

export default function TopStories({ height = 400, className }: TopStoriesProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl', className)}
      style={{ height }}
    >
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
        config={{
          feedMode: 'market',
          market: 'stock',
          width: '100%',
          height,
          autosize: true,
          isTransparent: true,
          displayMode: 'adaptive',
        }}
        className="h-full w-full"
        style={{ height }}
      />
    </div>
  )
}
