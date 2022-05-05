import { useReducer } from 'react'

/**
 * Forces a component update
 */
export function useForceUpdate() {
  const [, forceUpdate] = useReducer((c: number) => c + 1, 0)

  return forceUpdate
}
