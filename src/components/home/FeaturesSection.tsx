'use client'

import { motion } from 'framer-motion'
import { Activity, Filter, Globe2, Lock, Rss, TrendingUp } from 'lucide-react'
import TiltCard from '@/components/ui/TiltCard'

const FEATURES = [
  {
    icon: Rss,
    title: 'Real-Time News Feed',
    description:
      'Aggregates breaking financial news from Finnhub and 70,000+ global sources. Every article links directly to the original — we never host content.',
    color: '#2962ff',
    gradient: 'from-blue-500/10 to-transparent',
  },
  {
    icon: Filter,
    title: 'Sector Intelligence',
    description:
      'Auto-tags every article across 11 GICS sectors using keyword analysis. Instantly see what\'s moving Technology, Energy, Healthcare, and more.',
    color: '#26a69a',
    gradient: 'from-teal-500/10 to-transparent',
  },
  {
    icon: Globe2,
    title: 'Global Index Coverage',
    description:
      'Live charts for 10 major world indices — S&P 500, NASDAQ, FTSE 100, DAX, Nikkei 225, and more. Understand the macro picture instantly.',
    color: '#7c4dff',
    gradient: 'from-purple-500/10 to-transparent',
  },
  {
    icon: Activity,
    title: 'Sentiment Detection',
    description:
      'Each article is automatically classified as bullish, bearish, or neutral using keyword frequency analysis — giving you signal at a glance.',
    color: '#ff9800',
    gradient: 'from-amber-500/10 to-transparent',
  },
  {
    icon: TrendingUp,
    title: 'TradingView Charts',
    description:
      'Embedded live charts from TradingView directly alongside relevant news — so you can see price action and catalyst in the same view.',
    color: '#26a69a',
    gradient: 'from-teal-500/10 to-transparent',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description:
      'No tracking pixels. No user accounts. CSP headers, HSTS, and rate limiting protect every request. Your browsing stays yours.',
    color: '#2962ff',
    gradient: 'from-blue-500/10 to-transparent',
  },
] as const

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function FeaturesSection() {
  return (
    <section className="py-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold text-accent-blue uppercase tracking-widest mb-3">
          Why Fundelstock
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Everything a fundamental trader needs,{' '}
          <span className="text-gradient-brand">nothing they don&apos;t.</span>
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
          Built specifically for traders who research before they buy — not for algorithms
          chasing milliseconds.
        </p>
      </motion.div>

      {/* Feature cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {FEATURES.map(({ icon: Icon, title, description, color }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
          >
            <TiltCard
              className="overflow-hidden relative p-6 group cursor-default h-full"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: '16px',
                borderTop: `2px solid ${color}50`,
              }}
            >
              {/* Background decoration icon */}
              <div
                className="pointer-events-none absolute top-3 right-3 opacity-5"
                style={{ width: 80, height: 80 }}
              >
                <Icon size={80} style={{ color }} />
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                }}
              >
                <Icon size={20} style={{ color }} />
              </div>

              <h3 className="text-base font-semibold text-text-primary mb-2">{title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
