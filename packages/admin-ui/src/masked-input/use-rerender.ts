import { useReducer } from 'react'

/**
 * Forces a component update
 */
export function useRerender() {
  const [, rerender] = useReducer((c: number) => c + 1, 0)

  return rerender
}
