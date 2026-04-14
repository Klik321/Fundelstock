import type { Metadata, Viewport } from 'next'
import { DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import QueryProvider from '@/providers/QueryProvider'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants'

// ── Fonts ──────────────────────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// ── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Real-Time Market-Moving News for Traders`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'stock market news', 'fundamental trading', 'sector news', 'market events',
    'trading news', 'financial news', 'S&P 500', 'NASDAQ', 'indices',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Real-Time Market-Moving News`,
    description: 'Market-moving news organized by sector and index for fundamental traders.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Real-Time Market News`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0b0e17',
  width: 'device-width',
  initialScale: 1,
}

// ── Root layout ────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${ibmPlexMono.variable} dark`}
    >
      <body>
        <QueryProvider>
          <Header />
          {/* Content padded below the fixed header + ticker tape */}
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
          <CookieBanner />
        </QueryProvider>
      </body>
    </html>
  )
}
