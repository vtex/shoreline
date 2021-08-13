import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { SelectionTreeState } from './state'

export const SelectionTreeContext =
  createContext<SelectionTreeState<any> | null>(null)

export function useSelectionTreeContext() {
  const ctx = useContext(SelectionTreeContext)

  invariant(
    ctx,
    'SelectionTree composites shall not be used outside of context'
  )

  return ctx
}
