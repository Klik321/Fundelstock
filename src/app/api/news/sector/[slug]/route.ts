import { NextRequest, NextResponse } from 'next/server'
import { fetchNews } from '@/lib/api'
import { SECTORS } from '@/data/sectors'

interface Props { params: { slug: string } }

export async function GET(_req: NextRequest, { params }: Props) {
  // Validate slug against known sectors
  const sectorSlug = params.slug?.replace(/[^a-z0-9-]/gi, '').slice(0, 60)
  const validSector = SECTORS.find((s) => s.slug === sectorSlug)

  if (!validSector) {
    return NextResponse.json({ error: 'Unknown sector slug' }, { status: 404 })
  }

  try {
    const data = await fetchNews({ sectorSlug, limit: 20 })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch (err) {
    console.error(`[/api/news/sector/${sectorSlug}]`, err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
