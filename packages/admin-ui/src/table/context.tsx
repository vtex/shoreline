import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { TableState } from './hooks/use-table-state'

export const StateContext = createContext<TableState<any> | null>(null)

export function useStateContext() {
  const ctx = useContext(StateContext)

  invariant(
    ctx,
    'You must use Table composites in the right position, see: https://admin-ui-docs.vercel.app/data-display/data-grid/#composition'
  )

  return ctx
}
