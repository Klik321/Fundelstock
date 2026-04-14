'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Plus, Trash2, TrendingUp, Search } from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { cn } from '@/lib/utils'

const MiniChart = dynamic(() => import('@/components/tradingview/MiniChart'), { ssr: false })

interface Ticker {
  symbol: string // e.g. "NASDAQ:AAPL"
  label: string  // e.g. "AAPL"
}

const POPULAR: Ticker[] = [
  { symbol: 'NASDAQ:AAPL', label: 'AAPL' },
  { symbol: 'NASDAQ:MSFT', label: 'MSFT' },
  { symbol: 'NASDAQ:GOOGL', label: 'GOOGL' },
  { symbol: 'NASDAQ:AMZN', label: 'AMZN' },
  { symbol: 'NASDAQ:NVDA', label: 'NVDA' },
  { symbol: 'NASDAQ:TSLA', label: 'TSLA' },
  { symbol: 'NYSE:JPM', label: 'JPM' },
  { symbol: 'NYSE:JNJ', label: 'JNJ' },
]

function toTVSymbol(raw: string): Ticker | null {
  const cleaned = raw.trim().toUpperCase().replace(/[^A-Z0-9:.]/g, '')
  if (!cleaned || cleaned.length > 20) return null
  // If it already has an exchange prefix, use as-is
  if (cleaned.includes(':')) return { symbol: cleaned, label: cleaned.split(':')[1] }
  // Default to NASDAQ for 1-5 char symbols
  return { symbol: `NASDAQ:${cleaned}`, label: cleaned }
}

export default function PortfolioTracker() {
  const [tickers, setTickers] = useLocalStorage<Ticker[]>('fundelstock-portfolio', [])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const addTicker = useCallback(() => {
    const parsed = toTVSymbol(input)
    if (!parsed) { setError('Invalid ticker symbol'); return }
    if (tickers.some((t) => t.symbol === parsed.symbol)) {
      setError('Already in portfolio')
      return
    }
    if (tickers.length >= 12) { setError('Max 12 tickers'); return }
    setTickers([...tickers, parsed])
    setInput('')
    setError('')
  }, [input, tickers, setTickers])

  const removeTicker = useCallback(
    (symbol: string) => setTickers(tickers.filter((t) => t.symbol !== symbol)),
    [tickers, setTickers],
  )

  const addPopular = useCallback(
    (t: Ticker) => {
      if (tickers.some((x) => x.symbol === t.symbol)) return
      if (tickers.length >= 12) return
      setTickers([...tickers, t])
    },
    [tickers, setTickers],
  )

  return (
    <div className="space-y-6">
      {/* Add ticker input */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              value={input}
              onChange={(e) => { setInput(e.target.value); setError('') }}
              onKeyDown={(e) => { if (e.key === 'Enter') addTicker() }}
              placeholder="Enter ticker (e.g. AAPL, NYSE:XOM)"
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border-medium bg-bg-elevated text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
            />
          </div>
          <button
            onClick={addTicker}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-accent-blue hover:bg-accent-blue-hover text-white text-sm font-semibold rounded-xl transition-colors shadow-glow-blue"
          >
            <Plus size={15} />
            Add
          </button>
        </div>
        {error && <p className="text-xs text-accent-red pl-1">{error}</p>}

        {/* Popular suggestions */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] text-text-tertiary self-center">Quick add:</span>
          {POPULAR.map((t) => (
            <button
              key={t.symbol}
              onClick={() => addPopular(t)}
              disabled={tickers.some((x) => x.symbol === t.symbol)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-all',
                tickers.some((x) => x.symbol === t.symbol)
                  ? 'border-border-subtle text-text-tertiary cursor-default opacity-50'
                  : 'border-border-medium bg-bg-elevated text-text-secondary hover:border-accent-blue hover:text-accent-blue hover:bg-accent-blue-bg',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {tickers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-accent-blue-bg border border-accent-blue-border flex items-center justify-center">
            <TrendingUp size={22} className="text-accent-blue" />
          </div>
          <p className="text-sm font-medium text-text-primary">Your portfolio is empty</p>
          <p className="text-xs text-text-tertiary max-w-xs">
            Add ticker symbols above to track live charts for your portfolio positions.
          </p>
        </div>
      )}

      {/* Ticker grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence>
          {tickers.map((ticker) => (
            <motion.div
              key={ticker.symbol}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="card overflow-hidden group relative"
            >
              {/* Remove button */}
              <button
                onClick={() => removeTicker(ticker.symbol)}
                aria-label={`Remove ${ticker.label}`}
                className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-lg bg-bg-elevated border border-border-medium text-text-tertiary hover:text-accent-red hover:border-accent-red-border hover:bg-accent-red-bg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={11} />
              </button>

              <MiniChart symbol={ticker.symbol} height={140} />

              <div className="px-3 py-2.5">
                <p className="text-sm font-bold text-text-primary font-mono">{ticker.label}</p>
                <p className="text-[10px] text-text-tertiary">{ticker.symbol}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {tickers.length > 0 && (
        <p className="text-[11px] text-text-tertiary text-center">
          {tickers.length} / 12 tickers · Charts by TradingView · Saved locally in your browser
        </p>
      )}
    </div>
  )
}
