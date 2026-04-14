'use client'

import { useEffect, useRef } from 'react'

interface AdvancedChartProps {
  symbol: string
  height?: number | string
  interval?: string
  studies?: string[]
}

export default function AdvancedChart({
  symbol,
  height = 500,
  interval = 'D',
  studies = [],
}: AdvancedChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Remove prior script if re-rendering with a new symbol
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    container.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      gridColor: 'rgba(255,255,255,0.04)',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      studies,
      support_host: 'https://www.tradingview.com',
    })
    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [symbol, interval])

  return (
    <div
      className="tradingview-widget-container w-full overflow-hidden rounded-2xl"
      style={{ height }}
      ref={containerRef}
    />
  )
}
