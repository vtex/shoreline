import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { DataGridState } from './hooks/useDataGridState'

export const StateContext = createContext<DataGridState<any> | null>(null)

export function useStateContext() {
  const ctx = useContext(StateContext)

  invariant(
    ctx,
    'You must use DataGrid composites in the right position, see: https://admin-ui-docs.vercel.app/data-display/data-grid/#composition'
  )

  return ctx
}
