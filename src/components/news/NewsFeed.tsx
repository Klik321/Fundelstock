'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, RefreshCw, ChevronDown } from 'lucide-react'
import type { NewsArticle, NewsFeedResponse, SentimentType } from '@/types/news'
import NewsCard from './NewsCard'
import { SkeletonNewsCard } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'

interface NewsFeedProps {
  sectorSlug?: string
  indexSlug?: string
  variant?: 'default' | 'compact' | 'featured'
  initialLimit?: number
  filterSentiments?: SentimentType[]
  className?: string
}

async function fetchNews(sectorSlug?: string, indexSlug?: string): Promise<NewsFeedResponse> {
  const params = new URLSearchParams()
  if (sectorSlug) params.set('sector', sectorSlug)
  if (indexSlug) params.set('index', indexSlug)
  const res = await fetch(`/api/news?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch news')
  return res.json()
}

export default function NewsFeed({
  sectorSlug,
  indexSlug,
  variant = 'compact',
  initialLimit = 8,
  filterSentiments,
  className,
}: NewsFeedProps) {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, refetch } = useQuery<NewsFeedResponse>({
    queryKey: ['news', sectorSlug, indexSlug],
    queryFn: () => fetchNews(sectorSlug, indexSlug),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: Math.min(initialLimit, 5) }).map((_, i) => (
          <SkeletonNewsCard key={i} />
        ))}
      </div>
    )
  }

  if (isError || !data?.articles.length) {
    return (
      <div className={cn('flex flex-col items-center gap-3 py-10 text-center', className)}>
        <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-medium flex items-center justify-center">
          <AlertCircle size={18} className="text-text-tertiary" />
        </div>
        <p className="text-sm text-text-secondary">
          {isError ? 'Failed to load news. Check your API key.' : 'No articles found.'}
        </p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-text-secondary rounded-lg border border-border-medium hover:bg-bg-elevated transition-colors"
        >
          <RefreshCw size={12} />
          Retry
        </button>
      </div>
    )
  }

  let articles: NewsArticle[] = data.articles
  if (filterSentiments?.length) {
    articles = articles.filter((a) => filterSentiments.includes(a.sentiment))
  }

  const displayed = articles.slice(0, initialLimit * page)
  const hasMore = displayed.length < articles.length

  return (
    <div className={cn('space-y-2', className)}>
      {displayed.map((article) => (
        <NewsCard key={article.id} article={article} variant={variant} />
      ))}

      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-text-secondary hover:text-text-primary rounded-xl border border-border-medium hover:border-border-strong hover:bg-bg-elevated transition-all"
        >
          <ChevronDown size={15} />
          Load more
        </button>
      )}
    </div>
  )
}
