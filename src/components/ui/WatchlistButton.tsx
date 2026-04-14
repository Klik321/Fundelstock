'use client'

import { Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWatchlist, type WatchlistItem } from '@/providers/WatchlistProvider'
import { cn } from '@/lib/utils'

interface WatchlistButtonProps {
  item: WatchlistItem
  size?: 'sm' | 'md'
  className?: string
}

export default function WatchlistButton({ item, size = 'md', className }: WatchlistButtonProps) {
  const { has, toggle } = useWatchlist()
  const watching = has(item.slug)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(item)
      }}
      aria-label={watching ? `Remove ${item.name} from watchlist` : `Add ${item.name} to watchlist`}
      className={cn(
        'flex items-center justify-center rounded-lg transition-all',
        size === 'sm' ? 'w-7 h-7' : 'w-9 h-9',
        watching
          ? 'bg-accent-amber-bg border border-accent-amber-border text-accent-amber'
          : 'bg-bg-elevated border border-border-medium text-text-tertiary hover:text-accent-amber hover:border-accent-amber-border hover:bg-accent-amber-bg',
        className,
      )}
    >
      <motion.div
        key={String(watching)}
        initial={{ scale: 0.6, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Star
          size={size === 'sm' ? 12 : 14}
          className={cn(watching && 'fill-accent-amber')}
        />
      </motion.div>
    </button>
  )
}
