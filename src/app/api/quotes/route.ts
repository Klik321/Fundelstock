import { NextRequest, NextResponse } from 'next/server'
import type { Quote } from '@/types/market'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbolsParam = searchParams.get('symbols')

  if (!symbolsParam) {
    return NextResponse.json({ error: 'symbols parameter required' }, { status: 400 })
  }

  const symbols = symbolsParam.split(',').map((s) => s.trim()).filter(Boolean)
  const finnhubKey = process.env.FINNHUB_API_KEY

  if (!finnhubKey || finnhubKey === 'your_finnhub_api_key_here') {
    // Return mock quotes when no API key is configured
    const quotes = symbols.map((symbol) => getMockQuote(symbol))
    return NextResponse.json({ quotes })
  }

  try {
    const quotePromises = symbols.map(async (symbol): Promise<Quote> => {
      const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${finnhubKey}`
      const res = await fetch(url, { next: { revalidate: 60 } }) // cache 1 minute

      if (!res.ok) return getMockQuote(symbol)

      const data = await res.json()
      return {
        symbol,
        price: data.c ?? 0,
        change: data.d ?? 0,
        changePercent: data.dp ?? 0,
        high: data.h ?? 0,
        low: data.l ?? 0,
        open: data.o ?? 0,
        previousClose: data.pc ?? 0,
        timestamp: data.t ?? Date.now() / 1000,
      }
    })

    const quotes = await Promise.all(quotePromises)
    return NextResponse.json({ quotes })
  } catch (err) {
    const quotes = symbols.map((symbol) => getMockQuote(symbol))
    return NextResponse.json({ quotes })
  }
}

function getMockQuote(symbol: string): Quote {
  const base = 100 + Math.random() * 300
  const change = (Math.random() - 0.5) * 10
  return {
    symbol,
    price: parseFloat(base.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(((change / base) * 100).toFixed(2)),
    high: parseFloat((base + Math.random() * 5).toFixed(2)),
    low: parseFloat((base - Math.random() * 5).toFixed(2)),
    open: parseFloat((base + (Math.random() - 0.5) * 3).toFixed(2)),
    previousClose: parseFloat((base - change).toFixed(2)),
    timestamp: Math.floor(Date.now() / 1000),
  }
}
