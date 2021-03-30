import { Dispatch, useCallback, useReducer } from 'react'

export function usePagination(params: UsePaginationParams): PaginationObj {
  const {
    size,
    paginationReducer = reducer,
    paginationCallback = defaultPaginationCallback,
  } = params

  const [paginationState, dispatch] = useReducer(paginationReducer, {
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: size,
  })

  const paginate = useCallback(
    (type: 'next' | 'prev') => {
      paginationCallback({ type, dispatch, size })
    },
    [size, dispatch, paginationCallback]
  )

  return { paginationState, paginate }
}

function defaultPaginationCallback({ type, size, dispatch }: PaginateParams) {
  dispatch({ type: type, tableSize: size })
}

function reducer(state: PaginationState, action: PaginationAction) {
  switch (action.type) {
    case 'next': {
      const newPage = state.currentPage + 1

      return {
        ...state,
        currentPage: state.currentPage + 1,
        currentItemFrom: state.currentItemTo + 1,
        currentItemTo: action.tableSize * newPage,
      }
    }
    case 'prev': {
      return {
        ...state,
        currentPage: state.currentPage - 1,
        currentItemFrom: state.currentItemFrom - action.tableSize,
        currentItemTo: state.currentItemFrom - 1,
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
  manualPagination?: boolean
}

export interface PaginationState {
  currentPage: number
  currentItemFrom: number
  currentItemTo: number
}

export interface PaginationAction {
  type: 'next' | 'prev'
  tableSize: number
}

export interface PaginationObj {
  paginationState: PaginationState
  paginate: (type: 'next' | 'prev') => void
}
