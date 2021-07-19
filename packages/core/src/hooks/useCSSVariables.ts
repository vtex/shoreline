import { useRef, useLayoutEffect, useEffect } from 'react'
import { applyCSSVariables } from '@vtex/onda-system'

const useSafeEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Apply css variables
 * @param variables
 */
export function useCSSVariables(variables: Record<string, any>) {
  const ref = useRef({ mounted: false })

  useSafeEffect(() => {
    if (!ref.current.mounted) {
      applyCSSVariables(variables)
      ref.current.mounted = true
    }
  }, [variables])
}
