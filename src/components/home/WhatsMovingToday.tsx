import type { NewsArticle } from '@/types/news'

interface Props {
  articles: NewsArticle[]
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function WhatsMovingToday({ articles }: Props) {
  if (!articles?.length) return null

  // ── Most-mentioned sector today ──────────────────────────────────────────
  const sectorCounts: Record<string, number> = {}
  for (const article of articles) {
    for (const slug of article.sectors) {
      sectorCounts[slug] = (sectorCounts[slug] ?? 0) + 1
    }
  }

  const topSectorEntry = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1])[0]
  if (!topSectorEntry) return null

  const topSectorSlug = topSectorEntry[0]
  // Capitalize slug: e.g. "real-estate" → "Real Estate"
  const topSectorName = topSectorSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  // ── Sentiment split ───────────────────────────────────────────────────────
  let bullishCount  = 0
  let bearishCount  = 0
  let neutralCount  = 0

  for (const article of articles) {
    if (article.sentiment === 'bullish')  bullishCount++
    else if (article.sentiment === 'bearish') bearishCount++
    else neutralCount++
  }

  const total = articles.length
  const bullishPct = Math.round((bullishCount / total) * 100)

  // ── Breaking count ────────────────────────────────────────────────────────
  const breakingCount = articles.filter((a) => a.breaking).length

  const today = formatDate(new Date())

  return (
    <div className="bg-bg-elevated border border-border-subtle rounded-xl px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      {/* Left label */}
      <span className="text-xs font-semibold text-text-secondary whitespace-nowrap">
        📊 Today&apos;s Pulse:
      </span>

      {/* Center pills */}
      <div className="flex flex-wrap items-center gap-2 flex-1">
        {/* Leading sector */}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium whitespace-nowrap">
          🔥 {topSectorName} leading
        </span>

        {/* Bullish % */}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium whitespace-nowrap">
          📈 {bullishPct}% Bullish
        </span>

        {/* Breaking count */}
        {breakingCount > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium whitespace-nowrap">
            🔴 {breakingCount} Breaking
          </span>
        )}
      </div>

      {/* Right: date */}
      <span className="text-xs text-text-tertiary whitespace-nowrap ml-auto">
        {today}
      </span>
    </div>
  )
}
