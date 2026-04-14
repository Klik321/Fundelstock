import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Fundelstock Privacy Policy — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-accent-muted border border-accent/30 flex items-center justify-center">
          <Shield size={18} className="text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-ink-primary">Privacy Policy</h1>
      </div>

      <div className="space-y-5 text-sm text-ink-secondary leading-relaxed">
        <p className="text-ink-primary font-medium">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Introduction</h2>
          <p>
            Fundelstock (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your
            privacy. This Privacy Policy explains what information we collect, how we use it,
            and your rights regarding your personal data when you use our website at
            fundelstock.com (the &quot;Service&quot;).
          </p>
          <p>
            By using the Service, you agree to the collection and use of information in
            accordance with this policy.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Information We Collect</h2>
          <p><strong className="text-ink-primary">We do not require account registration</strong> and do not collect personally identifiable information unless you voluntarily provide it.</p>
          <p>We may automatically collect:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>IP address and approximate geographic location (country/region)</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring URL</li>
            <li>Device type (desktop, mobile, tablet)</li>
            <li>Cookie identifiers (see Cookie Policy)</li>
          </ul>
          <p>This data is collected through standard server logs and, if enabled, analytics tools.</p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">How We Use Your Information</h2>
          <p>We use the collected data to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Operate and maintain the Service</li>
            <li>Monitor and improve performance and user experience</li>
            <li>Detect and prevent abuse or security incidents</li>
            <li>Comply with legal obligations</li>
            <li>Analyse aggregate usage trends (no individual profiling)</li>
          </ul>
          <p>We do <strong className="text-ink-primary">not</strong> sell your personal data to third parties.</p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Third-Party Services</h2>
          <p>Our Service embeds or links to third-party services that have their own privacy practices:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong className="text-ink-primary">TradingView</strong> — provides embedded charts. Subject to TradingView&apos;s Privacy Policy.</li>
            <li><strong className="text-ink-primary">Finnhub / NewsAPI</strong> — provide market data and news. Server-side calls only; your IP is not forwarded.</li>
            <li><strong className="text-ink-primary">Google Fonts</strong> — may set cookies for font delivery.</li>
          </ul>
          <p>We encourage you to review the privacy policies of these third parties.</p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Cookies</h2>
          <p>
            We use essential cookies to remember your preferences (e.g. cookie consent).
            We do not use tracking cookies without your consent. For full details, see our{' '}
            <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link>.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Data Retention</h2>
          <p>
            Server logs are retained for up to 30 days for security purposes and then deleted.
            Cookie data is stored on your device and cleared when you delete your cookies or
            follow the instructions in our Cookie Policy.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Your Rights (GDPR / CCPA)</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Access personal data we hold about you</li>
            <li>Request correction or deletion of your personal data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p>
            To exercise these rights, contact us at the email address below. We will respond
            within 30 days.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Children&apos;s Privacy</h2>
          <p>
            Our Service is not directed to anyone under the age of 13. We do not knowingly
            collect personal information from children. If you believe we have inadvertently
            collected such information, please contact us immediately.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            material changes by updating the &quot;Last updated&quot; date at the top of this page.
            Continued use of the Service after any changes constitutes your acceptance of the
            revised policy.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{' '}
            <strong className="text-ink-primary">privacy@fundelstock.com</strong>
          </p>
        </section>

        <div className="text-2xs text-ink-muted pt-4 border-t border-border">
          See also:{' '}
          <Link href="/terms" className="text-accent hover:underline">Terms of Use</Link>
          {' · '}
          <Link href="/disclaimer" className="text-accent hover:underline">Disclaimer</Link>
          {' · '}
          <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link>
        </div>
      </div>
    </div>
  )
}
