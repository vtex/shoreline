import { useMemo, useRef, useCallback } from 'react'
import { isBrowser } from '@vtex/admin-ui-util'
import { useQueryStateContext } from './useQueryStateContext'

/**
 * Persisted the keys states in the querry params (url)
 *
 * @example
 * const [initialState, setState, state] = usePersistedState({ keys: ['page', 'pageSize'] })
 */
export function useQueryState(
  params: UsePersistedStateParams
): [
  Record<string, string>,
  (v: Record<string, any>) => void,
  Record<string, any>
] {
  const { queryParams } = useQueryStateContext()

  const query: Record<string, string> = useMemo(() => {
    return params.keys.reduce(function (acc, curr) {
      return queryParams.get(curr)
        ? {
            ...acc,
            [curr]: queryParams.get(curr),
          }
        : acc
    }, {})
  }, [queryParams.toString()])

  const initialQuery = useRef<Record<string, string>>(
    params.keys.reduce(function (acc, curr) {
      return queryParams.get(curr)
        ? {
            ...acc,
            [curr]: queryParams.get(curr),
          }
        : acc
    }, {})
  )

  const setQuery = useCallback(
    (query: Record<string, string | undefined> = {}): void => {
      if (!isBrowser) return

      Object.entries(query).forEach((element: [string, string | undefined]) => {
        if (!element[1]) queryParams.delete(element[0])
        else queryParams.set(element[0], element[1])
      })
      const newurl = `${window.location.protocol}//${window.location.host}${
        window.location.pathname
      }?${queryParams.toString()}`

      window.history.pushState({ path: newurl }, '', newurl)
    },
    []
  )

  return [initialQuery.current, setQuery, query]
}

export type UsePersistedStateParams = {
  keys: string[]
}
