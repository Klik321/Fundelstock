'use client'

import { memo, useEffect, useState } from 'react'
import type { NewsFeedResponse } from '@/types/news'

interface SentimentResult {
  score: number
  label: string
  color: string
}

function scoreToLabel(score: number): { label: string; color: string } {
  if (score <= 20) return { label: 'Extreme Fear', color: '#ef4444' }
  if (score <= 40) return { label: 'Fear', color: '#f97316' }
  if (score <= 60) return { label: 'Neutral', color: '#eab308' }
  if (score <= 80) return { label: 'Greed', color: '#14b8a6' }
  return { label: 'Extreme Greed', color: '#22c55e' }
}

function FearGreedMeter() {
  const [result, setResult] = useState<SentimentResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/news?limit=50')
        if (!res.ok) throw new Error('fetch failed')
        const data: NewsFeedResponse = await res.json()

        const articles = data.articles ?? []
        if (articles.length === 0) {
          if (!cancelled) setResult({ score: 50, ...scoreToLabel(50) })
          return
        }

        let rawScore = 0
        for (const a of articles) {
          if (a.sentiment === 'bullish') rawScore += 2
          else if (a.sentiment === 'neutral') rawScore += 1
          else if (a.sentiment === 'bearish') rawScore -= 1
        }

        // Normalise: min possible = articles.length * -1, max = articles.length * 2
        const minPossible = articles.length * -1
        const maxPossible = articles.length * 2
        const normalised = Math.round(
          ((rawScore - minPossible) / (maxPossible - minPossible)) * 100,
        )
        const score = Math.max(0, Math.min(100, normalised))

        if (!cancelled) setResult({ score, ...scoreToLabel(score) })
      } catch {
        if (!cancelled) setResult({ score: 50, ...scoreToLabel(50) })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-5">
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Fear &amp; Greed Index
      </p>

      {loading || !result ? (
        <div className="space-y-3">
          <div className="h-3 rounded-full skeleton w-full" />
          <div className="h-8 skeleton rounded-lg w-24 mx-auto" />
        </div>
      ) : (
        <>
          {/* Progress bar track */}
          <div className="relative w-full h-3 rounded-full overflow-visible bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mb-5">
            {/* Indicator dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-bg-primary shadow-md transition-all duration-500"
              style={{
                left: `calc(${result.score}% - 8px)`,
                background: result.color,
              }}
            />
          </div>

          {/* Score + Label */}
          <div className="text-center mt-3">
            <p
              className="text-3xl font-bold tabular-nums leading-none"
              style={{ color: result.color }}
            >
              {result.score}
            </p>
            <p className="text-sm font-semibold mt-1" style={{ color: result.color }}>
              {result.label}
            </p>
            <p className="text-[10px] text-text-tertiary mt-1">Based on last 50 articles</p>
          </div>

          {/* Scale labels */}
          <div className="flex justify-between mt-3 text-[9px] text-text-tertiary font-mono">
            <span>Fear</span>
            <span>Neutral</span>
            <span>Greed</span>
          </div>
        </>
      )}
    </div>
  )
}

export default memo(FearGreedMeter)
