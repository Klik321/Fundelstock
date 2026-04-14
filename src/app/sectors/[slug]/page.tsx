import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import {
  Cpu, Heart, Landmark, Zap, ShoppingBag, ShoppingCart,
  Factory, Gem, Building2, Lightbulb, Radio, type LucideIcon,
} from 'lucide-react'
import { getSectorBySlug, SECTORS } from '@/data/sectors'
import NewsFeed from '@/components/news/NewsFeed'

const AdvancedChart = dynamic(() => import('@/components/tradingview/AdvancedChart'), { ssr: false })
const HeatMap = dynamic(() => import('@/components/tradingview/HeatMap'), { ssr: false })

interface Props { params: { slug: string } }

const ICONS: Record<string, LucideIcon> = {
  Cpu, Heart, Landmark, Zap, ShoppingBag, ShoppingCart,
  Factory, Gem, Building2, Lightbulb, Radio,
}

export async function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sector = getSectorBySlug(params.slug)
  if (!sector) return { title: 'Sector Not Found' }
  return {
    title: `${sector.name} Sector — ${sector.etf}`,
    description: `Live chart and breaking news for the ${sector.name} sector (${sector.etf} ETF). ${sector.description}`,
  }
}

export default function SectorDetailPage({ params }: Props) {
  const sector = getSectorBySlug(params.slug)
  if (!sector) notFound()

  const Icon = ICONS[sector.iconName] ?? Cpu

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link
        href="/sectors"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        All Sectors
      </Link>

      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${sector.color}20`, border: `1px solid ${sector.color}40` }}
          >
            <Icon size={22} style={{ color: sector.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-text-primary">{sector.name}</h1>
              <a
                href={`https://www.tradingview.com/symbols/${sector.tvSymbol.replace(':', '-')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-text-tertiary hover:text-accent-blue transition-colors font-mono"
              >
                {sector.etf}
                <ExternalLink size={10} />
              </a>
            </div>
            <p className="text-sm text-text-secondary mt-0.5 max-w-lg">{sector.description}</p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">

        {/* ── Left: News feed ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">
              Latest {sector.name} News
            </p>
            <p className="text-[11px] text-text-tertiary">
              Links open original source ↗
            </p>
          </div>
          <NewsFeed sectorSlug={sector.slug} variant="default" initialLimit={10} />
        </div>

        {/* ── Right: Sticky sidebar ── */}
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          {/* Chart */}
          <div className="card overflow-hidden p-0">
            <div className="px-4 pt-3 pb-2 border-b border-border-subtle flex items-center justify-between">
              <p className="text-xs font-semibold text-text-primary">{sector.etf} Chart</p>
              <a
                href={`https://www.tradingview.com/symbols/${sector.tvSymbol.replace(':', '-')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-text-tertiary hover:text-accent-blue flex items-center gap-1 transition-colors"
              >
                TradingView <ExternalLink size={9} />
              </a>
            </div>
            <AdvancedChart symbol={sector.tvSymbol} height={380} />
          </div>

          {/* Heatmap */}
          <div className="card overflow-hidden p-0">
            <div className="px-4 pt-3 pb-2 border-b border-border-subtle">
              <p className="text-xs font-semibold text-text-primary">S&amp;P 500 Sector Heatmap</p>
            </div>
            <HeatMap dataSource="SPX500" grouping="sector" height={280} />
          </div>

          {/* Key stocks */}
          <div className="card">
            <p className="text-xs font-semibold text-text-primary mb-3">Key Stocks</p>
            <div className="grid grid-cols-2 gap-2">
              {sector.stocks.map((s) => (
                <a
                  key={s.symbol}
                  href={`https://www.tradingview.com/symbols/${s.tvSymbol.replace(':', '-')}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-border-medium bg-bg-elevated hover:border-border-strong hover:bg-bg-surface-hover transition-all group"
                >
                  <div>
                    <p className="text-xs font-bold text-text-primary font-mono">{s.symbol}</p>
                    <p className="text-[10px] text-text-tertiary truncate max-w-[70px]">{s.name}</p>
                  </div>
                  <ExternalLink size={10} className="text-text-tertiary group-hover:text-accent-blue transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 pt-4 border-t border-border-subtle">
        <p className="text-[11px] text-text-tertiary text-center">
          News content is sourced from third-party providers. Fundelstock does not create or
          endorse any content. Charts by{' '}
          <a href="https://www.tradingview.com" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
            TradingView
          </a>
          . For informational purposes only.
        </p>
      </div>
    </div>
  )
}
