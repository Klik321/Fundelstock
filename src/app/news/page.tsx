'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Newspaper } from 'lucide-react'
import type { NewsFeedResponse, SentimentType } from '@/types/news'
import NewsCard from '@/components/news/NewsCard'
import NewsFilter from '@/components/news/NewsFilter'
import { SkeletonNewsCard } from '@/components/ui/Skeleton'
import { motion } from 'framer-motion'

async function fetchAllNews(): Promise<NewsFeedResponse> {
  const res = await fetch('/api/news?limit=50')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default function NewsPage() {
  const [activeSectors, setActiveSectors] = useState<string[]>([])
  const [activeSentiments, setActiveSentiments] = useState<SentimentType[]>([])
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery<NewsFeedResponse>({
    queryKey: ['news-all'],
    queryFn: fetchAllNews,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })

  const toggleSector = (slug: string) =>
    setActiveSectors((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )

  const toggleSentiment = (s: SentimentType) =>
    setActiveSentiments((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    )

  const articles = (data?.articles ?? []).filter((a) => {
    const sectorMatch =
      activeSectors.length === 0 ||
      a.sectors.some((s) => activeSectors.includes(s))
    const sentimentMatch =
      activeSentiments.length === 0 || activeSentiments.includes(a.sentiment)
    return sectorMatch && sentimentMatch
  })

  const PAGE_SIZE = 15
  const displayed = articles.slice(0, PAGE_SIZE * page)
  const hasMore = displayed.length < articles.length

  return (
    <div className="mx-auto max-w-[1000px] px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-accent-blue-bg border border-accent-blue-border flex items-center justify-center">
          <Newspaper size={18} className="text-accent-blue" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Financial News Feed</h1>
      </div>
      <p className="text-sm text-text-secondary mb-6 ml-[52px]">
        All market-moving headlines, sorted by recency. Filter by sector or sentiment.
        Every story opens the original source in a new tab.
      </p>

      {/* Filters */}
      <div className="card mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-3">
          Filter
        </p>
        <NewsFilter
          activeSectors={activeSectors}
          activeSentiments={activeSentiments}
          onSectorToggle={toggleSector}
          onSentimentToggle={toggleSentiment}
        />
      </div>

      {/* Results count */}
      {!isLoading && (
        <p className="text-[11px] text-text-tertiary mb-3">
          Showing {Math.min(displayed.length, articles.length)} of {articles.length} articles
        </p>
      )}

      {/* Feed */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonNewsCard key={i} />)}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">
          <p className="text-sm">No articles match the selected filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.3) }}
            >
              <NewsCard article={article} variant="default" />
            </motion.div>
          ))}

          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="w-full py-3 text-sm text-text-secondary hover:text-text-primary rounded-xl border border-border-medium hover:border-border-strong hover:bg-bg-elevated transition-all"
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  )
}
