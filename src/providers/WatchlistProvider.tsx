'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export interface WatchlistItem {
  type: 'sector' | 'index' | 'ticker'
  slug: string
  name: string
  symbol?: string // TradingView symbol for MiniChart
  color?: string
}

interface WatchlistContextValue {
  items: WatchlistItem[]
  add: (item: WatchlistItem) => void
  remove: (slug: string) => void
  has: (slug: string) => boolean
  toggle: (item: WatchlistItem) => void
}

const WatchlistContext = createContext<WatchlistContextValue>({
  items: [],
  add: () => {},
  remove: () => {},
  has: () => false,
  toggle: () => {},
})

const STORAGE_KEY = 'fundelstock-watchlist'

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WatchlistItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  const persist = (next: WatchlistItem[]) => {
    setItems(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

  const add = useCallback(
    (item: WatchlistItem) =>
      setItems((prev) => {
        if (prev.some((i) => i.slug === item.slug)) return prev
        const next = [...prev, item]
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
        return next
      }),
    [],
  )

  const remove = useCallback(
    (slug: string) =>
      setItems((prev) => {
        const next = prev.filter((i) => i.slug !== slug)
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
        return next
      }),
    [],
  )

  const has = useCallback((slug: string) => items.some((i) => i.slug === slug), [items])

  const toggle = useCallback(
    (item: WatchlistItem) => {
      has(item.slug) ? remove(item.slug) : add(item)
    },
    [has, add, remove],
  )

  return (
    <WatchlistContext.Provider value={{ items, add, remove, has, toggle }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => useContext(WatchlistContext)
