'use client'

import { useEffect, useRef, memo } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  scriptSrc: string
  config: Record<string, unknown>
  className?: string
  style?: React.CSSProperties
}

function TradingViewWidget({ scriptSrc, config, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear any previous widget instance
    container.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    container.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    script.type = 'text/javascript'
    // TradingView reads widget config from the script's text content
    script.innerHTML = JSON.stringify({
      ...config,
      colorTheme: 'dark',
      locale: 'en',
      isTransparent: true,
    })
    container.appendChild(script)

    return () => {
      if (container) container.innerHTML = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptSrc, JSON.stringify(config)])

  return (
    <div
      ref={containerRef}
      className={cn(
        'tradingview-widget-container overflow-hidden rounded-xl',
        className,
      )}
      style={style}
    />
  )
}

export default memo(TradingViewWidget)
