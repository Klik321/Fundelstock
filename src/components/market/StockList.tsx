'use client'

import { ExternalLink } from 'lucide-react'
import type { StockPreview } from '@/types/market'
import { cn } from '@/lib/utils'

interface StockListProps {
  stocks: StockPreview[]
  className?: string
}

export default function StockList({ stocks, className }: StockListProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-2', className)}>
      {stocks.map((stock) => (
        <a
          key={stock.symbol}
          href={`https://www.tradingview.com/symbols/${stock.tvSymbol.replace(':', '-')}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-border bg-bg-elevated hover:border-border-strong hover:bg-bg-overlay transition-all duration-150 group"
        >
          <div>
            <p className="text-xs font-semibold text-ink-primary">{stock.symbol}</p>
            <p className="text-2xs text-ink-muted truncate max-w-[80px]">{stock.name}</p>
          </div>
          <ExternalLink
            size={10}
            className="text-ink-muted group-hover:text-ink-secondary transition-colors shrink-0"
          />
        </a>
      ))}
    </div>
  )
}
