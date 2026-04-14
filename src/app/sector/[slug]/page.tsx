import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import AdvancedChart from '@/components/charts/AdvancedChart'
import NewsFeed from '@/components/news/NewsFeed'
import StockList from '@/components/market/StockList'
import { getSectorBySlug, SECTORS } from '@/config/sectors'
import type { SectorData } from '@/types/market'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sector = getSectorBySlug(params.slug)
  if (!sector) return { title: 'Sector Not Found' }

  return {
    title: `${sector.name} Sector`,
    description: `Live charts, breaking news, and key stocks for the ${sector.name} sector. ${sector.description}`,
  }
}

export default function SectorPage({ params }: Props) {
  const sector: SectorData | undefined = getSectorBySlug(params.slug)

  if (!sector) notFound()

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10">

      {/* Back link */}
      <Link
        href="/#sectors"
        className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        All Sectors
      </Link>

      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold text-ink-primary">{sector.name} Sector</h1>
          <a
            href={`https://www.tradingview.com/symbols/${sector.tvSymbol.replace(':', '-')}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-ink-muted hover:text-accent transition-colors"
          >
            <span className="font-mono">{sector.etfSymbol}</span>
            <ExternalLink size={10} />
          </a>
        </div>
        <p className="text-ink-secondary max-w-2xl">{sector.description}</p>
      </div>

      {/* Chart + News */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-10">
        {/* Chart */}
        <div className="lg:col-span-3 glass-card noPadding overflow-hidden">
          <AdvancedChart symbol={sector.tvSymbol} height={480} interval="D" />
        </div>

        {/* News feed */}
        <div className="lg:col-span-2 glass-card noPadding flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-ink-primary">
              {sector.name} News
            </p>
            <p className="text-2xs text-ink-muted mt-0.5">
              Latest headlines — click to read full article
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[480px]">
            <NewsFeed
              category={sector.slug}
              keywords={sector.keywords}
              variant="compact"
              limit={12}
            />
          </div>
        </div>
      </div>

      {/* Key Stocks */}
      <div className="glass-card mb-10">
        <h2 className="text-base font-semibold text-ink-primary mb-4">
          Key {sector.name} Stocks
        </h2>
        <StockList stocks={sector.stocks} />
        <p className="mt-3 text-2xs text-ink-muted">
          Click any stock to view its chart and details on TradingView.
        </p>
      </div>

      {/* All news (more results) */}
      <div>
        <h2 className="text-base font-semibold text-ink-primary mb-4">
          More {sector.name} News
        </h2>
        <NewsFeed
          category={sector.slug}
          keywords={sector.keywords}
          variant="default"
          limit={12}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 space-y-0"
        />
      </div>

      {/* Disclaimer */}
      <div className="mt-12 pt-6 border-t border-border">
        <p className="text-xs text-ink-muted text-center">
          All news content is sourced from third-party providers. Fundelstock does not create or
          endorse any news content. This page is for informational purposes only.
        </p>
      </div>
    </div>
  )
}
