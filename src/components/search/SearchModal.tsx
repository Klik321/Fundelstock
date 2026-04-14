'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Search, BarChart2, Globe, Newspaper, ExternalLink, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearch } from '@/providers/SearchProvider'
import { SECTORS } from '@/data/sectors'
import { INDICES } from '@/data/indices'
import { isSafeUrl } from '@/lib/utils'
import type { NewsArticle } from '@/types/news'

type ResultSection = {
  type: 'sector' | 'index' | 'article'
  items: ResultItem[]
}
type ResultItem = {
  id: string
  title: string
  subtitle?: string
  href: string
  external?: boolean
  color?: string
}

function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return debounced
}

export default function SearchModal() {
  const { open, closeSearch } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 350)

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery('')
      setArticles([])
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  // ⌘K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        open ? closeSearch() : useSearch
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, closeSearch])

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSearch() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, closeSearch])

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Fetch articles when query changes
  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      setArticles([])
      return
    }
    let cancelled = false
    setLoading(true)
    fetch(`/api/news?limit=6&q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setArticles(data.articles ?? [])
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [debouncedQuery])

  const lowerQ = debouncedQuery.toLowerCase()

  const matchedSectors = SECTORS.filter(
    (s) =>
      s.name.toLowerCase().includes(lowerQ) ||
      s.slug.includes(lowerQ) ||
      s.etf.toLowerCase().includes(lowerQ),
  ).slice(0, 4)

  const matchedIndices = INDICES.filter(
    (i) =>
      i.name.toLowerCase().includes(lowerQ) ||
      i.shortName.toLowerCase().includes(lowerQ) ||
      i.slug.includes(lowerQ),
  ).slice(0, 4)

  const hasResults = matchedSectors.length > 0 || matchedIndices.length > 0 || articles.length > 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9000] bg-black/60 backdrop-blur-sm"
            onClick={closeSearch}
          />

          {/* Modal */}
          <motion.div
            key="search-modal"
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-[12vh] z-[9001] w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div
              className="rounded-2xl border border-border-medium overflow-hidden"
              style={{ background: 'var(--bg-surface)', boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-subtle">
                {loading ? (
                  <Loader2 size={18} className="text-accent-blue shrink-0 animate-spin" />
                ) : (
                  <Search size={18} className="text-text-tertiary shrink-0" />
                )}
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sectors, indices, news..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  onClick={closeSearch}
                  className="shrink-0 flex items-center justify-center w-6 h-6 rounded-md border border-border-medium text-text-tertiary hover:text-text-primary transition-colors text-[10px] font-mono"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {!debouncedQuery && (
                  <div className="px-4 py-8 text-center text-sm text-text-tertiary">
                    Type to search sectors, indices, and news
                  </div>
                )}

                {debouncedQuery && !hasResults && !loading && (
                  <div className="px-4 py-8 text-center text-sm text-text-tertiary">
                    No results for &ldquo;{debouncedQuery}&rdquo;
                  </div>
                )}

                {/* Sectors */}
                {matchedSectors.length > 0 && (
                  <div className="p-2">
                    <p className="px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">
                      Sectors
                    </p>
                    {matchedSectors.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/sectors/${s.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-bg-surface-hover transition-colors group"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}
                        >
                          <BarChart2 size={12} style={{ color: s.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">{s.name}</p>
                          <p className="text-[10px] text-text-tertiary">{s.etf} ETF</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Indices */}
                {matchedIndices.length > 0 && (
                  <div className="p-2 border-t border-border-subtle">
                    <p className="px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">
                      Indices
                    </p>
                    {matchedIndices.map((i) => (
                      <Link
                        key={i.slug}
                        href={`/indices/${i.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-bg-surface-hover transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-accent-blue-bg border border-accent-blue-border flex items-center justify-center shrink-0">
                          <Globe size={12} className="text-accent-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{i.shortName}</p>
                          <p className="text-[10px] text-text-tertiary">{i.region}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Articles */}
                {articles.length > 0 && (
                  <div className="p-2 border-t border-border-subtle">
                    <p className="px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">
                      News
                    </p>
                    {articles.map((a) => {
                      const safeUrl = isSafeUrl(a.url) ? a.url : '#'
                      return (
                        <a
                          key={a.id}
                          href={safeUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          onClick={closeSearch}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-bg-surface-hover transition-colors group"
                        >
                          <Newspaper size={14} className="text-text-tertiary shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-text-primary line-clamp-2 leading-snug">
                              {a.headline}
                            </p>
                            <p className="text-[10px] text-text-tertiary mt-0.5">{a.source}</p>
                          </div>
                          <ExternalLink size={11} className="shrink-0 text-text-tertiary group-hover:text-accent-blue mt-0.5" />
                        </a>
                      )
                    })}
                  </div>
                )}

                {/* Footer hint */}
                <div className="px-4 py-2.5 border-t border-border-subtle flex items-center justify-between text-[10px] text-text-tertiary">
                  <span>⌘K to open · Esc to close</span>
                  <span>↑↓ to navigate · Enter to go</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
