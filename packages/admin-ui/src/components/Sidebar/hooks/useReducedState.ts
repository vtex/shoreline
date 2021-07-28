import { useCallback, useState } from 'react'

export function useReducedState(initialState = false): ReducedState {
  const initiallyReduced = useInitalState(initialState)
  /** keeps track of leftnav's reduced state */
  const [reduced, setReduced] = useState<boolean>(initiallyReduced)
  /** keeps track of button appearance */
  const [toggleVisible, setToggleVisible] = useState(false)

  const toggle = useCallback(() => {
    setReduced((r) => !r)
  }, [])

  const reduce = useCallback(() => {
    setReduced(true)
  }, [])

  const expand = useCallback(() => {
    setReduced(false)
  }, [])

  const showToggle = useCallback(() => {
    setToggleVisible(true)
  }, [])

  const hideToggle = useCallback(() => {
    setToggleVisible(false)
  }, [])

  return {
    reduced,
    reduce,
    expand,
    toggleVisible,
    toggle,
    showToggle,
    hideToggle,
  }
}

type InitialState<T> = T | (() => T)

/**
 * React custom hook that returns the very first value passed to `initialState`,
 * even if it changes between re-renders.
 */
export function useInitalState<T>(initialState: InitialState<T>) {
  const [init] = useState(initialState)

  return init
}

export interface ReducedState {
  /** If is reduced or not */
  reduced: boolean
  /** Toggle button visibility */
  toggleVisible: boolean
  /** Toggle reduced state */
  toggle: () => void
  /** Reduce the nav */
  reduce: () => void
  /** Expand the nav */
  expand: () => void
  /** Enable button visibility */
  showToggle: () => void
  /** Disable button visibility */
  hideToggle: () => void
}
