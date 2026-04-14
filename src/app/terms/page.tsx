import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Fundelstock Terms of Use — the rules governing your use of our financial news aggregation service.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center">
          <FileText size={18} className="text-ink-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-ink-primary">Terms of Use</h1>
      </div>

      <div className="space-y-5 text-sm text-ink-secondary leading-relaxed">
        <p className="text-ink-primary font-medium">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Fundelstock (&quot;the Website&quot;, &quot;the Service&quot;),
            you agree to be bound by these Terms of Use. If you do not agree with any part of
            these terms, you must not use the Service. We reserve the right to update these terms
            at any time. Continued use of the Service after changes constitutes acceptance.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">2. Description of Service</h2>
          <p>
            Fundelstock is a financial news aggregation platform that displays headlines and
            links to articles published by third-party news sources. We also embed market data
            charts from TradingView. We do <strong className="text-ink-primary">not</strong>{' '}
            create original editorial content, provide investment advice, or operate as a
            financial services firm.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">3. Informational Use Only</h2>
          <p>
            All content on the Website is provided for informational purposes only. Nothing
            on this Website constitutes financial, investment, legal, or tax advice.
            See our full <Link href="/disclaimer" className="text-accent hover:underline">Disclaimer</Link>.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">4. Intellectual Property</h2>
          <p>
            The Fundelstock brand, logo, and original website design are proprietary. All
            news content and market data displayed are the intellectual property of their
            respective owners (Reuters, Bloomberg, NewsAPI partners, TradingView, Finnhub, etc.).
            We display such content under fair use principles or through licensed APIs.
          </p>
          <p>
            You may not scrape, reproduce, redistribute, or commercialise the content or
            data displayed on this Website without the express written permission of the
            relevant rights holder.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">5. Prohibited Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorised access to any part of the Service</li>
            <li>Scrape or automatically harvest content or data</li>
            <li>Transmit malware, spam, or disruptive content</li>
            <li>Use the Service to manipulate securities markets</li>
            <li>Reproduce or redistribute content for commercial purposes</li>
          </ul>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">6. Third-Party Links</h2>
          <p>
            The Service contains links to third-party news articles and websites. These links
            are provided solely for convenience. We have no control over and accept no
            responsibility for the content, privacy practices, or terms of service of any
            linked website. Accessing external links is entirely at your own risk.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Fundelstock and its operators shall not
            be liable for any direct, indirect, incidental, special, consequential, or
            punitive damages resulting from your use of or inability to use the Service,
            including any reliance on information displayed on the Website.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">8. Disclaimer of Warranties</h2>
          <p>
            The Service is provided &quot;as is&quot; without any warranties of any kind,
            express or implied. We do not warrant that the Service will be uninterrupted,
            error-free, or free of viruses or other harmful components.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable law.
            Any disputes shall be subject to the exclusive jurisdiction of the courts in the
            relevant jurisdiction.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">10. Contact</h2>
          <p>
            If you have questions about these Terms, please contact:{' '}
            <strong className="text-ink-primary">legal@fundelstock.com</strong>
          </p>
        </section>

        <div className="text-2xs text-ink-muted pt-4 border-t border-border">
          See also:{' '}
          <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          {' · '}
          <Link href="/disclaimer" className="text-accent hover:underline">Disclaimer</Link>
          {' · '}
          <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link>
        </div>
      </div>
    </div>
  )
}
