'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Globe, TrendingUp, Zap } from 'lucide-react'

const HERO_WORDS = ['Market-Moving', 'News,', 'Organized', 'For', 'Traders.']

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-14 overflow-hidden">
      {/* Subtle hero spotlight */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(41,98,255,0.12) 0%, rgba(124,77,255,0.06) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-blue-border bg-accent-blue-bg text-accent-blue text-[11px] font-semibold mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse-dot" />
        Real-Time Market Intelligence
      </motion.div>

      {/* Animated headline */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold text-text-primary leading-[1.1] tracking-tight max-w-3xl"
        aria-label="Market-Moving News, Organized For Traders."
      >
        {HERO_WORDS.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] ${
              word === 'News,' ? 'text-gradient-brand' : ''
            }`}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        custom={0.7}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl"
      >
        Fundelstock aggregates breaking financial news and categorizes it by sector and
        global index — so fundamental traders spend less time searching and more time deciding.
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={0.85}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-8 flex flex-wrap gap-3"
      >
        <Link
          href="#sectors"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue hover:bg-accent-blue-hover text-white font-semibold text-sm rounded-xl transition-all shadow-glow-blue hover:shadow-glow-blue hover:scale-[1.02] active:scale-[0.98]"
        >
          Explore Sectors
          <ArrowRight size={15} />
        </Link>
        <Link
          href="/indices"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border-medium bg-bg-elevated hover:bg-bg-surface-hover text-text-secondary hover:text-text-primary font-semibold text-sm rounded-xl transition-all hover:border-border-strong"
        >
          <Globe size={15} />
          Global Indices
        </Link>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border-medium bg-bg-elevated hover:bg-bg-surface-hover text-text-secondary hover:text-text-primary font-semibold text-sm rounded-xl transition-all hover:border-border-strong"
        >
          <Zap size={15} />
          Latest News
        </Link>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        custom={1.1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-12 flex items-center gap-2 text-text-tertiary text-xs"
      >
        <TrendingUp size={12} className="text-accent-green" />
        <span>Live data updated every 5 minutes · Charts powered by TradingView</span>
      </motion.div>
    </section>
  )
}
