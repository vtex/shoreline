import { useReducer, useCallback, Dispatch } from 'react'

const clearState: SortState = {
  by: undefined,
  order: undefined,
}

export function useTableSort<T>(params: UseTableSortParams<T>) {
  const {
    initialValue,
    directions = ['ASC', 'DSC'],
    reducer = sortReducer,
    sortCallback = defaultSortCallback,
  } = params

  const [state, dispatch] = useReducer(reducer, {
    ...clearState,
    ...initialValue,
  })

  const sort = useCallback(
    (id: keyof T) => {
      sortCallback({
        columnId: id,
        currentSortState: state,
        dispatch,
        directions,
      })
    },
    [state, dispatch, sortCallback, directions]
  )

  const resolveSorting = useCallback(
    (compareResult: number) => {
      if (state.order === directions[0]) {
        return compareResult
      }

      return compareResult * -1
    },
    [directions, state.order]
  )

  return { ...state, sort, resolveSorting }
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
  directions,
}: SortCallbackParams<T>) {
  const { by, order } = currentSortState
  if (!by || by !== columnId) {
    dispatch({ type: directions[0], payload: { id: columnId } })
  } else if (order === directions[0] && directions[1]) {
    dispatch({ type: directions[1], payload: { id: columnId } })
  } else {
    dispatch({ type: 'RESET' })
  }
}

export type SortOrder = 'ASC' | 'DSC'

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
  directions: SortDirections
}

export interface UseTableSortParams<T> {
  initialValue?: Partial<SortState>
  directions?: SortDirections
  reducer?(state: SortState, action: SortAction): SortState
  sortCallback?(params: SortCallbackParams<T>): void
}

export interface UseSortReturn extends SortState {
  sort(id: string | number | symbol): void
}
