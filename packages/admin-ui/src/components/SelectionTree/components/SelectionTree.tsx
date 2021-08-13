import type { ReactNode } from 'react'
import React from 'react'
import type { SelectionTreeState } from '../state'
import { SelectionTreeContext } from '../context'

/**
 * SelectionTree context
 * @example
 * const state = useSelectionTreeState({
 *  items: []
 * })
 *
 * <SelectionTree state={state} />
 */
export function SelectionTree<T>(props: Props<T>) {
  const { state, children } = props

  return (
    <SelectionTreeContext.Provider value={state}>
      {children}
    </SelectionTreeContext.Provider>
  )
}

interface Props<T> {
  state: SelectionTreeState<T>
  children?: ReactNode
}
