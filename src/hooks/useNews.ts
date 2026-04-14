'use client'

import { useQuery } from '@tanstack/react-query'
import type { NewsFeedResponse } from '@/types/news'

interface UseNewsParams {
  category?: string
  keywords?: string[]
  page?: number
  limit?: number
}

async function fetchNews(params: UseNewsParams): Promise<NewsFeedResponse> {
  const { category, keywords, page = 1, limit = 10 } = params
  const query = new URLSearchParams()
  if (category) query.set('category', category)
  if (keywords?.length) query.set('q', keywords.join(' '))
  query.set('page', String(page))
  query.set('limit', String(limit))

  const res = await fetch(`/api/news?${query.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch news')
  return res.json()
}

export function useNews(params: UseNewsParams = {}) {
  return useQuery({
    queryKey: ['news', params.category, params.keywords?.join(','), params.page, params.limit],
    queryFn: () => fetchNews(params),
    staleTime: 5 * 60 * 1000,   // 5 minutes
    refetchInterval: 5 * 60 * 1000,
  })
}
