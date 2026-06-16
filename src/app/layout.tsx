import type { Metadata, Viewport } from 'next'
import { DM_Sans, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import dynamic from 'next/dynamic'
import { MotionConfig } from 'framer-motion'

// Decorative, below-the-fold-friendly client effects — deferred out of the
// initial bundle (they add nothing to first paint and are purely ambient).
const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), { ssr: false })
const FloatingOrbs = dynamic(() => import('@/components/ui/FloatingOrbs'), { ssr: false })
const CursorSpotlight = dynamic(() => import('@/components/ui/CursorSpotlight'), { ssr: false })
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import ServiceWorkerInit from '@/components/ui/ServiceWorkerInit'
import QueryProvider from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { WatchlistProvider } from '@/providers/WatchlistProvider'
import { SearchProvider } from '@/providers/SearchProvider'
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

// Display face for headings — a tight, technical grotesk that reads more
// "premium terminal" than the brief's original Poppins suggestion.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
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
    site: '@fundlestock',
    creator: '@fundlestock',
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

// ── Structured data (JSON-LD) ────────────────────────────────────────────────
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      description: SITE_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/news?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

// Set the saved theme before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('fundelstock-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`

// ── Root layout ────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <WatchlistProvider>
            <SearchProvider>
              <QueryProvider>
                <CursorSpotlight />
                <ScrollProgressBar />
                <FloatingOrbs />
                <Header />
                <main className="relative z-10 pt-16 min-h-screen">{children}</main>
                <Footer />
                <CookieBanner />
                <ServiceWorkerInit />
                <ChatWidget />
              </QueryProvider>
            </SearchProvider>
          </WatchlistProvider>
        </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  )
}
