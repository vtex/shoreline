import { useCallback, useReducer } from 'react'

export function usePaginationState(
  params: UsePaginationParams
): UsePaginationReturn {
  const {
    pageSize,
    initialPage = 1,
    total = pageSize,
    stateReducer = defaultReducer,
  } = params

  const [state, dispatch] = useReducer(
    stateReducer,
    getState(initialPage, pageSize, total)
  )

  const paginate = useCallback(
    (args: PaginationActionType) => {
      dispatch({ ...args, pageSize })
    },
    [pageSize, dispatch]
  )

  return { ...state, paginate }
}

export function checkDisabled(range: [number, number], total: number) {
  return {
    prevDisabled: range[0] <= 1,
    nextDisabled: range[1] >= total,
  }
}

export function setMax(value: number, max: number) {
  return value <= max ? value : max
}

export function getState(
  page: number,
  pageSize: number,
  total: number
): PaginationState {
  const range: [number, number] = [
    setMax((page - 1) * pageSize + 1, total),
    setMax(page * pageSize, total),
  ]

  return {
    currentPage: page,
    range,
    total,
    ...checkDisabled(range, total),
  }
}

export function defaultReducer(
  state: PaginationState,
  action: PaginationAction
): PaginationState {
  switch (action.type) {
    case 'next': {
      if (state.nextDisabled) return state

      return getState(state.currentPage + 1, action.pageSize, state.total)
    }

    case 'prev': {
      if (state.prevDisabled) return state

      return getState(state.currentPage - 1, action.pageSize, state.total)
    }

    case 'reset': {
      return getState(1, action.pageSize, state.total)
    }

    case 'navigate': {
      return getState(action.page, action.pageSize, state.total)
    }

    case 'setTotal': {
      return getState(state.currentPage, action.pageSize, action.total)
    }

    default:
      return state
  }
}

export type PaginationActionType =
  | {
      type: 'next' | 'prev' | 'reset'
    }
  | {
      type: 'setTotal'
      total: number
    }
  | {
      type: 'navigate'
      page: number
    }

export interface UsePaginationParams {
  /**
   * Amount of itens that will be displayed in a page
   */
  pageSize: number
  /**
   * Total of items that are being paginated
   * @default pageSize
   */
  total?: number
  /**
   * Inital page
   * @default 1
   */
  initialPage?: number
  /**
   * Reducer used to handle state in usePagination hook
   */
  stateReducer?: (
    state: PaginationState,
    action: PaginationAction
  ) => PaginationState
}

export interface PaginationState {
  currentPage: number
  range: [number, number]
  total: number
  prevDisabled: boolean
  nextDisabled: boolean
}

export type PaginationAction = PaginationActionType & {
  pageSize: number
}

export interface UsePaginationReturn extends PaginationState {
  paginate: (args: PaginationActionType) => void
}
