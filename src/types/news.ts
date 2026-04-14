export interface NewsArticle {
  id: string
  headline: string
  summary: string
  source: string
  url: string
  imageUrl?: string
  publishedAt: string // ISO date string
  sectors: string[] // sector slugs
  indices: string[] // index slugs
  sentiment: 'bullish' | 'bearish' | 'neutral'
  breaking: boolean
}

export interface NewsFeedResponse {
  articles: NewsArticle[]
  totalResults: number
  page: number
  pageSize: number
}

export type SentimentType = 'bullish' | 'bearish' | 'neutral'
