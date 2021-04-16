import { useReducer, useCallback } from 'react'

export function useTableSort(params: UseTableSortParams) {
  const {
    initialState,
    sortDirections = [SortOrder.ASC, SortOrder.DSC],
    onSort,
  } = params

  const [sortState, dispatch] = useReducer(reducer, {
    ...clearState,
    ...initialState,
  })

  const sort = useCallback(
    (id: string | number | symbol) => {
      const { by, order } = sortState
      if (!by || by !== id) {
        onSort?.({ columnId: id, sortAction: sortDirections[0] })
        dispatch({ type: sortDirections[0], payload: { id } })
      } else if (order === sortDirections[0] && sortDirections[1]) {
        onSort?.({ columnId: id, sortAction: sortDirections[0] })
        dispatch({ type: sortDirections[1], payload: { id } })
      } else {
        onSort?.({ columnId: id, sortAction: 'CLEAR' })
        dispatch({ type: 'CLEAR' })
      }
    },
    [sortState.by, sortState.order, dispatch]
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

function reducer(state: SortState, action: Action) {
  switch (action.type) {
    case 'ASC': {
      const { id } = action.payload ?? { id: undefined }
      return {
        by: id,
        order: SortOrder.ASC,
      }
    }
    case 'DSC': {
      const { id } = action.payload ?? { id: undefined }
      return {
        by: id,
        order: SortOrder.DSC,
      }
    }
    case 'CLEAR': {
      return clearState
    }
    default:
      return state
  }
}

enum SortOrder {
  ASC = 'ASC',
  DSC = 'DSC',
}

export type SortDirections =
  | [SortOrder.ASC, SortOrder.DSC]
  | [SortOrder.DSC, SortOrder.ASC]
  | [SortOrder.ASC | SortOrder.DSC]

export interface SortState {
  order?: SortOrder
  by?: string | number | symbol
}

interface Action {
  type: SortOrder | 'CLEAR'
  payload?: {
    id: string | number | symbol
  }
}

const clearState: SortState = {
  by: undefined,
  order: undefined,
}

export interface Sort {
  sortState: SortState
  sort: (id: string | number | symbol) => void
  clear: () => void
}

interface UseTableSortParams {
  initialState?: Partial<SortState>
  sortDirections?: SortDirections
  onSort?: (params: OnSortParams) => void
}

export interface OnSortParams {
  columnId: string | number | symbol
  sortAction: SortOrder | 'CLEAR'
}
