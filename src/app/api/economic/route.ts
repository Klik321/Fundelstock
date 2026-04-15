import { NextResponse } from 'next/server'
import { cache } from '@/lib/cache'

const FRED_API_KEY = process.env.FRED_API_KEY ?? ''
const CACHE_KEY = 'fred:economic-indicators'
const CACHE_TTL = 3_600_000 // 1 hour

interface FredObservation {
  date: string
  value: string
}

interface FredResponse {
  observations: FredObservation[]
}

interface EconomicIndicator {
  id: string
  name: string
  value: number
  unit: string
  change: number
  changeType: 'up' | 'down' | 'flat'
}

const SERIES = [
  { id: 'FEDFUNDS', name: 'Fed Funds Rate',  unit: '%'    },
  { id: 'CPIAUCSL', name: 'CPI Inflation',   unit: 'YoY%' },
  { id: 'UNRATE',   name: 'Unemployment',    unit: '%'    },
  { id: 'DGS10',    name: '10Y Treasury',    unit: '%'    },
] as const

async function fetchSeries(seriesId: string): Promise<FredObservation[]> {
  const url =
    `https://api.stlouisfed.org/fred/series/observations` +
    `?series_id=${seriesId}` +
    `&api_key=${FRED_API_KEY}` +
    `&sort_order=desc` +
    `&limit=2` +
    `&file_type=json`

  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) throw new Error(`FRED ${seriesId}: ${res.status}`)
  const json: FredResponse = await res.json()
  return json.observations ?? []
}

function parseVal(s: string): number | null {
  const n = parseFloat(s)
  return isNaN(n) ? null : n
}

export async function GET() {
  // Try cache first
  const cached = cache.get<{ indicators: EconomicIndicator[] }>(CACHE_KEY)
  if (cached) return NextResponse.json(cached)

  try {
    const results = await Promise.all(SERIES.map((s) => fetchSeries(s.id)))

    const indicators: EconomicIndicator[] = []

    for (let i = 0; i < SERIES.length; i++) {
      const series = SERIES[i]
      const obs = results[i]

      const latest = obs[0] ? parseVal(obs[0].value) : null
      const prev   = obs[1] ? parseVal(obs[1].value) : null

      if (latest === null) continue

      const change = prev !== null ? parseFloat((latest - prev).toFixed(3)) : 0
      const changeType: 'up' | 'down' | 'flat' =
        change > 0 ? 'up' : change < 0 ? 'down' : 'flat'

      indicators.push({
        id:         series.id,
        name:       series.name,
        value:      latest,
        unit:       series.unit,
        change,
        changeType,
      })
    }

    const payload = { indicators }
    cache.set(CACHE_KEY, payload, CACHE_TTL)
    return NextResponse.json(payload)
  } catch (err) {
    console.error('[/api/economic]', err)
    return NextResponse.json({ indicators: [] })
  }
}
