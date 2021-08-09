import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { DataViewState } from './state'

export const DataViewContext = createContext<DataViewState | null>(null)

export function useDataViewContext() {
  const ctx = useContext(DataViewContext)

  invariant(
    ctx,
    'Make sure that you are under the DataView component, see: https://admin-ui-docs.vercel.app/data-display/data-view'
  )

  return ctx
}
