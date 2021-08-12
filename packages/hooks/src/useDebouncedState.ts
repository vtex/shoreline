import { useState } from 'react'

import { useDebouncedCallback } from './useDebounce'

/**
 * React.useState with a debounced callback
 * @example
 * const [state, setState] = useDebouncedState({
 *  initalState: '',
 *  timeoutMs: 250
 * })
 */
export function useDebouncedState<T>(
  params: UseDebouncedStateParams<T>
): [T, (v: T) => void] {
  const { initialState, timeoutMs, produce = (s) => s } = params
  const [state, setState] = useState<T>(initialState)
  const debouncedSetState = useDebouncedCallback((draftState) => {
    const producedState = produce(draftState)

    setState(() => producedState)
  }, timeoutMs)

  return [state, debouncedSetState]
}

export interface UseDebouncedStateParams<T> {
  initialState: T
  timeoutMs: number
  produce?: (draftState: T) => T
}
