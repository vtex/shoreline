import { Dispatch, useCallback, useReducer } from 'react'

export function usePagination(
  params: UsePaginationParams
): UsePaginationReturn {
  const {
    size,
    paginationCallback = defaultPaginationCallback,
    paginationReducer = reducer,
    paginationInitialState,
  } = params

  const [state, dispatch] = useReducer(paginationReducer, {
    ...paginationInitialState,
    currentPage: 1,
    range: [1, size],
  })

  const paginate = useCallback(
    (type: 'next' | 'prev') => {
      paginationCallback({ type, dispatch, size, state })
    },
    [size, dispatch, paginationCallback]
  )

  return { state, paginate }
}

function defaultPaginationCallback({ type, size, dispatch }: PaginateParams) {
  dispatch({ type: type, tableSize: size })
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
    default:
      return state
  }
}

export interface PaginateParams {
  type: 'next' | 'prev'
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
   * Decides if pagination is dealed by table or it's user
   */
  manualPagination?: [number, number]
  /**
   * Table pagination initial state
   */
  paginationInitialState?: PaginationState
  /**
   * Prop used in case the array doesn't contain the full amount of itens
   */
  totalAmountOfItems?: number
}

export interface PaginationState {
  currentPage: number
  range: [number, number]
}

export interface PaginationAction {
  type: 'next' | 'prev'
  tableSize: number
}

export interface UsePaginationReturn {
  state: PaginationState
  paginate: (type: 'next' | 'prev') => void
}
