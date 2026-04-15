'use client'

import { useState, useEffect, useCallback } from 'react'
import { Trash2, Bell } from 'lucide-react'

interface Alert {
  id: string
  symbol: string
  condition: 'above' | 'below'
  price: number
  createdAt: string
  triggered: boolean
}

const STORAGE_KEY = 'fundelstock-alerts'
const MAX_ALERTS = 10

function loadAlerts(): Alert[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Alert[]
  } catch {
    return []
  }
}

function saveAlerts(alerts: Alert[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts))
  } catch {}
}

export default function PriceAlertBuilder() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [symbol, setSymbol] = useState('')
  const [condition, setCondition] = useState<'above' | 'below'>('above')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  // Load from localStorage on mount (client-only)
  useEffect(() => {
    setAlerts(loadAlerts())
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setError('')

      const trimmedSymbol = symbol.trim().toUpperCase()
      const parsedPrice = parseFloat(price)

      if (!trimmedSymbol) {
        setError('Symbol is required.')
        return
      }
      if (!/^[A-Z0-9.]{1,8}$/.test(trimmedSymbol)) {
        setError('Symbol must be 1–8 alphanumeric characters.')
        return
      }
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        setError('Enter a valid positive price.')
        return
      }
      if (alerts.length >= MAX_ALERTS) {
        setError(`Maximum ${MAX_ALERTS} alerts allowed.`)
        return
      }

      const newAlert: Alert = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        symbol: trimmedSymbol,
        condition,
        price: parsedPrice,
        createdAt: new Date().toISOString(),
        triggered: false,
      }

      const updated = [...alerts, newAlert]
      setAlerts(updated)
      saveAlerts(updated)
      setSymbol('')
      setPrice('')
    },
    [alerts, symbol, condition, price],
  )

  const handleDelete = useCallback(
    (id: string) => {
      const updated = alerts.filter((a) => a.id !== id)
      setAlerts(updated)
      saveAlerts(updated)
    },
    [alerts],
  )

  return (
    <div className="space-y-6">
      {/* ── Add Alert Form ── */}
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-4">New Alert</h2>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Symbol */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="alert-symbol" className="text-xs text-text-secondary font-medium">
                Symbol
              </label>
              <input
                id="alert-symbol"
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase().slice(0, 8))}
                placeholder="AAPL"
                maxLength={8}
                className="w-full px-3 py-2 rounded-lg border border-border-medium bg-bg-elevated text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-colors"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {/* Condition */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="alert-condition" className="text-xs text-text-secondary font-medium">
                Condition
              </label>
              <select
                id="alert-condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
                className="w-full px-3 py-2 rounded-lg border border-border-medium bg-bg-elevated text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-colors"
              >
                <option value="above">Price above</option>
                <option value="below">Price below</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="alert-price" className="text-xs text-text-secondary font-medium">
                Target price ($)
              </label>
              <input
                id="alert-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="150.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 rounded-lg border border-border-medium bg-bg-elevated text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-colors"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-text-tertiary">
              {alerts.length} / {MAX_ALERTS} alerts used
            </span>
            <button
              type="submit"
              disabled={alerts.length >= MAX_ALERTS}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Bell size={13} />
              Add Alert
            </button>
          </div>
        </form>
      </div>

      {/* ── Alerts List ── */}
      <div className="bg-bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border-subtle">
          <h2 className="text-sm font-semibold text-text-primary">Active Alerts</h2>
        </div>

        {alerts.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Bell size={28} className="mx-auto mb-3 text-text-tertiary opacity-40" />
            <p className="text-sm text-text-tertiary">No alerts yet.</p>
            <p className="text-xs text-text-tertiary mt-1">Add a symbol above to get started.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border-subtle">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-bg-elevated transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-blue-bg shrink-0">
                    <Bell size={13} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary font-mono">
                      {alert.symbol}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {alert.condition === 'above' ? 'Above' : 'Below'}{' '}
                      <span className="font-mono">${alert.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {alert.triggered && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Triggered
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(alert.id)}
                    aria-label={`Delete alert for ${alert.symbol}`}
                    className="flex items-center justify-center w-7 h-7 rounded-lg text-text-tertiary hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
