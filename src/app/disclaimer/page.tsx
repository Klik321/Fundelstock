import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Financial Disclaimer',
  description:
    'Important financial disclaimer for Fundelstock. We are not registered investment advisors. Content is for informational purposes only.',
  robots: { index: true, follow: true },
}

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      {/* Prominent amber warning */}
      <div className="rounded-xl border-2 border-accent-amber bg-accent-amber-bg p-5 mb-8 flex items-start gap-4">
        <AlertTriangle size={22} className="text-accent-amber shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm">
          <p className="font-bold text-accent-amber text-base">Important Financial Disclaimer</p>
          <ul className="space-y-1.5 text-accent-amber/90 list-disc list-inside">
            <li>Fundelstock is <strong>NOT</strong> a registered investment advisor, broker, or dealer.</li>
            <li>Content is for <strong>informational purposes only</strong> and should <strong>NOT</strong> be considered financial advice.</li>
            <li>Past performance is <strong>not indicative of future results.</strong></li>
            <li>Trading involves <strong>risk of substantial loss.</strong></li>
            <li>Always consult a <strong>qualified financial advisor</strong> before making investment decisions.</li>
            <li>We do <strong>not guarantee</strong> accuracy, completeness, or timeliness of any information.</li>
            <li>We are <strong>not affiliated</strong> with any companies mentioned in news articles.</li>
          </ul>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-text-primary mb-2">Disclaimer</h1>
      <p className="text-sm text-text-tertiary mb-8">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="space-y-5 text-sm text-text-secondary leading-relaxed">
        {[
          {
            title: 'Not Financial Advice',
            body: `The information provided on Fundelstock ("the Website") is for general informational and educational purposes only. Nothing on this Website constitutes financial, investment, legal, accounting, tax, or any other type of professional advice. You should not rely on any information here as a substitute for professional advice tailored to your specific situation.`,
          },
          {
            title: 'No Investment Recommendations',
            body: `Fundelstock does not recommend the purchase, sale, or holding of any security, financial instrument, or investment strategy. Any information displayed — including news articles, charts, price data, or sector categorizations — is provided solely for informational purposes and does not constitute a solicitation or recommendation to buy or sell securities.`,
          },
          {
            title: 'Third-Party Content',
            body: `All news articles are sourced from third-party news providers (Finnhub, NewsAPI, and their content partners). Fundelstock does not create, author, edit, verify, or endorse any third-party content. We are not responsible for the accuracy, completeness, timeliness, or reliability of any third-party content. Links to external websites are provided for convenience only.`,
          },
          {
            title: 'Market Data',
            body: `Charts and price data are provided by TradingView and may be delayed per exchange rules. Market data is provided for informational purposes only and may not be accurate, complete, or current.`,
          },
          {
            title: 'Past Performance',
            body: `Past performance of any financial instrument, index, or trading strategy does not guarantee or predict future results. Investing involves substantial risk, including the possible loss of principal.`,
          },
          {
            title: 'Limitation of Liability',
            body: `To the fullest extent permitted by applicable law, Fundelstock and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, the Website or any content thereon, including any investment decisions made in reliance on information found on this Website.`,
          },
          {
            title: 'No Warranty',
            body: `The Website is provided "as is" and "as available" without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
          },
        ].map(({ title, body }) => (
          <div key={title} className="card space-y-2">
            <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
            <p>{body}</p>
          </div>
        ))}

        <div className="text-[11px] text-text-tertiary pt-4 border-t border-border-subtle">
          <Link href="/privacy" className="text-accent-blue hover:underline">Privacy Policy</Link>
          {' · '}
          <Link href="/terms" className="text-accent-blue hover:underline">Terms of Use</Link>
          {' · '}
          <Link href="/cookies" className="text-accent-blue hover:underline">Cookie Policy</Link>
        </div>
      </div>
    </div>
  )
}
