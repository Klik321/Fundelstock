'use client'

import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import type { NewsArticle } from '@/types/news'
import { formatTimeAgo, isSafeUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { useTypewriter } from '@/hooks/useTypewriter'

interface BreakingBannerProps {
  articles: NewsArticle[]
  className?: string
}

function BreakingBannerInner({ articles, className }: BreakingBannerProps) {
  // Type out the first headline character-by-character
  const firstHeadline = articles[0]?.headline ?? ''
  const typedHeadline = useTypewriter(firstHeadline, 35)

  if (!articles.length) return null

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-amber-bg border border-accent-amber-border">
          <span className="breaking-dot" />
          <span className="text-xs font-bold uppercase tracking-widest text-accent-amber">
            Breaking
          </span>
        </div>
        <div className="flex-1 h-px bg-border-subtle" />
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {articles.map((article, i) => {
          const safeUrl = isSafeUrl(article.url) ? article.url : '#'
          // Use the typewriter text only for the first article
          const displayHeadline = i === 0 ? typedHeadline : article.headline
          return (
            <motion.a
              key={article.id}
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -2 }}
              className="group flex-shrink-0 w-72 card p-4 flex flex-col gap-2"
            >
              <div className="flex items-start gap-2">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full bg-accent-amber shrink-0 animate-pulse-dot"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                <p className="text-sm font-medium text-text-primary leading-snug line-clamp-3 news-headline transition-colors">
                  {displayHeadline}
                  {/* Blinking cursor while the first headline is still typing */}
                  {i === 0 && typedHeadline.length < firstHeadline.length && (
                    <span className="inline-block w-0.5 h-3.5 ml-0.5 bg-accent-amber align-middle animate-pulse" />
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-text-tertiary">
                  {article.source} · {formatTimeAgo(article.publishedAt)}
                </span>
                <ExternalLink
                  size={11}
                  className="text-text-tertiary group-hover:text-accent-blue transition-colors"
                />
              </div>
            </motion.a>
          )
        })}
      </div>
    </div>
  )
}

export default BreakingBannerInner
