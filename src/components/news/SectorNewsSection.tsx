'use client'

import { useState } from 'react'
import { ExternalLink, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { SectorData } from '@/types/market'
import AdvancedChart from '@/components/charts/AdvancedChart'
import NewsFeed from './NewsFeed'
import StockList from '@/components/market/StockList'
import { cn } from '@/lib/utils'

interface SectorNewsSectionProps {
  sector: SectorData
  className?: string
}

type Tab = 'chart' | 'stocks'

export default function SectorNewsSection({ sector, className }: SectorNewsSectionProps) {
  const [leftTab, setLeftTab] = useState<Tab>('chart')

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-5 gap-4 items-start', className)}>

      {/* Left panel — chart or stock list */}
      <div className="lg:col-span-3 glass-card noPadding overflow-hidden flex flex-col">
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
          <div className="flex gap-1 p-0.5 bg-bg-base rounded-xl border border-border">
            {(['chart', 'stocks'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setLeftTab(tab)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-[10px] transition-all duration-150 capitalize',
                  leftTab === tab
                    ? 'bg-bg-elevated text-ink-primary shadow-sm'
                    : 'text-ink-secondary hover:text-ink-primary',
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-ink-muted">{sector.etfSymbol}</span>
            <a
              href={`https://www.tradingview.com/symbols/${sector.tvSymbol.replace(':', '-')}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-2xs text-ink-muted hover:text-accent transition-colors"
            >
              TradingView
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Panel body */}
        <div className="flex-1">
          {leftTab === 'chart' ? (
            <AdvancedChart
              symbol={sector.tvSymbol}
              height={420}
              interval="D"
            />
          ) : (
            <div className="p-4 space-y-4">
              <p className="text-sm text-ink-secondary leading-relaxed">
                {sector.description}
              </p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
                  Representative Stocks
                </p>
                <StockList stocks={sector.stocks} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel — news feed */}
      <div className="lg:col-span-2 glass-card noPadding flex flex-col h-full">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
          <p className="text-sm font-semibold text-ink-primary">Latest News</p>
          <Link
            href={`/sector/${sector.slug}`}
            className="flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors"
          >
            View all
            <ChevronRight size={12} />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[420px]">
          <NewsFeed
            category={sector.slug}
            keywords={sector.keywords}
            variant="compact"
            limit={8}
          />
        </div>
      </div>
    </div>
  )
}
