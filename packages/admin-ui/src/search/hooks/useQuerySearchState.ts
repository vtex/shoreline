import type { ChangeEventHandler } from 'react'
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

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value)
    },
    []
  )

  const onClear = useCallback(() => {
    setValue('')
  }, [setValue])

  const getInputProps = () => {
    return { onClear, onChange, value: searchState.value }
  }

  return {
    ...searchState,
    setValue,
    getInputProps,
  }
}

export type UseQuerySearchStateParams = Omit<
  UseSearchStateParams,
  'initialValue'
>
