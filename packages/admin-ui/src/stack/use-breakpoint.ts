import { useState, useMemo } from 'react'
import { isBrowser } from '@vtex/admin-ui-util'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'
import { tokens } from '@vtex/admin-ui-core'

const queries = tokens.breakpoints.map((bp) => `(min-width: ${bp})`)

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'widescreen'

/**
 * React hook that tracks state of a CSS media query
 */
export function useBreakpoint(): [Breakpoint, boolean[]] {
  const isMatchMediaSupported = isBrowser && 'matchMedia' in window

  const [matches, setMatches] = useState(
    queries.map((query) =>
      isMatchMediaSupported ? window.matchMedia(query).matches : false
    )
  )

  useSafeLayoutEffect(() => {
    if (!isMatchMediaSupported) return undefined

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
  }, [])

  const media = useMemo(() => {
    const [mobile, tablet, desktop, widescreen] = matches

    if (widescreen) return 'widescreen'
    if (desktop) return 'desktop'
    if (tablet) return 'tablet'
    if (mobile) return 'mobile'

    return 'mobile'
  }, [matches])

  return [media, matches]
}
