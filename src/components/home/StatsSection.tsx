'use client'

import { motion } from 'framer-motion'
import { BarChart2, Globe, Newspaper, Zap } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const STATS = [
  {
    icon: BarChart2,
    value: 11,
    suffix: '',
    label: 'GICS Sectors',
    description: 'All S&P 500 sectors tracked with live ETF charts',
    color: '#2962ff',
    bgColor: 'rgba(41,98,255,0.10)',
  },
  {
    icon: Globe,
    value: 10,
    suffix: '',
    label: 'Global Indices',
    description: 'Major benchmarks from US, Europe, Asia & more',
    color: '#26a69a',
    bgColor: 'rgba(38,166,154,0.10)',
  },
  {
    icon: Newspaper,
    value: 70,
    suffix: 'K+',
    label: 'News Sources',
    description: 'Aggregated from Finnhub and global news APIs',
    color: '#7c4dff',
    bgColor: 'rgba(124,77,255,0.10)',
  },
  {
    icon: Zap,
    value: 5,
    suffix: 'min',
    label: 'Refresh Rate',
    description: 'News and market data refreshed every 5 minutes',
    color: '#ff9800',
    bgColor: 'rgba(255,152,0,0.10)',
  },
] as const

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function StatsSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-10"
    >
      {STATS.map(({ icon: Icon, value, suffix, label, description, color, bgColor }) => (
        <motion.div
          key={label}
          variants={cardVariants}
          className="feature-card p-5 group cursor-default"
        >
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{ background: bgColor, border: `1px solid ${color}30` }}
          >
            <Icon size={18} style={{ color }} />
          </div>

          {/* Value */}
          <div className="text-3xl font-bold text-text-primary font-mono tabular-nums mb-1">
            <AnimatedCounter target={value} suffix={suffix} duration={1.6} />
          </div>

          {/* Label */}
          <p className="text-sm font-semibold text-text-primary mb-1">{label}</p>

          {/* Description */}
          <p className="text-xs text-text-tertiary leading-relaxed">{description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
