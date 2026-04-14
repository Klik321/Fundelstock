import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity, Globe, BarChart2, Newspaper, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Fundelstock — a financial news aggregation platform built for fundamental traders.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #2962ff, #7c4dff)' }}
        >
          <Activity size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-text-primary">Fundel</span>
            <span className="text-accent-blue">stock</span>
          </h1>
          <p className="text-sm text-text-secondary">Real-Time Market Intelligence</p>
        </div>
      </div>

      <div className="space-y-5 text-sm text-text-secondary leading-relaxed">
        {/* Mission */}
        <div className="card space-y-3">
          <h2 className="text-base font-semibold text-text-primary">Our Mission</h2>
          <p>
            Fundamental traders need to track global events that move markets — earnings,
            macro data, geopolitical developments, regulatory decisions. But that intelligence
            is scattered across dozens of websites, newsletters, and feeds.
          </p>
          <p>
            <strong className="text-text-primary">Fundelstock puts it all in one place</strong>,
            organized by the stock market sectors and global indices that actually matter to
            your portfolio.
          </p>
        </div>

        {/* What we are */}
        <div className="card space-y-3">
          <h2 className="text-base font-semibold text-text-primary">What We Are</h2>
          <p>
            Fundelstock is a <strong className="text-text-primary">news aggregator</strong>, not
            a publisher. We do not write, edit, or endorse any news content. Every headline you
            see links directly to its original source — Reuters, Bloomberg, CNBC, the Financial
            Times, and thousands of other news outlets served through our API partners.
          </p>
          <p>
            Charts and real-time market data are provided free of charge by{' '}
            <a
              href="https://www.tradingview.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              TradingView
            </a>
            , the industry standard for professional charting.
          </p>
        </div>

        {/* Features */}
        <div className="card space-y-4">
          <h2 className="text-base font-semibold text-text-primary">Features</h2>
          {[
            {
              icon: BarChart2,
              title: '11 GICS Sectors',
              desc: 'News auto-tagged to Technology, Healthcare, Financials, Energy, and all other S&P 500 sectors.',
            },
            {
              icon: Globe,
              title: '10 Global Indices',
              desc: 'S&P 500, NASDAQ, Dow Jones, FTSE 100, DAX, Nikkei 225, and more — each with a live TradingView chart.',
            },
            {
              icon: Newspaper,
              title: 'Breaking News Detection',
              desc: 'Time-sensitive stories are surfaced and highlighted automatically using recency and keyword signals.',
            },
            {
              icon: Shield,
              title: 'Security First',
              desc: 'Strict CSP headers, HSTS, no tracking cookies. All external links include rel="noopener noreferrer".',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-blue-bg border border-accent-blue-border flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={14} className="text-accent-blue" />
              </div>
              <div>
                <p className="font-medium text-text-primary">{title}</p>
                <p className="text-[13px] text-text-secondary mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="card space-y-3">
          <h2 className="text-base font-semibold text-text-primary">Built With</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
              'TradingView Widgets', 'Finnhub API', 'NewsAPI', 'React Query',
            ].map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-bg-elevated border border-border-medium text-xs text-text-secondary font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="rounded-xl border border-accent-amber-border bg-accent-amber-bg p-4">
          <p className="text-xs text-accent-amber leading-relaxed">
            <strong>Important:</strong> Fundelstock is for informational purposes only.
            Nothing here is financial advice. Always consult a qualified financial advisor
            before making investment decisions.{' '}
            <Link href="/disclaimer" className="underline hover:no-underline">
              Read full disclaimer →
            </Link>
          </p>
        </div>

        {/* Links */}
        <div className="text-2xs text-text-tertiary pt-2 border-t border-border-subtle">
          <Link href="/privacy" className="text-accent-blue hover:underline">Privacy Policy</Link>
          {' · '}
          <Link href="/terms" className="text-accent-blue hover:underline">Terms of Use</Link>
          {' · '}
          <Link href="/contact" className="text-accent-blue hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  )
}
