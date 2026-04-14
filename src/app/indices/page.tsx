import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Globe } from 'lucide-react'
import dynamic from 'next/dynamic'
import { INDICES } from '@/data/indices'

const MiniChart = dynamic(() => import('@/components/tradingview/MiniChart'), { ssr: false })

export const metadata: Metadata = {
  title: 'Global Indices',
  description:
    'Live charts and breaking news for 10 major global stock indices — S&P 500, NASDAQ, Dow Jones, FTSE 100, DAX, Nikkei 225, and more.',
}

export default function IndicesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-medium bg-bg-elevated text-text-secondary text-[11px] font-medium mb-4">
          <Globe size={12} />
          10 Major Global Markets
        </div>
        <h1 className="text-3xl font-bold text-text-primary">Global Indices</h1>
        <p className="mt-2 text-text-secondary max-w-xl">
          Real-time charts and market-moving news for the world&apos;s most-watched indices.
          Click any headline to read the full story at its original source.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {INDICES.map((index) => (
          <Link
            key={index.slug}
            href={`/indices/${index.slug}`}
            className="card overflow-hidden group block"
          >
            <MiniChart symbol={index.tvSymbol} height={110} />
            <div className="flex items-center justify-between px-3 py-2.5">
              <div>
                <p className="text-xs font-semibold text-text-primary">{index.shortName}</p>
                <p className="text-[10px] text-text-tertiary mt-0.5">{index.region}</p>
              </div>
              <ArrowRight
                size={13}
                className="text-text-tertiary group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
