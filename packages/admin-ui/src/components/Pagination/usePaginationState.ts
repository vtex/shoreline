import type { Dispatch } from 'react'
import { useCallback, useReducer } from 'react'

export function usePaginationState(
  params: UsePaginationParams
): UsePaginationReturn {
  const {
    size,
    paginationCallback = defaultPaginationCallback,
    paginationReducer = reducer,
    paginationInitialState,
  } = params

  const [state, dispatch] = useReducer(paginationReducer, {
    currentPage: 1,
    range: [1, size],
    ...paginationInitialState,
  })

  const paginate = useCallback(
    (type: PaginationActionType) => {
      paginationCallback({ type, dispatch, size, state })
    },
    [size, dispatch, paginationCallback]
  )

  return { ...state, paginate }
}

function defaultPaginationCallback({ type, size, dispatch }: PaginateParams) {
  dispatch({ type, tableSize: size })
}

function reducer(
  state: PaginationState,
  action: PaginationAction
): PaginationState {
  switch (action.type) {
    case 'next': {
      const newPage = state.currentPage + 1

      return {
        ...state,
        currentPage: state.currentPage + 1,
        range: [state.range[1] + 1, action.tableSize * newPage],
      }
    }

    case 'prev': {
      return {
        ...state,
        currentPage: state.currentPage - 1,
        range: [state.range[0] - action.tableSize, state.range[0] - 1],
      }
    }

    case 'reset': {
      return {
        ...state,
        currentPage: 1,
        range: [1, action.tableSize],
      }
    }

    default:
      return state
  }
}

export type PaginationActionType = 'next' | 'prev' | 'reset'

export interface PaginateParams {
  type: PaginationActionType
  dispatch: Dispatch<PaginationAction>
  size: number
  state: PaginationState
}

export interface UsePaginationParams {
  /**
   * Amount of itens that will be displayed in a page
   */
  size: number
  /**
   * Reducer used to handle state in usePagination hook
   */
  paginationReducer?: (
    state: PaginationState,
    action: PaginationAction
  ) => PaginationState
  /**
   * Callback triggered by pagination component
   */
  paginationCallback?: (params: PaginateParams) => void
  /**
   * Table pagination initial state
   */
  paginationInitialState?: PaginationState
}

export interface PaginationState {
  currentPage: number
  range: [number, number]
}

export interface PaginationAction {
  type: PaginationActionType
  tableSize: number
}

export interface UsePaginationReturn extends PaginationState {
  paginate: (type: PaginationActionType) => void
}
