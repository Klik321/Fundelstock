'use client'

import { useEffect, useRef } from 'react'

interface MiniChartProps {
  symbol: string
  height?: number
}

export default function MiniChart({ symbol, height = 220 }: MiniChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>'

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol,
      width: '100%',
      height,
      locale: 'en',
      dateRange: '1D',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: true,
      largeChartUrl: '',
    })
    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [symbol, height])

  return (
    <div
      className="tradingview-widget-container w-full overflow-hidden rounded-xl"
      style={{ height }}
      ref={containerRef}
    />
  )
}
