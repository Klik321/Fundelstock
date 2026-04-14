import type { Metadata } from 'next'
import { TrendingUp } from 'lucide-react'
import PortfolioTracker from '@/components/portfolio/PortfolioTracker'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Portfolio Tracker',
  description:
    'Track live TradingView charts for your stock portfolio positions. Add up to 12 ticker symbols and monitor them side-by-side.',
  robots: { index: false, follow: false }, // personal tool — no need to index
}

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
      <ScrollReveal className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-medium bg-bg-elevated text-text-secondary text-[11px] font-medium mb-4">
          <TrendingUp size={12} className="text-accent-green" />
          Saved locally · No account needed
        </div>
        <h1 className="text-3xl font-bold text-text-primary">Portfolio Tracker</h1>
        <p className="mt-2 text-text-secondary max-w-xl">
          Add your ticker symbols to track live mini charts side-by-side.
          Your watchlist is saved in your browser — no login required.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent-amber-border bg-accent-amber-bg text-accent-amber text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
          Not financial advice — charts are for informational purposes only
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <PortfolioTracker />
      </ScrollReveal>
    </div>
  )
}
