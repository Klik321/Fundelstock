'use client'

import { useEffect, useRef, useState, memo } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  scriptSrc: string
  config: Record<string, unknown>
  className?: string
  style?: React.CSSProperties
}

type Status = 'loading' | 'ready' | 'error'

function TradingViewWidget({ scriptSrc, config, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    setStatus('loading')

    // Clear any previous widget instance
    container.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    container.appendChild(widgetDiv)

    // TradingView injects an <iframe> when it renders — watch for it.
    const observer = new MutationObserver(() => {
      if (widgetDiv.querySelector('iframe')) {
        setStatus('ready')
        observer.disconnect()
      }
    })
    observer.observe(widgetDiv, { childList: true, subtree: true })

    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    script.type = 'text/javascript'
    // TradingView reads widget config from the script's text content
    script.innerHTML = JSON.stringify({
      ...config,
      colorTheme: 'dark',
      locale: 'en',
      isTransparent: false,
      backgroundColor: 'rgba(0,0,0,0)',
    })
    script.onerror = () => {
      setStatus('error')
      observer.disconnect()
    }
    container.appendChild(script)

    // If nothing renders in time (CDN/CSP/network failure), surface an error.
    const timeout = setTimeout(() => {
      if (!widgetDiv.querySelector('iframe')) setStatus('error')
      observer.disconnect()
    }, 10000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      if (container) container.innerHTML = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptSrc, JSON.stringify(config)])

  return (
    <div className="relative w-full h-full" style={{ minHeight: style?.height }}>
      <div
        ref={containerRef}
        className={cn('tradingview-widget-container', className)}
        style={{ background: '#131722', ...style }}
      />

      {/* Loading skeleton — sits over the empty container until the chart paints */}
      {status === 'loading' && (
        <div className="absolute inset-0 skeleton rounded-lg pointer-events-none" aria-hidden="true" />
      )}

      {/* Error state — honest message instead of a blank rectangle */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center pointer-events-none">
          <p className="text-sm text-text-secondary">Chart unavailable</p>
          <p className="text-xs text-text-tertiary">
            TradingView couldn&apos;t be reached — it may be blocked or temporarily down.
          </p>
        </div>
      )}
    </div>
  )
}

export default memo(TradingViewWidget)
