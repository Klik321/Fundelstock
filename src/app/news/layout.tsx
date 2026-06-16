import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial News Feed — Market-Moving Headlines',
  description:
    'Browse market-moving financial news filtered by sector, sentiment, and recency. Real-time headlines aggregated for fundamental traders.',
  alternates: { canonical: '/news' },
  openGraph: { url: '/news', title: 'Financial News Feed' },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
