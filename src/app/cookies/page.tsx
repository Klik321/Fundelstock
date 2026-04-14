import type { Metadata } from 'next'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Fundelstock Cookie Policy — how and why we use cookies on our website.',
}

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center">
          <Cookie size={18} className="text-ink-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-ink-primary">Cookie Policy</h1>
      </div>

      <div className="space-y-5 text-sm text-ink-secondary leading-relaxed">
        <p className="text-ink-primary font-medium">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website.
            They help the website remember information about your visit, making your experience
            more convenient and consistent.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-ink-primary text-xs uppercase tracking-wider mb-2">Essential Cookies</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-medium text-ink-primary">Name</th>
                      <th className="text-left py-2 pr-4 font-medium text-ink-primary">Purpose</th>
                      <th className="text-left py-2 font-medium text-ink-primary">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2 pr-4 font-mono text-ink-primary">fundelstock_cookie_consent</td>
                      <td className="py-2 pr-4">Stores your cookie consent preference so we don&apos;t ask again</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-2xs text-ink-muted">
                Essential cookies are necessary for the website to function and cannot be disabled.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-ink-primary text-xs uppercase tracking-wider mb-2">Third-Party Cookies</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-medium text-ink-primary">Provider</th>
                      <th className="text-left py-2 pr-4 font-medium text-ink-primary">Purpose</th>
                      <th className="text-left py-2 font-medium text-ink-primary">More Info</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2 pr-4 font-medium text-ink-primary">TradingView</td>
                      <td className="py-2 pr-4">May set cookies to maintain chart widget sessions and preferences</td>
                      <td className="py-2">
                        <a href="https://www.tradingview.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-ink-primary">Google Fonts</td>
                      <td className="py-2 pr-4">May log requests for font files; no advertising cookies</td>
                      <td className="py-2">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Policy</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Cookies We Do Not Use</h2>
          <p>We do <strong className="text-ink-primary">not</strong> use:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Advertising or tracking cookies</li>
            <li>Third-party analytics cookies (without your consent)</li>
            <li>Profiling or behavioural targeting cookies</li>
            <li>Social media tracking pixels</li>
          </ul>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Managing Cookies</h2>
          <p>You can control and delete cookies in your browser settings:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong className="text-ink-primary">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong className="text-ink-primary">Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
            <li><strong className="text-ink-primary">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong className="text-ink-primary">Edge:</strong> Settings → Cookies and site permissions</li>
          </ul>
          <p>
            Note: Disabling essential cookies may affect the functionality of the website.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy at any time. Changes will be reflected in the
            &quot;Last updated&quot; date above. Continued use of the website after changes
            constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="glass-card space-y-3">
          <h2 className="text-base font-semibold text-ink-primary">Contact</h2>
          <p>
            For questions about our use of cookies:{' '}
            <strong className="text-ink-primary">privacy@fundelstock.com</strong>
          </p>
        </section>

        <div className="text-2xs text-ink-muted pt-4 border-t border-border">
          See also:{' '}
          <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          {' · '}
          <Link href="/terms" className="text-accent hover:underline">Terms of Use</Link>
          {' · '}
          <Link href="/disclaimer" className="text-accent hover:underline">Disclaimer</Link>
        </div>
      </div>
    </div>
  )
}
