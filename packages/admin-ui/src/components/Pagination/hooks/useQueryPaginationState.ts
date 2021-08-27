import { useEffect, useState } from 'react'
import { useQueryState } from '@vtex/admin-ui-hooks'
import type {
  PaginationAction,
  PaginationState,
  UsePaginationParams,
  UsePaginationReturn,
} from './usePaginationState'
import { defaultReducer, usePaginationState } from './usePaginationState'

export function useQueryPaginationState(
  props: UsePersistedPaginationStateProps
): UsePaginationReturn {
  const { stateReducer, ...usePaginationProps } = props

  const [paginationChanged, setPaginationChanged] = useState(false)

  const [initialQuery, setQuery, query] = useQueryState({
    keys: ['page'],
  })

  const handleReducer: (
    state: PaginationState,
    action: PaginationAction
  ) => PaginationState = (state, action) => {
    setPaginationChanged(true)

    return stateReducer
      ? stateReducer(state, action)
      : defaultReducer(state, action)
  }

  const initialPage = initialQuery.page ? parseInt(initialQuery.page, 10) : 1

  const paginationState = usePaginationState({
    ...usePaginationProps,
    initialPage,
    stateReducer: handleReducer,
  })

  useEffect(() => {
    if (paginationState.currentPage === parseInt(query.page, 10)) {
      setPaginationChanged(false)

      return
    }

    if (paginationChanged) {
      setPaginationChanged(false)
      setQuery({
        page: paginationState.currentPage,
      })
    } else if (query.page) {
      paginationState.paginate({
        type: 'navigate',
        page: parseInt(query.page, 10),
      })
      setPaginationChanged(false)
    }
  }, [paginationState.currentPage, query.page])

  return paginationState
}

export type UsePersistedPaginationStateProps = Omit<
  UsePaginationParams,
  'initialPage'
>
