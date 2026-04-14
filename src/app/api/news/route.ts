import { NextRequest, NextResponse } from 'next/server'
import { fetchNews } from '@/lib/api'

/** Rate limiter: max 30 requests per 60s per IP (in-process) */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 30) return false
  entry.count++
  return true
}

export async function GET(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before retrying.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    )
  }

  const { searchParams } = new URL(request.url)

  // Validate + sanitize query params
  const rawSector = searchParams.get('sector') ?? undefined
  const rawIndex = searchParams.get('index') ?? undefined
  const rawLimit = parseInt(searchParams.get('limit') ?? '20', 10)
  const rawQ = searchParams.get('q') ?? undefined

  const sectorSlug = rawSector?.replace(/[^a-z0-9-]/gi, '').slice(0, 60)
  const indexSlug = rawIndex?.replace(/[^a-z0-9-]/gi, '').slice(0, 60)
  // Strip HTML and limit search query to 100 chars
  const searchQuery = rawQ?.replace(/<[^>]*>/g, '').trim().slice(0, 100)
  const limit = Math.min(Math.max(1, isNaN(rawLimit) ? 20 : rawLimit), 50)

  try {
    const data = await fetchNews({ sectorSlug, indexSlug, limit })

    // Client-side text filter when a search query is provided
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase()
      data.articles = data.articles.filter(
        (a) =>
          a.headline.toLowerCase().includes(lowerQ) ||
          (a.summary ?? '').toLowerCase().includes(lowerQ) ||
          a.source.toLowerCase().includes(lowerQ),
      )
      data.total = data.articles.length
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (err) {
    console.error('[/api/news]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
