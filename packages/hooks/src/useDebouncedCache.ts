import { useState, useCallback } from 'react'

import { useDebounce } from './useDebounce'

/**
 * React.useState with a debounced value
 * @example
 * const [state, debouncedCache, setState] = useDebouncedCache({
 *  initalState: '',
 *  timeoutMs: 500
 * })
 */
export function useDebouncedCache<T>(
  params: UseDebouncedCacheParams<T>
): [T, T, (v: T) => void] {
  const { initialState, timeoutMs, produce = (s) => s } = params
  const [state, setState] = useState<T>(initialState)
  const [debouncedCache] = useDebounce<T>(state, timeoutMs)

  const memoizedSetState = useCallback(
    (draftState: T) => {
      const producedState = produce(draftState)

      setState(() => producedState)
    },
    [produce]
  )

  return [state, debouncedCache, memoizedSetState]
}

export interface UseDebouncedCacheParams<T> {
  initialState: T
  timeoutMs: number
  produce?: (draftState: T) => T
}
