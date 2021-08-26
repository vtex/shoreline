import { useRef, useLayoutEffect, useEffect } from 'react'
import { isBrowser } from '@vtex/onda-util'

const useSafeEffect = isBrowser ? useLayoutEffect : useEffect

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

function applyCSSVariables(props: Record<string, any>) {
  const root = document.documentElement

  Object.keys(props).map((prop) => {
    root.style.setProperty(prop, props[prop])
  })
}
