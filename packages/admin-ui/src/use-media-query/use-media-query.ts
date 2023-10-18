import React from 'react'
import { isBrowser } from '@vtex/admin-ui-util'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 */
export function useMediaQuery(query: string | string[]): boolean[] {
  const queries = Array.isArray(query) ? query : [query]

  const isSupported = isBrowser && 'matchMedia' in window

  const [matches, setMatches] = React.useState(
    queries.map((query) =>
      isSupported ? window.matchMedia(query).matches : false
    )
  )

  useSafeLayoutEffect(() => {
    if (!isSupported) return undefined

    const mediaQueryList = queries.map((query) => window.matchMedia(query))

    const listenerList = mediaQueryList.map((mediaQuery, index) => {
      const listener = () =>
        setMatches((prev) =>
          prev.map((prevValue, idx) =>
            index === idx ? !!mediaQuery.matches : prevValue
          )
        )

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', listener)
      } else if (mediaQuery.addListener) {
        // Compatibility to Safari (iOS: v13.5)
        mediaQuery.addListener(listener)
      }

      return listener
    })

    return () => {
      mediaQueryList.forEach((mediaQuery, index) => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', listenerList[index])
        } else if (mediaQuery.removeListener) {
          // Compatibility to Safari (iOS: v13.5)
          mediaQuery.removeListener(listenerList[index])
        }
      })
    }
  }, [query])

  return matches
}
