'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Clock, ExternalLink, X } from 'lucide-react'
import type { NewsArticle } from '@/types/news'
import { formatTimeAgo, isSafeUrl } from '@/lib/utils'
import SentimentBadge from '@/components/market/SentimentBadge'
import ShareButtons from '@/components/ui/ShareButtons'
import { SECTORS } from '@/data/sectors'
import { cn } from '@/lib/utils'

interface ArticleModalProps {
  article: NewsArticle | null
  onClose: () => void
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const open = article !== null
  const safeUrl = article && isSafeUrl(article.url) ? article.url : '#'

  // Escape to close + scroll lock
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) {
      document.addEventListener('keydown', handler)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && article && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[8000] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[8001] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div
              className="rounded-2xl border border-border-medium overflow-hidden"
              style={{ background: 'var(--bg-surface)', boxShadow: '0 32px 80px rgba(0,0,0,0.7)' }}
            >
              {/* Image */}
              {article.imageUrl && (
                <div className="relative h-44 overflow-hidden bg-bg-elevated">
                  <Image
                    src={article.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="512px"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/80 to-transparent" />
                  {article.breaking && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-amber text-bg-primary text-[10px] font-bold uppercase tracking-wider">
                      <span className="breaking-dot" style={{ background: 'var(--bg-primary)' }} />
                      Breaking
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg border border-border-medium bg-bg-elevated hover:bg-bg-surface-hover text-text-tertiary hover:text-text-primary transition-all z-10"
                >
                  <X size={14} />
                </button>

                {/* Headline */}
                <h2 className="text-sm font-semibold text-text-primary leading-snug pr-6">
                  {article.headline}
                </h2>

                {/* Summary */}
                {article.summary && (
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-4">
                    {article.summary}
                  </p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <SentimentBadge sentiment={article.sentiment} size="sm" />
                  {article.sectors.slice(0, 3).map((slug) => {
                    const s = SECTORS.find((x) => x.slug === slug)
                    if (!s) return null
                    return (
                      <span
                        key={slug}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border"
                        style={{
                          background: `${s.color}15`,
                          borderColor: `${s.color}30`,
                          color: s.color,
                        }}
                      >
                        {s.name}
                      </span>
                    )
                  })}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 text-[10px] text-text-tertiary">
                  <span className="font-medium">{article.source}</span>
                  <span>·</span>
                  <Clock size={9} />
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
                  <ShareButtons url={safeUrl} title={article.headline} />
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-semibold rounded-xl transition-colors shadow-glow-blue"
                  >
                    Read Full Article
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
