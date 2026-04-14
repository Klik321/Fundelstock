'use client'

import {
  Cpu,
  HeartPulse,
  Landmark,
  Zap,
  ShoppingBag,
  Factory,
  Radio,
  Gem,
  Power,
  Building2,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SectorData } from '@/types/market'

const ICON_MAP: Record<string, LucideIcon> = {
  Cpu,
  HeartPulse,
  Landmark,
  Zap,
  ShoppingBag,
  Factory,
  Radio,
  Gem,
  Power,
  Building2,
}

const COLOR_CLASSES: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  green: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  pink: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  slate: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
  violet: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  emerald: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
  cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}

const ACTIVE_COLOR_CLASSES: Record<string, string> = {
  blue: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
  green: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
  yellow: 'bg-yellow-500/15 border-yellow-500/40 text-yellow-300',
  orange: 'bg-orange-500/15 border-orange-500/40 text-orange-300',
  pink: 'bg-pink-500/15 border-pink-500/40 text-pink-300',
  slate: 'bg-slate-500/15 border-slate-500/40 text-slate-300',
  violet: 'bg-violet-500/15 border-violet-500/40 text-violet-300',
  emerald: 'bg-teal-500/15 border-teal-500/40 text-teal-300',
  cyan: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
  amber: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
}

interface SectorTabProps {
  sector: SectorData
  isActive: boolean
  onClick: () => void
}

export default function SectorTab({ sector, isActive, onClick }: SectorTabProps) {
  const Icon = ICON_MAP[sector.iconName] ?? Cpu
  const colorClass = isActive
    ? ACTIVE_COLOR_CLASSES[sector.color] ?? ACTIVE_COLOR_CLASSES.blue
    : COLOR_CLASSES[sector.color] ?? COLOR_CLASSES.blue

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0',
        isActive
          ? colorClass
          : 'border-border bg-bg-surface text-ink-secondary hover:border-border-strong hover:text-ink-primary',
      )}
    >
      <div
        className={cn(
          'w-5 h-5 rounded-lg border flex items-center justify-center transition-colors',
          isActive ? colorClass : COLOR_CLASSES[sector.color],
        )}
      >
        <Icon size={11} />
      </div>
      {sector.name}
    </button>
  )
}
