import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react'
import { getIndexBySlug, INDICES } from '@/data/indices'
import NewsFeed from '@/components/news/NewsFeed'

const AdvancedChart = dynamic(() => import('@/components/tradingview/AdvancedChart'), { ssr: false })
const MarketOverview = dynamic(() => import('@/components/tradingview/MarketOverview'), { ssr: false })

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return INDICES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const index = getIndexBySlug(params.slug)
  if (!index) return { title: 'Index Not Found' }
  return {
    title: `${index.name} — ${index.shortName} Live Chart & News`,
    description: `Live TradingView chart and breaking news for the ${index.name}. ${index.description}`,
  }
}

export default function IndexDetailPage({ params }: Props) {
  const index = getIndexBySlug(params.slug)
  if (!index) notFound()

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link
        href="/indices"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        All Indices
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-blue-bg border border-accent-blue-border flex items-center justify-center shrink-0">
            <Globe size={22} className="text-accent-blue" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-text-primary">{index.name}</h1>
              <a
                href={`https://www.tradingview.com/symbols/${index.tvSymbol.replace(':', '-')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-text-tertiary hover:text-accent-blue transition-colors font-mono"
              >
                {index.tvSymbol}
                <ExternalLink size={10} />
              </a>
            </div>
            <p className="text-sm text-text-secondary mt-0.5 max-w-lg">{index.description}</p>
            <p className="text-[11px] text-text-tertiary mt-1">
              {index.region} · {index.currency}
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">

        {/* Left: news */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">
              {index.shortName} News
            </p>
            <p className="text-[11px] text-text-tertiary">Links open original source ↗</p>
          </div>
          <NewsFeed indexSlug={index.slug} variant="default" initialLimit={10} />
        </div>

        {/* Right: sticky sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          {/* Advanced chart */}
          <div className="card overflow-hidden p-0">
            <div className="px-4 pt-3 pb-2 border-b border-border-subtle flex items-center justify-between">
              <p className="text-xs font-semibold text-text-primary">{index.shortName} Chart</p>
              <a
                href={`https://www.tradingview.com/symbols/${index.tvSymbol.replace(':', '-')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-text-tertiary hover:text-accent-blue flex items-center gap-1 transition-colors"
              >
                TradingView <ExternalLink size={9} />
              </a>
            </div>
            <AdvancedChart symbol={index.tvSymbol} height={380} />
          </div>

          {/* Market overview */}
          <div className="card overflow-hidden p-0">
            <div className="px-4 pt-3 pb-2 border-b border-border-subtle">
              <p className="text-xs font-semibold text-text-primary">Related Markets</p>
            </div>
            <MarketOverview height={280} />
          </div>
        </aside>
      </div>

      <div className="mt-12 pt-4 border-t border-border-subtle">
        <p className="text-[11px] text-text-tertiary text-center">
          Charts by{' '}
          <a href="https://www.tradingview.com" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
            TradingView
          </a>
          . Market data may be delayed. For informational purposes only — not financial advice.
        </p>
      </div>
    </div>
  )
}
