/**
 * Server-side news fetching — dual-provider parallel strategy:
 *   1. Finnhub (primary — real-time market news)
 *   2. NewsAPI (secondary — top financial headlines)
 *   Both run in parallel and results are merged + deduplicated.
 *   3. Mock data fallback when neither key is configured.
 *
 * All functions run server-side only. API keys are NEVER sent to the client.
 */

import type { NewsArticle, NewsFeedResponse } from '@/types/news'
import { tagArticle, detectSentiment, isBreaking } from '@/lib/sectorTagger'
import { cache, NEWS_TTL_MS } from '@/lib/cache'
import { MAX_NEWS_PER_REQUEST } from '@/lib/constants'
import { SECTORS } from '@/data/sectors'

// ── External API payload shapes ─────────────────────────────────────────────

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

function mapFinnhub(raw: FinnhubRaw): NewsArticle | null {
  if (!raw.headline || !raw.url) return null
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

function mapNewsApi(raw: NewsApiRaw, idx: number): NewsArticle | null {
  if (!raw.title || raw.title.includes('[Removed]') || !raw.url) return null
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
    const articles = raw
      .slice(0, 60)
      .map(mapFinnhub)
      .filter((a): a is NewsArticle => a !== null)
    cache.set(cacheKey, articles, NEWS_TTL_MS)
    return articles
  } catch {
    return []
  }
}

// ── NewsAPI fetch ────────────────────────────────────────────────────────────

const NEWSAPI_FINANCE_SOURCES =
  'bloomberg,financial-times,the-wall-street-journal,reuters,cnbc,fortune,business-insider,the-economist'

async function fetchFromNewsApi(query?: string): Promise<NewsArticle[]> {
  const key = process.env.NEWSAPI_KEY
  if (!key) return []

  const cacheKey = `newsapi:${query ?? 'top'}`
  const cached = cache.get<NewsArticle[]>(cacheKey)
  if (cached) return cached

  try {
    let url: URL

    if (query) {
      // Keyword search via /everything
      url = new URL('https://newsapi.org/v2/everything')
      url.searchParams.set('q', query)
      url.searchParams.set('sortBy', 'publishedAt')
      url.searchParams.set('language', 'en')
      url.searchParams.set('pageSize', '30')
    } else {
      // Top financial headlines via /top-headlines
      url = new URL('https://newsapi.org/v2/top-headlines')
      url.searchParams.set('category', 'business')
      url.searchParams.set('language', 'en')
      url.searchParams.set('pageSize', '40')
    }
    url.searchParams.set('apiKey', key)

    const res = await fetch(url.toString(), { next: { revalidate: 300 } })
    if (!res.ok) return []
    const data = await res.json()

    const articles = ((data.articles ?? []) as NewsApiRaw[])
      .map((a, i) => mapNewsApi(a, i))
      .filter((a): a is NewsArticle => a !== null)

    cache.set(cacheKey, articles, NEWS_TTL_MS)
    return articles
  } catch {
    return []
  }
}

// ── Merge + deduplicate ──────────────────────────────────────────────────────

function mergeArticles(a: NewsArticle[], b: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>()
  const result: NewsArticle[] = []

  for (const article of [...a, ...b]) {
    // Deduplicate by URL (normalised) and headline prefix (catches reposts)
    const urlKey = article.url.replace(/[?#].*$/, '').toLowerCase()
    const headlineKey = article.headline.slice(0, 60).toLowerCase()
    const key = `${urlKey}|${headlineKey}`

    if (!seen.has(key)) {
      seen.add(key)
      result.push(article)
    }
  }

  // Sort newest first
  return result.sort(
    (x, y) => new Date(y.publishedAt).getTime() - new Date(x.publishedAt).getTime(),
  )
}

// ── Mock data (used when neither API key is configured) ──────────────────────

function getMockArticles(sectorSlug?: string, limit = 10): NewsArticle[] {
  const sector = sectorSlug ? SECTORS.find((s) => s.slug === sectorSlug) : null
  const sectorName = sector?.name ?? 'Financial Markets'
  const sources = ['Reuters', 'Bloomberg', 'CNBC', 'Financial Times', 'MarketWatch', 'WSJ']
  const now = Date.now()

  return Array.from({ length: limit }).map((_, i) => ({
    id: `mock-${sectorSlug ?? 'general'}-${i}`,
    headline: `[Configure API keys] Sample ${sectorName} headline — add FINNHUB_API_KEY to .env.local`,
    summary: `Placeholder content. Add your Finnhub and NewsAPI keys to .env.local to see real ${sectorName} news.`,
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
 * Fetch market news, optionally filtered by sector or index slug.
 * Runs Finnhub and NewsAPI in parallel, merges and deduplicates the results.
 */
export async function fetchNews(opts: {
  sectorSlug?: string
  indexSlug?: string
  page?: number
  limit?: number
}): Promise<NewsFeedResponse> {
  const { sectorSlug, indexSlug, page = 1, limit = MAX_NEWS_PER_REQUEST } = opts

  // Build keyword query for NewsAPI
  const sectorKeywords = sectorSlug
    ? SECTORS.find((s) => s.slug === sectorSlug)?.keywords.slice(0, 3).join(' OR ') ?? sectorSlug
    : undefined

  const newsApiQuery = sectorKeywords ?? indexSlug ?? undefined

  // ── Run both providers in parallel ──
  const [finnhubArticles, newsApiArticles] = await Promise.all([
    fetchFromFinnhub('general'),
    fetchFromNewsApi(newsApiQuery),
  ])

  // Merge + deduplicate, newest first
  let articles = mergeArticles(finnhubArticles, newsApiArticles)

  // Filter by sector/index when requested
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

  // Fallback to mock data only when both APIs are unconfigured
  if (articles.length === 0) {
    articles = getMockArticles(sectorSlug, limit)
  }

  const total = articles.length
  const start = (page - 1) * limit
  const paged = articles.slice(start, start + limit)

  return {
    articles: paged,
    totalResults: total,
    page,
    pageSize: limit,
  }
}

/**
 * Fetch the most recent breaking articles (up to 5).
 */
export async function fetchBreakingNews(): Promise<NewsArticle[]> {
  const { articles } = await fetchNews({ limit: 80 })
  const breaking = articles.filter((a) => a.breaking)
  if (breaking.length >= 3) return breaking.slice(0, 5)
  return articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)
}
