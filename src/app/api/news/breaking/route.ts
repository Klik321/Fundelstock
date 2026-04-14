import { NextResponse } from 'next/server'
import { fetchBreakingNews } from '@/lib/api'

export async function GET() {
  try {
    const articles = await fetchBreakingNews()
    return NextResponse.json(
      { articles },
      { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' } },
    )
  } catch (err) {
    console.error('[/api/news/breaking]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
