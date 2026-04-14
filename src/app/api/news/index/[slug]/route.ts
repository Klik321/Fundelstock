import { NextRequest, NextResponse } from 'next/server'
import { fetchNews } from '@/lib/api'
import { INDICES } from '@/data/indices'

interface Props { params: { slug: string } }

export async function GET(_req: NextRequest, { params }: Props) {
  const indexSlug = params.slug?.replace(/[^a-z0-9-]/gi, '').slice(0, 60)
  const validIndex = INDICES.find((i) => i.slug === indexSlug)

  if (!validIndex) {
    return NextResponse.json({ error: 'Unknown index slug' }, { status: 404 })
  }

  try {
    const data = await fetchNews({ indexSlug, limit: 20 })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch (err) {
    console.error(`[/api/news/index/${indexSlug}]`, err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
