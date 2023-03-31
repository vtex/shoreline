import type { ReactNode } from 'react'
import React from 'react'

import type { SelectionTreeState } from './selection-tree-state'
import { SelectionTreeContext } from './selection-tree-context'

/**
 * SelectionTree context
 * @example
 * const state = useSelectionTreeState({
 *  items: []
 * })
 *
 * <SelectionTree state={state} />
 */
export function SelectionTree<T>(props: SelectionTreeProps<T>) {
  const { state, children } = props

  return (
    <SelectionTreeContext.Provider value={state}>
      {children}
    </SelectionTreeContext.Provider>
  )
}

interface SelectionTreeProps<T> {
  state: SelectionTreeState<T>
  children?: ReactNode
}
