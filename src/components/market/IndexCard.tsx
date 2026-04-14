'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import type { IndexData } from '@/types/index-type'
import { cn } from '@/lib/utils'

const MiniChart = dynamic(() => import('@/components/tradingview/MiniChart'), { ssr: false })

interface IndexCardProps {
  index: IndexData
  className?: string
}

export default function IndexCard({ index, className }: IndexCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={cn('card overflow-hidden flex flex-col shrink-0', className)}
    >
      <Link href={`/indices/${index.slug}`} className="flex-1 flex flex-col">
        {/* Mini chart */}
        <MiniChart symbol={index.tvSymbol} height={120} />

        {/* Info */}
        <div className="px-3 py-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">{index.shortName}</p>
            <p className="text-[10px] text-text-tertiary mt-0.5">{index.region}</p>
          </div>
          <div className="shrink-0 w-6 h-6 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center">
            <Globe size={11} className="text-text-tertiary" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
