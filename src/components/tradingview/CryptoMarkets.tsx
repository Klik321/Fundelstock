'use client'

import { memo, useEffect, useRef } from 'react'

interface Props {
  height?: number
}

function CryptoMarketsWidget({ height = 400 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    container.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    container.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      width: '100%',
      height,
      defaultColumn: 'overview',
      screener_type: 'crypto_mkt',
      displayCurrency: 'USD',
      colorTheme: 'dark',
      locale: 'en',
      isTransparent: true,
    })
    container.appendChild(script)

    return () => { container.innerHTML = '' }
  }, [height])

  return (
    <div
      ref={ref}
      className="tradingview-widget-container overflow-hidden rounded-xl"
      style={{ height }}
    />
  )
}

export default memo(CryptoMarketsWidget)
