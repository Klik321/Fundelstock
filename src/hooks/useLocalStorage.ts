import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) setStoredValue(JSON.parse(item))
    } catch {}
  }, [key])

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
        try { localStorage.setItem(key, JSON.stringify(next)) } catch {}
        return next
      })
    },
    [key],
  )

  return [storedValue, setValue] as const
}
