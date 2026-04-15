'use client'

import { memo, useEffect, useState } from 'react'

interface MarketState {
  isOpen: boolean
  label: string
  countdown: string
}

function getETTime(now: Date) {
  // Use Intl to get parts in ET timezone
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    weekday: 'short',
  })
  const parts = fmt.formatToParts(now)
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? '0', 10)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = get('hour')
  const minute = get('minute')
  const second = get('second')

  return { weekday, hour, minute, second }
}

function computeMarketState(now: Date): MarketState {
  const { weekday, hour, minute, second } = getETTime(now)

  // NYSE: Mon–Fri 9:30–16:00 ET
  const isWeekday = !['Sat', 'Sun'].includes(weekday)
  const totalSeconds = hour * 3600 + minute * 60 + second
  const openSeconds = 9 * 3600 + 30 * 60   // 09:30
  const closeSeconds = 16 * 3600            // 16:00

  if (isWeekday && totalSeconds >= openSeconds && totalSeconds < closeSeconds) {
    // Market is open — countdown to close
    const remaining = closeSeconds - totalSeconds
    const h = Math.floor(remaining / 3600)
    const m = Math.floor((remaining % 3600) / 60)
    const s = remaining % 60

    let countdown = ''
    if (h > 0) countdown += `${h}h `
    countdown += `${m}m ${String(s).padStart(2, '0')}s`

    return { isOpen: true, label: 'Open', countdown: `closes in ${countdown}` }
  }

  // Market is closed — find next open
  // Build a Date in ET for the next 9:30 AM on a weekday
  // We'll iterate forward (max 7 days) to find the next Mon–Fri
  let candidate = new Date(now)
  // Start from today or tomorrow depending on whether we're past close
  if (isWeekday && totalSeconds >= closeSeconds) {
    // past today's close — start from tomorrow
    candidate.setUTCDate(candidate.getUTCDate() + 1)
  }

  for (let i = 0; i < 7; i++) {
    const { weekday: wd } = getETTime(candidate)
    if (!['Sat', 'Sun'].includes(wd)) {
      // Found next trading day — set it to 9:30 AM ET
      // Build an ISO string for that day at 9:30 in ET
      const dateFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      const dateParts = dateFmt.formatToParts(candidate)
      const dGet = (t: string) => dateParts.find((p) => p.type === t)?.value ?? '0'
      const yr = dGet('year')
      const mo = dGet('month')
      const dy = dGet('day')

      // Use Temporal-style trick: create the target in ET by building an offset-aware string
      // Determine UTC offset for ET on that day (9:30 AM ET)
      const testStr = `${yr}-${mo}-${dy}T09:30:00`
      // Parse as a local-time by checking what offset ET has on that date
      // We do this by formatting an arbitrary UTC time and computing the offset
      const refUtc = new Date(`${yr}-${mo}-${dy}T14:30:00.000Z`) // 14:30 UTC is definitely within ET day
      const etHour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: 'numeric',
          hour12: false,
        }).format(refUtc),
        10,
      )
      // offset = etHour - 14 (since we used 14:30 UTC)
      const offsetHours = etHour - 14 // will be -4 (EDT) or -5 (EST)
      const openUtcMs =
        new Date(`${yr}-${mo}-${dy}T09:30:00.000Z`).getTime() - offsetHours * 3600 * 1000

      const diff = Math.max(0, Math.floor((openUtcMs - now.getTime()) / 1000))
      const dh = Math.floor(diff / 3600)
      const dm = Math.floor((diff % 3600) / 60)
      const ds = diff % 60

      let countdown = ''
      if (dh > 0) countdown += `${dh}h `
      if (dh > 0 || dm > 0) countdown += `${dm}m `
      countdown += `${String(ds).padStart(2, '0')}s`

      return { isOpen: false, label: 'Closed', countdown: `opens in ${countdown.trim()}` }
    }
    candidate.setUTCDate(candidate.getUTCDate() + 1)
  }

  return { isOpen: false, label: 'Closed', countdown: '' }
}

function MarketCountdown() {
  const [state, setState] = useState<MarketState>(() => computeMarketState(new Date()))

  useEffect(() => {
    const tick = () => setState(computeMarketState(new Date()))
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono text-text-secondary">
      {/* Status dot */}
      <span
        className={
          state.isOpen
            ? 'w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot shrink-0'
            : 'w-1.5 h-1.5 rounded-full bg-red-500 shrink-0'
        }
      />
      <span className={state.isOpen ? 'text-green-400' : 'text-red-400'}>
        {state.label}
      </span>
      {state.countdown && (
        <>
          <span className="text-text-tertiary">·</span>
          <span className="text-text-tertiary">{state.countdown}</span>
        </>
      )}
    </div>
  )
}

export default memo(MarketCountdown)
