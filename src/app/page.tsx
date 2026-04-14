import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fetchNews, fetchBreakingNews } from '@/lib/api'
import { SECTORS } from '@/data/sectors'
import { INDICES } from '@/data/indices'
import BreakingBanner from '@/components/news/BreakingBanner'
import SectorGrid from '@/components/market/SectorGrid'
import IndexRow from '@/components/market/IndexRow'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import ScrollReveal from '@/components/ui/ScrollReveal'

// Heavy TradingView widgets — client-only (no SSR)
const TickerTape = dynamic(() => import('@/components/tradingview/TickerTape'), { ssr: false })
const MarketOverview = dynamic(() => import('@/components/tradingview/MarketOverview'), { ssr: false })
const StockMarketWidget = dynamic(() => import('@/components/tradingview/StockMarketWidget'), { ssr: false })

// ── Server-side data ────────────────────────────────────────────────────────
async function getHomeData() {
  const [breakingRes, generalRes] = await Promise.all([
    fetchBreakingNews(),
    fetchNews({ limit: 60 }),
  ])

  // Build headline map per sector (max 3 per sector)
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

// ── Page ────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const { breaking, newsMap } = await getHomeData()

  return (
    <>
      {/* ── Sticky Ticker Tape — pinned just below the fixed header ── */}
      <div className="sticky top-16 z-40 border-b border-border-subtle bg-bg-ticker">
        <Suspense fallback={<div className="h-10" />}>
          <TickerTape />
        </Suspense>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Stats ── */}
        <StatsSection />

        {/* ── Divider ── */}
        <div className="border-t border-border-subtle" />

        {/* ── Features section (Thala-style glass cards) ── */}
        <FeaturesSection />

        {/* ── Divider ── */}
        <div className="border-t border-border-subtle" />

        {/* ── Breaking News ── */}
        {breaking.length > 0 && (
          <ScrollReveal className="py-10">
            <BreakingBanner articles={breaking} />
          </ScrollReveal>
        )}

        {/* ── Global Indices ── */}
        <ScrollReveal delay={0.05} className="pb-12">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="section-title">Global Indices</h2>
              <p className="mt-3 text-sm text-text-secondary">
                Live mini charts for major benchmarks worldwide
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
        </ScrollReveal>

        {/* ── Market Overview widget ── */}
        <ScrollReveal delay={0.05} className="pb-12">
          <h2 className="section-title mb-6">Market Overview</h2>
          <div className="card overflow-hidden p-0">
            <Suspense fallback={<div className="h-[420px] skeleton" />}>
              <MarketOverview height={420} />
            </Suspense>
          </div>
        </ScrollReveal>

        {/* ── Sector Grid ── */}
        <section id="sectors" className="pb-12 scroll-mt-28">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="section-title">Markets by Sector</h2>
                <p className="mt-3 text-sm text-text-secondary">
                  Live ETF charts and breaking news for each S&amp;P 500 GICS sector
                </p>
              </div>
              <Link
                href="/sectors"
                className="flex items-center gap-1.5 text-sm text-accent-blue hover:text-accent-blue-hover transition-colors"
              >
                All sectors <ArrowRight size={13} />
              </Link>
            </div>
          </ScrollReveal>
          {/* SectorGrid has its own whileInView stagger internally */}
          <SectorGrid sectors={SECTORS} newsMap={newsMap} />
        </section>

        {/* ── Market Movers ── */}
        <ScrollReveal delay={0.05} className="pb-12">
          <h2 className="section-title mb-6">Market Movers</h2>
          <div className="card overflow-hidden p-0">
            <Suspense fallback={<div className="h-[400px] skeleton" />}>
              <StockMarketWidget height={400} />
            </Suspense>
          </div>
        </ScrollReveal>

        {/* ── Legal disclaimer strip ── */}
        <ScrollReveal className="py-8 border-t border-border-subtle mb-4">
          <p className="text-xs text-text-tertiary text-center max-w-2xl mx-auto leading-relaxed">
            Fundelstock is for informational purposes only. Nothing here constitutes financial
            advice. Charts by{' '}
            <a
              href="https://www.tradingview.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              TradingView
            </a>
            . News from third-party APIs.{' '}
            <Link
              href="/disclaimer"
              className="text-text-secondary hover:text-text-primary underline-offset-2 hover:underline"
            >
              Full disclaimer →
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </>
  )
}
