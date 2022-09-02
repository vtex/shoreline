import { createContext, useContext } from 'react'

import type { DataViewState } from './data-view.state'

export const DataViewContext = createContext<DataViewState>({
  status: 'ready',
  statusObject: {
    loading: false,
    empty: null,
    error: null,
    notFound: null,
  },
  setStatus: () => null,
})

export function useDataViewContext() {
  const ctx = useContext(DataViewContext)

  return ctx
}
