import { useCallback, useEffect, useState } from 'react'
import { useQueryState } from '@vtex/admin-ui-hooks'
import type { UseSearchStateParams, SearchFormState } from './useSearchState'
import { useSearchState } from './useSearchState'

export function useQuerySearchState(
  props: UseQuerySearchStateParams
): SearchFormState {
  const [searchChanged, setSearchChanged] = useState(false)

  const [initialQuery, setQuery, query] = useQueryState({
    keys: ['search'],
  })

  const initialValue = initialQuery.search ?? ''

  const searchState = useSearchState({
    ...props,
    initialValue,
  })

  useEffect(() => {
    if (searchState.debouncedValue === query.search) {
      setSearchChanged(false)

      return
    }

    if (searchChanged) {
      setSearchChanged(false)
      setQuery({
        search:
          searchState.debouncedValue !== ''
            ? searchState.debouncedValue
            : undefined,
      })
    } else if (query.search) {
      searchState.setValue(query.search)
      setSearchChanged(false)
    }
  }, [searchState.debouncedValue, query.search])

  const setValue = useCallback(
    (value: string) => {
      setSearchChanged(true)
      searchState.setValue(value)
    },
    [searchState.setValue]
  )

  const clear = useCallback(() => {
    setSearchChanged(true)
    searchState.clear()
  }, [searchState.clear])

  return {
    ...searchState,
    setValue,
    clear,
  }
}

export type UseQuerySearchStateParams = Omit<
  UseSearchStateParams,
  'initialValue'
>
