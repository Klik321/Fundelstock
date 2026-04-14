import Link from 'next/link'
import { Activity } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-border-subtle bg-bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-md"
                style={{ background: 'linear-gradient(135deg, #2962ff, #7c4dff)' }}
              >
                <Activity size={15} className="text-white" />
              </div>
              <span className="font-bold text-[15px]">
                <span className="text-text-primary">Fundel</span>
                <span className="text-accent-blue">stock</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Real-time financial news for fundamental traders — organized by sector and index.
              We aggregate, never create. Every headline links to its original source.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Market Overview' },
                { href: '/news', label: 'All News' },
                { href: '/sectors', label: 'All Sectors' },
                { href: '/indices', label: 'Global Indices' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/disclaimer', label: 'Disclaimer' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/cookies', label: 'Cookie Policy' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
              Data Sources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.tradingview.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  TradingView
                </a>
                <p className="text-[11px] text-text-tertiary">Charts &amp; market data</p>
              </li>
              <li>
                <a
                  href="https://finnhub.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Finnhub
                </a>
                <p className="text-[11px] text-text-tertiary">Financial news API</p>
              </li>
              <li>
                <a
                  href="https://newsapi.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  NewsAPI
                </a>
                <p className="text-[11px] text-text-tertiary">News aggregation</p>
              </li>
            </ul>
          </div>
        </div>

        {/* ── TradingView attribution (required) ── */}
        <div className="mt-8 p-3 rounded-xl border border-border-subtle bg-bg-elevated text-center">
          <p className="text-[11px] text-text-tertiary">
            Charts and market data provided by{' '}
            <a
              href="https://www.tradingview.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              TradingView
            </a>
            {' '}— a leading charting platform used by millions of traders.
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-6 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-text-tertiary">
            © {year} Fundelstock. All rights reserved. Market data may be delayed per exchange rules.
          </p>
          <p className="text-[11px] font-medium text-accent-amber flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-accent-amber-bg border border-accent-amber-border inline-flex items-center justify-center text-[8px]">
              ⚠
            </span>
            Not financial advice. For informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
