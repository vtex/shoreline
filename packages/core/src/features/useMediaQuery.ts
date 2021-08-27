import React from 'react'
import { isBrowser } from '@vtex/admin-ui-util'

const useSafeLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect

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

      mediaQuery.addEventListener('change', listener)

      return listener
    })

    return () => {
      mediaQueryList.forEach((mediaQuery, index) => {
        mediaQuery.removeEventListener('change', listenerList[index])
      })
    }
  }, [query])

  return matches
}
