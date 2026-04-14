export const SITE_NAME = 'Fundelstock'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fundelstock.com'
export const SITE_DESCRIPTION =
  'Real-time financial news categorized by sector and index for fundamental traders.'

/** Max news articles returned per API response */
export const MAX_NEWS_PER_REQUEST = 20

/** How many breaking news items to show in the banner */
export const BREAKING_NEWS_COUNT = 5

/** API rate limit guard — minimum ms between requests to same external endpoint */
export const API_MIN_INTERVAL_MS = 1000

/** Finnhub market-news categories we request */
export const FINNHUB_CATEGORIES = ['general', 'forex', 'crypto', 'merger'] as const

/** Sector slug → display color mapping (used in chart container borders) */
export const SECTOR_COLORS: Record<string, string> = {
  technology: '#2962ff',
  healthcare: '#26a69a',
  financials: '#ff9800',
  energy: '#ef5350',
  'consumer-discretionary': '#7c4dff',
  'consumer-staples': '#4caf50',
  industrials: '#607d8b',
  materials: '#795548',
  'real-estate': '#f06292',
  utilities: '#00bcd4',
  'communication-services': '#ab47bc',
}
