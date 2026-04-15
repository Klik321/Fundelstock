'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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

      {/* ── Aurora beams ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Beam 1 — blue, top-left */}
        <div
          className="aurora-1 absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 40% 40%, rgba(41,98,255,0.18) 0%, rgba(41,98,255,0.06) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Beam 2 — purple, top-right */}
        <div
          className="aurora-2 absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 60% 30%, rgba(124,77,255,0.16) 0%, rgba(124,77,255,0.05) 45%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Beam 3 — teal, bottom-center */}
        <div
          className="aurora-3 absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(38,166,154,0.10) 0%, rgba(38,166,154,0.04) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Scan line */}
        <div
          className="scan-line absolute left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(41,98,255,0.4) 30%, rgba(124,77,255,0.4) 70%, transparent 100%)', top: '10%' }}
        />
      </div>

      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, opacity: 0.25 }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Bottom fade to page */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))', zIndex: 1 }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
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

          {/* Trusted sources */}
          <motion.div
            custom={1.0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 flex items-center gap-2 text-text-tertiary text-xs"
          >
            <span className="font-medium text-text-tertiary">Trusted data from:</span>
            <span className="text-text-tertiary opacity-70">
              Reuters · Bloomberg · CNBC · Financial Times · AP · MarketWatch
            </span>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            custom={1.1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 flex items-center gap-2 text-text-tertiary text-xs"
          >
            <TrendingUp size={12} className="text-accent-green" />
            <span>Live data updated every 5 minutes · Charts powered by TradingView</span>
          </motion.div>
        </div>

        {/* Right column — market snapshot card, hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <div
            className="relative rounded-2xl overflow-hidden border border-border-medium"
            style={{ boxShadow: '0 0 60px rgba(41,98,255,0.15)' }}
          >
            {/* Stock market image */}
            <Image
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80&auto=format"
              alt="Stock market trading screen"
              width={700}
              height={420}
              className="w-full h-full object-cover rounded-2xl"
              priority
            />

            {/* Bottom gradient overlay */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)',
              }}
            />

            {/* Top-left badge: Markets Open */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Markets Open
            </div>

            {/* Bottom-right badge: Index coverage */}
            <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 text-[11px] font-medium">
              S&amp;P 500 · NASDAQ · 10 Indices
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
