import { useEffect, useState } from 'react'

/**
 * Types out `text` character-by-character at `speed` ms per character.
 * Resets and retypes whenever `text` changes.
 */
export function useTypewriter(text: string, speed: number = 35): string {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    // Reset immediately when text changes
    setDisplayedText('')

    if (!text) return

    let index = 0
    const id = setInterval(() => {
      index += 1
      setDisplayedText(text.slice(0, index))
      if (index >= text.length) {
        clearInterval(id)
      }
    }, speed)

    return () => clearInterval(id)
  }, [text, speed])

  return displayedText
}
