import { useReducer, useCallback, Dispatch } from 'react'

const clearState: SortState = {
  by: undefined,
  order: undefined,
}

export function useTableSort<T>(params: UseTableSortParams<T>) {
  const {
    initialState,
    sortDirections = ['ASC', 'DSC'],
    reducer = sortReducer,
    manualSort,
  } = params

  const [sortState, dispatch] = useReducer(reducer, {
    ...clearState,
    ...initialState,
  })

  const sort = useCallback(
    (id: keyof T) => {
      if (manualSort) {
        manualSort({ currentSortState: sortState, dispatch, columnId: id })
        return
      }

      const { by, order } = sortState
      if (!by || by !== id) {
        dispatch({ type: sortDirections[0], payload: { id } })
      } else if (order === sortDirections[0] && sortDirections[1]) {
        dispatch({ type: sortDirections[1], payload: { id } })
      } else {
        dispatch({ type: 'CLEAR' })
      }
    },
    [sortState.by, sortState.order, dispatch, manualSort]
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
    dispatch({ type: 'CLEAR' })
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
    case 'CLEAR': {
      return clearState
    }
    default:
      return state
  }
}

type SortOrder = 'ASC' | 'DSC'

export type SortDirections = ['ASC', 'DSC'] | ['DSC', 'ASC'] | ['ASC' | 'DSC']

export interface SortState {
  order?: SortOrder
  by?: string | number | symbol
}

export interface SortAction {
  type: SortOrder | 'CLEAR'
  payload?: {
    id: string | number | symbol
  }
}

export interface ManualSortParams<T> {
  currentSortState: SortState
  dispatch: Dispatch<SortAction>
  columnId: keyof T
}

interface UseTableSortParams<T> {
  initialState?: Partial<SortState>
  sortDirections?: SortDirections
  reducer?(state: SortState, action: SortAction): SortState
  manualSort?(params: ManualSortParams<T>): void
}

export interface UseSortReturn {
  sortState: SortState
  sort(id: string | number | symbol): void
  clear(): void
}

export interface ManualSort<T> {
  reducer?(state: SortState, action: SortAction): SortState
  sort?(params: ManualSortParams<T>): void
}

export interface OnSortParams {
  columnId: string | number | symbol
  sortAction: SortOrder | 'CLEAR'
}
