import { useMemo } from 'react'
import { get } from '@vtex/admin-ui-util'
import { tokens } from '@vtex/admin-ui-core'
import { useMediaQuery } from './use-media-query'

const queries = tokens.breakpoints.map((bp) => `(min-width: ${bp})`)

/**
 * React hook that tracks state of a CSS media query
 */
export function useBreakpoint() {
  const matches = useMediaQuery(queries)

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
 * const { breakpoint } = useBreakpoint()
 * const responsiveProp = getResponsiveValue(prop, breakpoint)
 */
export function getResponsiveValue<T>(
  prop: ResponsiveProp<T>,
  breakpoint: Breakpoint,
  index?: number
): T {
  if (typeof prop !== 'object') return prop

  if (index && index < 0) return get(prop as ResponsiveValue<T>, 'mobile')

  const breakpoints = ['mobile', 'tablet', 'desktop', 'widescreen']

  const resolvedIndex = index ?? breakpoints.indexOf(breakpoint)

  const responsiveValue = get(
    prop as ResponsiveValue<T>,
    breakpoints[resolvedIndex],
    null
  )

  if (!responsiveValue) {
    return getResponsiveValue(prop, breakpoint, resolvedIndex - 1)
  }

  return responsiveValue
}

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'widescreen'

export type ResponsiveValue<T> = {
  mobile: T
  tablet?: T
  desktop?: T
  widescreen?: T
}

export type ResponsiveProp<T> = T | ResponsiveValue<T>
