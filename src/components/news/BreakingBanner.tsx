'use client'

import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import type { NewsArticle } from '@/types/news'
import { formatTimeAgo, isSafeUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BreakingBannerProps {
  articles: NewsArticle[]
  className?: string
}

export default function BreakingBanner({ articles, className }: BreakingBannerProps) {
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
                  {article.headline}
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
