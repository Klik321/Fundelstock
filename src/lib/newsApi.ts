import type { NewsArticle, NewsFeedResponse } from '@/types/news'

/**
 * Fetches news from the internal API route (which proxies to NewsAPI / Finnhub).
 * Always call this from the client side or from server components via the
 * /api/news route to keep API keys server-side.
 */
export async function fetchNews(params: {
  category?: string
  keywords?: string[]
  page?: number
  limit?: number
}): Promise<NewsFeedResponse> {
  const { category, keywords, page = 1, limit = 10 } = params

  const query = new URLSearchParams()
  if (category) query.set('category', category)
  if (keywords?.length) query.set('q', keywords.join(' '))
  query.set('page', String(page))
  query.set('limit', String(limit))

  const res = await fetch(`/api/news?${query.toString()}`, {
    next: { revalidate: 300 }, // cache for 5 minutes
  })

  if (!res.ok) {
    throw new Error(`News API error: ${res.status}`)
  }

  return res.json()
}

/**
 * Maps a Finnhub news item to our internal NewsArticle shape.
 */
export function mapFinnhubArticle(raw: {
  id: number
  headline: string
  summary: string
  url: string
  image: string
  source: string
  datetime: number
  category: string
  related?: string
}): NewsArticle {
  return {
    id: String(raw.id),
    headline: raw.headline,
    summary: raw.summary,
    url: raw.url,
    image: raw.image || null,
    source: raw.source,
    publishedAt: new Date(raw.datetime * 1000).toISOString(),
    category: raw.category,
    relatedSymbols: raw.related ? raw.related.split(',').map((s) => s.trim()) : [],
  }
}

/**
 * Maps a NewsAPI article to our internal NewsArticle shape.
 */
export function mapNewsApiArticle(raw: {
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  source: { name: string }
  publishedAt: string
  content?: string | null
}, index: number): NewsArticle {
  return {
    id: `newsapi-${index}-${raw.url.slice(-20)}`,
    headline: raw.title,
    summary: raw.description ?? '',
    url: raw.url,
    image: raw.urlToImage,
    source: raw.source.name,
    publishedAt: raw.publishedAt,
    category: 'general',
    relatedSymbols: [],
  }
}
