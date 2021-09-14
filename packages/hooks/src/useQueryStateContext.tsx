import type { ReactNode } from 'react'
import React, { useContext, useEffect, useState, createContext } from 'react'

import { isBrowser } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'

export interface QueryStateContextProps {
  queryParams: URLSearchParams
}

const QueryStateContext = createContext<QueryStateContextProps | null>(null)

export function useQueryStateContext() {
  const context = useContext(QueryStateContext)

  invariant(context, `Do not use useQueryState outside of QueryStateContext`)

  return context
}

export function QueryStateProvider({ children }: { children?: ReactNode }) {
  const context = useContext(QueryStateContext)
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(isBrowser ? window.location.search : '')
  )

  useEffect(() => {
    if (!isBrowser) return
    if (context) return

    function onPopstateChange() {
      setQueryParams(new URLSearchParams(window.location.search))
    }

    window.addEventListener('popstate', onPopstateChange)

    return () => {
      window.removeEventListener('popstate', onPopstateChange)
    }
  }, [])

  return (
    <QueryStateContext.Provider
      value={{ queryParams: context ? context.queryParams : queryParams }}
    >
      {children}
    </QueryStateContext.Provider>
  )
}
