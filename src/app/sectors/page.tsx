import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BarChart2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { SECTORS } from '@/data/sectors'

const MiniChart = dynamic(() => import('@/components/tradingview/MiniChart'), { ssr: false })

export const metadata: Metadata = {
  title: 'All Sectors',
  description:
    'Browse all 11 GICS stock market sectors with live TradingView charts and latest news. Technology, Healthcare, Financials, Energy, and more.',
}

export default function SectorsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-medium bg-bg-elevated text-text-secondary text-[11px] font-medium mb-4">
          <BarChart2 size={12} />
          S&amp;P 500 · 11 GICS Sectors
        </div>
        <h1 className="text-3xl font-bold text-text-primary">All Market Sectors</h1>
        <p className="mt-2 text-text-secondary max-w-xl">
          Select any sector to view its live chart, breaking news, and key stocks.
          All news links open the original source article.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTORS.map((sector) => (
          <Link
            key={sector.slug}
            href={`/sectors/${sector.slug}`}
            className="card overflow-hidden group block"
          >
            {/* Chart */}
            <MiniChart symbol={sector.tvSymbol} height={130} />

            {/* Info bar */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `${sector.color}20`,
                    border: `1px solid ${sector.color}40`,
                    color: sector.color,
                  }}
                >
                  {sector.etf}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{sector.name}</p>
                  <p className="text-[10px] text-text-tertiary line-clamp-1 max-w-[160px]">
                    {sector.description.split('.')[0]}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={15}
                className="text-text-tertiary group-hover:text-accent-blue group-hover:translate-x-1 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
