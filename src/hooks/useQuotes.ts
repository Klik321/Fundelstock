'use client'

import { useQuery } from '@tanstack/react-query'
import type { Quote } from '@/types/market'

interface QuotesResponse {
  quotes: Quote[]
}

async function fetchQuotes(symbols: string[]): Promise<QuotesResponse> {
  const res = await fetch(`/api/quotes?symbols=${symbols.join(',')}`)
  if (!res.ok) throw new Error('Failed to fetch quotes')
  return res.json()
}

export function useQuotes(symbols: string[]) {
  return useQuery({
    queryKey: ['quotes', symbols.sort().join(',')],
    queryFn: () => fetchQuotes(symbols),
    staleTime: 60 * 1000,       // 1 minute
    refetchInterval: 60 * 1000, // poll every minute
    enabled: symbols.length > 0,
  })
}
