import * as React from 'react'

const _React = { ...React }
const useReactId = _React.useId

/**
 * It's `true` if it is running in a browser environment or `false` if it is not
 * (SSR).
 * @example
 * const title = canUseDOM ? document.title : "";
 */
export const canUseDOM = checkIsBrowser()

// Check if we can use the DOM. Useful for SSR purposes
function checkIsBrowser() {
  return typeof window !== 'undefined' && !!window.document?.createElement
}

/**
 * `React.useLayoutEffect` that fallbacks to `React.useEffect` on server side.
 */
export const useSafeLayoutEffect = canUseDOM
  ? React.useLayoutEffect
  : React.useEffect

/**
 * Generates a unique ID. Uses React's useId if available.
 */
export function useId(defaultId?: string): string | undefined {
  if (useReactId) {
    const reactId = useReactId()

    if (defaultId) return defaultId

    return reactId
  }

  const [id, setId] = React.useState(defaultId)

  useSafeLayoutEffect(() => {
    if (defaultId || id) return
    const random = Math.random().toString(36).substr(2, 6)

    setId(`id-${random}`)
  }, [defaultId, id])

  return defaultId || id
}
