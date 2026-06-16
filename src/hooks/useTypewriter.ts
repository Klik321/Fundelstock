import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Types out `text` character-by-character at `speed` ms per character.
 *
 * SSR-safe: the full text is the initial value, so server output, no-JS
 * clients, and crawlers always see the real headline (no empty flash). The
 * typewriter animation runs only after mount and only when motion is allowed.
 */
export function useTypewriter(text: string, speed: number = 35): string {
  const prefersReducedMotion = useReducedMotion()
  const [displayedText, setDisplayedText] = useState(text)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Until mounted (and for reduced-motion users) just show the full text.
    if (!mounted || prefersReducedMotion || !text) {
      setDisplayedText(text)
      return
    }

    setDisplayedText('')
    let index = 0
    const id = setInterval(() => {
      index += 1
      setDisplayedText(text.slice(0, index))
      if (index >= text.length) clearInterval(id)
    }, speed)

    return () => clearInterval(id)
  }, [text, speed, mounted, prefersReducedMotion])

  return displayedText
}
