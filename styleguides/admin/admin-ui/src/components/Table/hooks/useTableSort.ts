import { useReducer, useCallback, Dispatch } from 'react'

const clearState: SortState = {
  by: undefined,
  order: undefined,
}

export function useTableSort<T>(params: UseTableSortParams<T>) {
  const {
    sortInitialValue,
    sortDirections = ['ASC', 'DSC'],
    reducer = sortReducer,
    manualSort: sortCallback = defaultSortCallback,
  } = params

  const [sortState, dispatch] = useReducer(reducer, {
    ...clearState,
    ...sortInitialValue,
  })

  const sort = useCallback(
    (id: keyof T) => {
      sortCallback({
        columnId: id,
        currentSortState: sortState,
        dispatch,
        sortDirections,
      })
    },
    [sortState, dispatch, sortCallback, sortDirections]
  )

  const resolveSorting = useCallback(
    (compareResult: number) => {
      if (sortState.order === sortDirections[0]) {
        return compareResult
      }

      return compareResult * -1
    },
    [sortDirections, sortState.order]
  )

  function clear() {
    dispatch({ type: 'RESET' })
  }

  return { sortState, sort, clear, resolveSorting }
}

function sortReducer(state: SortState, action: SortAction) {
  switch (action.type) {
    case 'ASC':
    case 'DSC': {
      const { id } = action.payload ?? { id: undefined }
      return {
        by: id,
        order: action.type,
      }
    }
    case 'RESET': {
      return clearState
    }
    default:
      return state
  }
}

function defaultSortCallback<T>({
  currentSortState,
  columnId,
  dispatch,
  sortDirections,
}: SortCallbackParams<T>) {
  const { by, order } = currentSortState
  if (!by || by !== columnId) {
    dispatch({ type: sortDirections[0], payload: { id: columnId } })
  } else if (order === sortDirections[0] && sortDirections[1]) {
    dispatch({ type: sortDirections[1], payload: { id: columnId } })
  } else {
    dispatch({ type: 'RESET' })
  }
}

type SortOrder = 'ASC' | 'DSC'

export type SortDirections = ['ASC', 'DSC'] | ['DSC', 'ASC'] | ['ASC' | 'DSC']

export interface SortState {
  order?: SortOrder
  by?: string | number | symbol
}

export interface SortAction {
  type: SortOrder | 'RESET'
  payload?: {
    id: string | number | symbol
  }
}

export interface SortCallbackParams<T> {
  currentSortState: SortState
  dispatch: Dispatch<SortAction>
  columnId: keyof T
  sortDirections: SortDirections
}

export interface UseTableSortParams<T> {
  sortInitialValue?: Partial<SortState>
  sortDirections?: SortDirections
  reducer?(state: SortState, action: SortAction): SortState
  manualSort?(params: SortCallbackParams<T>): void
}

export interface UseSortReturn {
  sortState: SortState
  sort(id: string | number | symbol): void
  clear(): void
}

export interface ManualSort<T> {
  reducer?(state: SortState, action: SortAction): SortState
  sort?(params: SortCallbackParams<T>): void
}

export interface OnSortParams {
  columnId: string | number | symbol
  sortAction: SortOrder | 'RESET'
}
