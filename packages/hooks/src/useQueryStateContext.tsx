import type { ReactNode } from 'react'
import React, { useContext, useEffect, useState, createContext } from 'react'

import { isBrowser } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'

export interface QueryStateContextProps {
  queryParams: URLSearchParams
}

const QueryStateContext = createContext<QueryStateContextProps>({
  queryParams: new URLSearchParams(isBrowser ? window.location.search : ''),
})

export function useQueryStateContext() {
  const context = useContext(QueryStateContext)

  invariant(context, `Do not use useQueryState outside of QueryStateContext`)

  return context
}

export function QueryStateProvider({ children }: { children?: ReactNode }) {
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(isBrowser ? window.location.search : '')
  )

  useEffect(() => {
    if (!isBrowser) return
    window.onpopstate = function onPopstateChange() {
      setQueryParams(new URLSearchParams(window.location.search))
    }

    return () => {
      window.onpopstate = () => {}
    }
  }, [])

  return (
    <QueryStateContext.Provider value={{ queryParams }}>
      {children}
    </QueryStateContext.Provider>
  )
}
