import { useState, useMemo } from 'react'
import { isBrowser, get } from '@vtex/admin-ui-util'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'
import { tokens } from '@vtex/admin-ui-core'

const queries = tokens.breakpoints.map((bp) => `(min-width: ${bp})`)

/**
 * React hook that tracks state of a CSS media query
 */
export function useBreakpoint() {
  const isMatchMediaSupported = isBrowser && 'matchMedia' in window

  const [matches, setMatches] = useState(
    queries.map(
      (query) => isMatchMediaSupported && window.matchMedia(query).matches
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

  const breakpoint = useMemo<Breakpoint>(() => {
    const [mobile, tablet, desktop, widescreen] = matches

    if (widescreen) return 'widescreen'
    if (desktop) return 'desktop'
    if (tablet) return 'tablet'
    if (mobile) return 'mobile'

    return 'mobile'
  }, [matches])

  return {
    breakpoint,
    matches,
  }
}

/**
 * Get the responsive value for the responsive prop
 * @param prop the responsive prop
 * @param breakpoint desired breakpoint
 * @example
 * const { prop } = props
 * const [breakpoint] = useBreakpoint()
 * const responsiveProp = getResponsiveValue(prop, breakpoint)
 */
export function getResponsiveValue<T>(
  prop: ResponsiveProp<T>,
  breakpoint: Breakpoint
): T {
  if (typeof prop !== 'object') return prop

  return get(prop as ResponsiveValue<T>, breakpoint, prop)
}

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'widescreen'

export type ResponsiveValue<T> = {
  mobile: T
  tablet?: T
  desktop?: T
  widescreen?: T
}

export type ResponsiveProp<T> = T | ResponsiveValue<T>
