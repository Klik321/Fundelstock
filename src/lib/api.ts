/**
 * Server-side news fetching with multi-provider fallback strategy:
 *   1. Finnhub (primary — market news with sector filter)
 *   2. NewsAPI (secondary — keyword search)
 *   3. Mock data (fallback when no API keys are configured)
 *
 * All functions run server-side only (API routes / RSC).
 * Never expose API keys to the client.
 */

import type { NewsArticle, NewsFeedResponse } from '@/types/news'
import { tagArticle, detectSentiment, isBreaking } from '@/lib/sectorTagger'
import { cache, NEWS_TTL_MS } from '@/lib/cache'
import { MAX_NEWS_PER_REQUEST } from '@/lib/constants'
import { SECTORS } from '@/data/sectors'

// ── Type guards for external API payloads ───────────────────────────────────

interface FinnhubRaw {
  id: number
  headline: string
  summary: string
  url: string
  image: string
  source: string
  datetime: number
  category: string
  related?: string
}

interface NewsApiRaw {
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  source: { name: string }
  publishedAt: string
}

// ── Mappers ─────────────────────────────────────────────────────────────────

function mapFinnhub(raw: FinnhubRaw): NewsArticle {
  const publishedAt = new Date(raw.datetime * 1000).toISOString()
  const { sectors, indices } = tagArticle(raw.headline, raw.summary)
  return {
    id: `fh-${raw.id}`,
    headline: raw.headline,
    summary: raw.summary,
    source: raw.source,
    url: raw.url,
    imageUrl: raw.image || undefined,
    publishedAt,
    sectors,
    indices,
    sentiment: detectSentiment(`${raw.headline} ${raw.summary}`),
    breaking: isBreaking(raw.headline, publishedAt),
  }
}

function mapNewsApi(raw: NewsApiRaw, idx: number): NewsArticle {
  const { sectors, indices } = tagArticle(raw.title, raw.description ?? '')
  return {
    id: `na-${idx}-${raw.url.slice(-12)}`,
    headline: raw.title,
    summary: raw.description ?? '',
    source: raw.source.name,
    url: raw.url,
    imageUrl: raw.urlToImage ?? undefined,
    publishedAt: raw.publishedAt,
    sectors,
    indices,
    sentiment: detectSentiment(`${raw.title} ${raw.description ?? ''}`),
    breaking: isBreaking(raw.title, raw.publishedAt),
  }
}

// ── Finnhub fetch ────────────────────────────────────────────────────────────

async function fetchFromFinnhub(category = 'general'): Promise<NewsArticle[]> {
  const key = process.env.FINNHUB_API_KEY
  if (!key) return []

  const cacheKey = `finnhub:${category}`
  const cached = cache.get<NewsArticle[]>(cacheKey)
  if (cached) return cached

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/news?category=${category}&token=${key}`,
      { next: { revalidate: 300 } },
    )
    if (!res.ok) return []
    const raw = (await res.json()) as FinnhubRaw[]
    const articles = raw.slice(0, 60).map(mapFinnhub)
    cache.set(cacheKey, articles, NEWS_TTL_MS)
    return articles
  } catch {
    return []
  }
}

// ── NewsAPI fetch ────────────────────────────────────────────────────────────

async function fetchFromNewsApi(query: string): Promise<NewsArticle[]> {
  const key = process.env.NEWSAPI_KEY
  if (!key) return []

  const cacheKey = `newsapi:${query}`
  const cached = cache.get<NewsArticle[]>(cacheKey)
  if (cached) return cached

  try {
    const url = new URL('https://newsapi.org/v2/everything')
    url.searchParams.set('q', query)
    url.searchParams.set('sortBy', 'publishedAt')
    url.searchParams.set('language', 'en')
    url.searchParams.set('pageSize', '20')
    url.searchParams.set('apiKey', key)

    const res = await fetch(url.toString(), { next: { revalidate: 300 } })
    if (!res.ok) return []
    const data = await res.json()
    const articles = (data.articles as NewsApiRaw[])
      .filter((a) => a.title && a.url && !a.title.includes('[Removed]'))
      .map(mapNewsApi)
    cache.set(cacheKey, articles, NEWS_TTL_MS)
    return articles
  } catch {
    return []
  }
}

// ── Mock data ────────────────────────────────────────────────────────────────

function getMockArticles(sectorSlug?: string, limit = 10): NewsArticle[] {
  const sector = sectorSlug
    ? SECTORS.find((s) => s.slug === sectorSlug)
    : null
  const sectorName = sector?.name ?? 'Financial Markets'
  const sources = ['Reuters', 'Bloomberg', 'CNBC', 'Financial Times', 'MarketWatch', 'WSJ']
  const now = Date.now()

  return Array.from({ length: limit }).map((_, i) => ({
    id: `mock-${sectorSlug ?? 'general'}-${i}`,
    headline: `[Add API key] Sample ${sectorName} headline — configure FINNHUB_API_KEY in .env.local`,
    summary: `This is placeholder content. Add your free Finnhub API key to .env.local to see real ${sectorName} news in real time.`,
    source: sources[i % sources.length],
    url: 'https://finnhub.io',
    publishedAt: new Date(now - i * 1_800_000).toISOString(),
    sectors: sectorSlug ? [sectorSlug] : [],
    indices: [],
    sentiment: (['bullish', 'bearish', 'neutral'] as const)[i % 3],
    breaking: i === 0,
  }))
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch general market news, optionally filtered by sector or index slug.
 */
export async function fetchNews(opts: {
  sectorSlug?: string
  indexSlug?: string
  page?: number
  limit?: number
}): Promise<NewsFeedResponse> {
  const { sectorSlug, indexSlug, page = 1, limit = MAX_NEWS_PER_REQUEST } = opts

  // Build the search query for keyword-based sources
  const sectorKw = sectorSlug
    ? SECTORS.find((s) => s.slug === sectorSlug)?.keywords.slice(0, 3).join(' ') ?? sectorSlug
    : ''
  const query = sectorKw || indexSlug || 'stock market finance'

  // Try providers in order
  let articles: NewsArticle[] = await fetchFromFinnhub('general')

  if (articles.length === 0) {
    articles = await fetchFromNewsApi(query)
  }

  // Filter by sector/index if requested
  if (sectorSlug) {
    articles = articles.filter(
      (a) => a.sectors.includes(sectorSlug) || a.sectors.length === 0,
    )
  }
  if (indexSlug) {
    articles = articles.filter(
      (a) => a.indices.includes(indexSlug) || a.indices.length === 0,
    )
  }

  // Fallback to mock data
  if (articles.length === 0) {
    articles = getMockArticles(sectorSlug, limit)
  }

  const start = (page - 1) * limit
  const paged = articles.slice(start, start + limit)

  return {
    articles: paged,
    totalResults: articles.length,
    page,
    pageSize: limit,
  }
}

/**
 * Fetch the 5 most recent breaking/fresh articles.
 */
export async function fetchBreakingNews(): Promise<NewsArticle[]> {
  const { articles } = await fetchNews({ limit: 60 })
  const breaking = articles.filter((a) => a.breaking)
  if (breaking.length >= 3) return breaking.slice(0, 5)
  // Fall back to most recent 5 articles
  return articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)
}
