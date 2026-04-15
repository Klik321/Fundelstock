'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Clock, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import type { NewsArticle } from '@/types/news'
import { formatTimeAgo, truncate, isSafeUrl } from '@/lib/utils'
import SentimentBadge from '@/components/market/SentimentBadge'
import ShareButtons from '@/components/ui/ShareButtons'
import ArticleModal from '@/components/news/ArticleModal'
import Badge from '@/components/ui/Badge'
import { SECTORS } from '@/data/sectors'
import { cn } from '@/lib/utils'

interface NewsCardProps {
  article: NewsArticle
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

function SectorPills({ sectors }: { sectors: string[] }) {
  return (
    <>
      {sectors.slice(0, 2).map((slug) => {
        const s = SECTORS.find((x) => x.slug === slug)
        if (!s) return null
        return (
          <Badge key={slug} size="sm" variant="neutral" className="text-[10px]">
            {s.name}
          </Badge>
        )
      })}
    </>
  )
}

export default function NewsCard({ article, variant = 'default', className }: NewsCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const timeAgo = formatTimeAgo(article.publishedAt)
  const safeUrl = isSafeUrl(article.url) ? article.url : '#'

  if (variant === 'compact') {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20px 0px' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ x: 2, transition: { duration: 0.15 } }}
          className={cn(
            'news-link flex items-start gap-3 p-3 rounded-xl border border-border-medium',
            'hover:border-border-strong transition-colors duration-150 group relative',
            className,
          )}
          style={{ backgroundColor: 'var(--bg-surface-hover)' }}
        >
          {article.imageUrl && (
            <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-bg-elevated">
              <Image
                src={article.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-1">
            {article.breaking && (
              <div className="flex items-center gap-1.5 mb-1">
                <span className="breaking-dot" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-amber">Breaking</span>
              </div>
            )}
            <a
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block"
            >
              <p className="news-headline text-[13px] font-medium text-text-primary leading-snug line-clamp-2 transition-colors">
                {article.headline}
              </p>
            </a>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-text-tertiary">{article.source}</span>
              <span className="text-text-tertiary text-[10px]">·</span>
              <span className="text-[10px] text-text-tertiary flex items-center gap-0.5">
                <Clock size={9} />
                {timeAgo}
              </span>
              <SentimentBadge sentiment={article.sentiment} size="sm" />
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex flex-col gap-1 shrink-0">
            <button
              onClick={() => setPreviewOpen(true)}
              aria-label="Preview article"
              className="flex items-center justify-center w-6 h-6 rounded-md border border-border-medium bg-bg-elevated hover:bg-accent-blue-bg hover:border-accent-blue-border hover:text-accent-blue text-text-tertiary transition-all"
            >
              <Eye size={10} />
            </button>
            <a
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center w-6 h-6 rounded-md border border-border-medium bg-bg-elevated text-text-tertiary hover:text-accent-blue transition-colors"
            >
              <ExternalLink size={10} />
            </a>
          </div>
        </motion.div>
        <ArticleModal article={previewOpen ? article : null} onClose={() => setPreviewOpen(false)} />
      </>
    )
  }

  if (variant === 'featured') {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20px 0px' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className={cn('news-link card overflow-hidden group block h-full relative cursor-pointer', className)}
          onClick={() => setPreviewOpen(true)}
        >
          {article.imageUrl && (
            <div className="relative h-44 overflow-hidden bg-bg-elevated">
              <Image
                src={article.imageUrl}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 to-transparent" />
              {article.breaking && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-amber text-bg-primary text-[10px] font-bold uppercase tracking-wider">
                  <span className="breaking-dot" style={{ background: 'var(--bg-primary)' }} />
                  Breaking
                </div>
              )}
            </div>
          )}
          <div className="p-4 space-y-2">
            <p className="news-headline text-sm font-semibold text-text-primary leading-snug line-clamp-3 transition-colors">
              {article.headline}
            </p>
            {article.summary && (
              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {truncate(article.summary, 120)}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <SectorPills sectors={article.sectors} />
              <SentimentBadge sentiment={article.sentiment} size="sm" />
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-border-subtle">
              <span className="text-[10px] text-text-tertiary">{article.source}</span>
              <div className="flex items-center gap-2">
                <ShareButtons url={safeUrl} title={article.headline} />
                <div className="flex items-center gap-1 text-[10px] text-text-tertiary">
                  <Clock size={9} />
                  {timeAgo}
                  <Eye size={9} className="ml-1 group-hover:text-accent-blue transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <ArticleModal article={previewOpen ? article : null} onClose={() => setPreviewOpen(false)} />
      </>
    )
  }

  // default
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -20px 0px' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className={cn('news-link card overflow-hidden group flex flex-col sm:flex-row relative cursor-pointer', className)}
        onClick={() => setPreviewOpen(true)}
      >
        {article.imageUrl && (
          <div className="relative shrink-0 w-full sm:w-36 h-32 sm:h-auto overflow-hidden bg-bg-elevated">
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, 144px"
              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
            />
          </div>
        )}
        <div className="flex flex-col flex-1 p-4 gap-2 min-w-0">
          {article.breaking && (
            <div className="flex items-center gap-1.5">
              <span className="breaking-dot" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent-amber">Breaking</span>
            </div>
          )}
          <p className="news-headline text-sm font-semibold text-text-primary leading-snug line-clamp-2 transition-colors">
            {article.headline}
          </p>
          {article.summary && (
            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
              {truncate(article.summary, 110)}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2 border-t border-border-subtle">
            <SectorPills sectors={article.sectors} />
            <SentimentBadge sentiment={article.sentiment} size="sm" />
            <div className="ml-auto flex items-center gap-2">
              <ShareButtons url={safeUrl} title={article.headline} />
              <div className="flex items-center gap-1.5 text-[10px] text-text-tertiary">
                <span>{article.source}</span>
                <span>·</span>
                <Clock size={9} />
                <span>{timeAgo}</span>
                <a
                  href={safeUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  onClick={(e) => e.stopPropagation()}
                  className="ml-1"
                >
                  <ExternalLink size={9} className="hover:text-accent-blue transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <ArticleModal article={previewOpen ? article : null} onClose={() => setPreviewOpen(false)} />
    </>
  )
}
