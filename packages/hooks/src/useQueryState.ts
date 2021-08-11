import { useMemo, useRef } from 'react'

/**
 * @example
 * const [initialState, setState, state] = usePersistedState({ type: 'query', keys: ['page', 'pageSize']})
 */
export function useQueryState(
  params: UsePersistedStateParams
): [
  Record<string, string>,
  (v: Record<string, any>) => void,
  Record<string, any>
] {
  const queryParams = new URLSearchParams(window.location.search)

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

  const setQuery = (query: Record<string, any> = {}): boolean => {
    Object.entries(query).forEach((element: [string, any]) => {
      queryParams.set(element[0], element[1])
    })
    const newurl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?${queryParams.toString()}`

    window.history.pushState({ path: newurl }, '', newurl)

    return true
  }

  return [initialQuery.current, setQuery, query]
}

export type UsePersistedStateParams = {
  keys: string[]
}
