'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Cpu, Heart, Landmark, Zap, ShoppingBag, ShoppingCart,
  Factory, Gem, Building2, Lightbulb, Radio, type LucideIcon,
} from 'lucide-react'
import type { SectorData } from '@/types/sector'
import { cn } from '@/lib/utils'

const MiniChart = dynamic(() => import('@/components/tradingview/MiniChart'), { ssr: false })

const ICONS: Record<string, LucideIcon> = {
  Cpu, Heart, Landmark, Zap, ShoppingBag, ShoppingCart,
  Factory, Gem, Building2, Lightbulb, Radio,
}

interface SectorCardProps {
  sector: SectorData
  headlines?: { headline: string; url: string }[]
  className?: string
}

export default function SectorCard({ sector, headlines = [], className }: SectorCardProps) {
  const Icon = ICONS[sector.iconName] ?? Cpu

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={cn('card overflow-hidden flex flex-col', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: `${sector.color}20`,
              border: `1px solid ${sector.color}40`,
            }}
          >
            <Icon size={16} style={{ color: sector.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{sector.name}</p>
            <p className="text-[10px] font-mono text-text-tertiary">{sector.etf}</p>
          </div>
        </div>
        <Link
          href={`/sectors/${sector.slug}`}
          className="text-[11px] font-medium text-accent-blue hover:text-accent-blue-hover transition-colors"
          aria-label={`View ${sector.name} sector`}
        >
          View →
        </Link>
      </div>

      {/* Chart */}
      <div className="px-1">
        <MiniChart symbol={sector.tvSymbol} height={160} />
      </div>

      {/* Headlines */}
      {headlines.length > 0 && (
        <div className="px-4 py-3 border-t border-border-subtle space-y-2 flex-1">
          {headlines.slice(0, 2).map((h, i) => (
            <a
              key={i}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block text-[11px] text-text-secondary hover:text-text-primary leading-snug line-clamp-2 transition-colors"
            >
              {h.headline}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
