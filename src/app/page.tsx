import { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, BarChart2, Globe, Newspaper, TrendingUp } from 'lucide-react'
import { fetchNews, fetchBreakingNews } from '@/lib/api'
import { SECTORS } from '@/data/sectors'
import { INDICES } from '@/data/indices'
import BreakingBanner from '@/components/news/BreakingBanner'
import SectorGrid from '@/components/market/SectorGrid'
import IndexRow from '@/components/market/IndexRow'

// Heavy TradingView widgets loaded client-side only
const TickerTape = dynamic(() => import('@/components/tradingview/TickerTape'), { ssr: false })
const MarketOverview = dynamic(() => import('@/components/tradingview/MarketOverview'), { ssr: false })
const StockMarketWidget = dynamic(() => import('@/components/tradingview/StockMarketWidget'), { ssr: false })

// Server-side data
async function getHomeData() {
  const [breakingRes, generalRes] = await Promise.all([
    fetchBreakingNews(),
    fetchNews({ limit: 60 }),
  ])

  // Build headlines map per sector
  const newsMap: Record<string, { headline: string; url: string }[]> = {}
  for (const article of generalRes.articles) {
    for (const slug of article.sectors) {
      if (!newsMap[slug]) newsMap[slug] = []
      if (newsMap[slug].length < 3) {
        newsMap[slug].push({ headline: article.headline, url: article.url })
      }
    }
  }

  return { breaking: breakingRes, newsMap }
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default async function HomePage() {
  const { breaking, newsMap } = await getHomeData()

  return (
    <>
      {/* ── Live Ticker Tape — above everything ── */}
      <div className="sticky top-16 z-40 border-b border-border-subtle bg-bg-ticker">
        <TickerTape />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <section className="pt-14 pb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-blue-border bg-accent-blue-bg text-accent-blue text-[11px] font-semibold mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse-dot" />
              Live Market Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
              Market-Moving News.{' '}
              <span className="text-gradient-brand">One Place.</span>
            </h1>
            <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-xl">
              Fundelstock aggregates breaking financial news categorized by sector and global
              index — so fundamental traders spend less time searching and more time deciding.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#sectors"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-blue hover:bg-accent-blue-hover text-white font-medium text-sm rounded-xl transition-colors shadow-glow-blue hover:shadow-glow-blue"
              >
                Explore Sectors
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/indices"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-medium bg-bg-elevated hover:bg-bg-surface-hover text-text-secondary hover:text-text-primary font-medium text-sm rounded-xl transition-all"
              >
                <Globe size={14} />
                Global Indices
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Sectors Tracked', value: '11', icon: BarChart2 },
              { label: 'Global Indices', value: '10', icon: Globe },
              { label: 'News Sources', value: '70K+', icon: Newspaper },
              { label: 'Data Freshness', value: 'Live', icon: TrendingUp },
            ].map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className="card flex items-center gap-3 py-3 px-4"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-blue-bg border border-accent-blue-border flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-accent-blue" />
                </div>
                <div>
                  <p className="font-bold text-text-primary font-mono tabular-nums">{value}</p>
                  <p className="text-[10px] text-text-tertiary">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Breaking News ── */}
        {breaking.length > 0 && (
          <section className="pb-10">
            <BreakingBanner articles={breaking} />
          </section>
        )}

        {/* ── Global Indices Row ── */}
        <section className="pb-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="section-title">Global Indices</h2>
              <p className="mt-3 text-sm text-text-secondary">
                Live charts for major benchmarks worldwide
              </p>
            </div>
            <Link
              href="/indices"
              className="flex items-center gap-1.5 text-sm text-accent-blue hover:text-accent-blue-hover transition-colors"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <IndexRow indices={INDICES} />
        </section>

        {/* ── Market Overview widget ── */}
        <section className="pb-10">
          <h2 className="section-title mb-5">Market Overview</h2>
          <div className="card overflow-hidden p-0">
            <MarketOverview height={420} />
          </div>
        </section>

        {/* ── Sector Grid ── */}
        <section id="sectors" className="pb-10 scroll-mt-28">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="section-title">Markets by Sector</h2>
              <p className="mt-3 text-sm text-text-secondary">
                Live ETF charts and latest news for each S&amp;P 500 GICS sector
              </p>
            </div>
            <Link
              href="/sectors"
              className="flex items-center gap-1.5 text-sm text-accent-blue hover:text-accent-blue-hover transition-colors"
            >
              All sectors <ArrowRight size={13} />
            </Link>
          </div>
          <SectorGrid sectors={SECTORS} newsMap={newsMap} />
        </section>

        {/* ── Market Movers ── */}
        <section className="pb-10">
          <h2 className="section-title mb-5">Market Movers</h2>
          <div className="card overflow-hidden p-0">
            <StockMarketWidget height={400} />
          </div>
        </section>

        {/* ── Disclaimer strip ── */}
        <div className="py-6 border-t border-border-subtle mb-4">
          <p className="text-xs text-text-tertiary text-center max-w-2xl mx-auto leading-relaxed">
            Fundelstock is an informational platform only. Nothing on this site constitutes
            financial advice. Charts provided by{' '}
            <a href="https://www.tradingview.com" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
              TradingView
            </a>
            . News sourced from third-party APIs.{' '}
            <Link href="/disclaimer" className="text-text-secondary hover:text-text-primary underline-offset-2 hover:underline">
              Full disclaimer →
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
