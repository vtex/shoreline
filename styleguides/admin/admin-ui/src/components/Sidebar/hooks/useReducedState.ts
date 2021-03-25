import { useCallback, useState } from 'react'

export function useReducedState(initialState: boolean = false): ReducedState {
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
  /** if is reduced or not */
  reduced: boolean
  /** toggle button visibility */
  toggleVisible: boolean
  /** toggle reduced state */
  toggle: () => void
  /** reduce the nav */
  reduce: () => void
  /** expand the nav */
  expand: () => void
  /** enable button visibility */
  showToggle: () => void
  /** disable button visibility */
  hideToggle: () => void
}
