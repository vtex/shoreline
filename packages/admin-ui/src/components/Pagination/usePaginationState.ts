import { useCallback, useReducer } from 'react'

export function usePaginationState(
  params: UsePaginationParams
): UsePaginationReturn {
  const {
    pageSize,
    initialPage = 1,
    total,
    stateReducer = defaultReducer,
  } = params

  const [state, dispatch] = useReducer(
    stateReducer,
    getInitialState(initialPage, pageSize, total)
  )

  const paginate = useCallback(
    (type: PaginationActionType) => {
      dispatch({ type, pageSize })
    },
    [pageSize, dispatch]
  )

  return { ...state, paginate }
}

function checkDisabled(range: [number, number], total: number) {
  return {
    prevDisabled: range[0] <= 1,
    nextDisabled: range[1] >= total,
  }
}

function setMax(value: number, max: number) {
  return value <= max ? value : max
}

function getInitialState(
  initialPage: number,
  pageSize: number,
  total: number
): PaginationState {
  const range: [number, number] = [
    setMax((initialPage - 1) * pageSize + 1, total),
    setMax(initialPage * pageSize, total),
  ]

  return {
    currentPage: initialPage,
    range,
    total,
    ...checkDisabled(range, total),
  }
}

function defaultReducer(
  state: PaginationState,
  action: PaginationAction
): PaginationState {
  switch (action.type) {
    case 'next': {
      const newPage = state.currentPage + 1

      const draft: PaginationState = {
        ...state,
        currentPage: state.currentPage + 1,
        range: [
          setMax(state.range[1] + 1, state.total),
          setMax(action.pageSize * newPage, state.total),
        ],
      }

      return {
        ...draft,
        ...checkDisabled(draft.range, draft.total),
      }
    }

    case 'prev': {
      const draft: PaginationState = {
        ...state,
        currentPage: state.currentPage - 1,
        range: [
          setMax(state.range[0] - action.pageSize, state.total),
          setMax(state.range[0] - 1, state.total),
        ],
      }

      return {
        ...draft,
        ...checkDisabled(draft.range, draft.total),
      }
    }

    case 'reset': {
      const draft: PaginationState = {
        ...state,
        currentPage: 1,
        range: [setMax(1, state.total), setMax(action.pageSize, state.total)],
      }

      return {
        ...draft,
        ...checkDisabled(draft.range, draft.total),
      }
    }

    default:
      return state
  }
}

export type PaginationActionType = 'next' | 'prev' | 'reset'

export interface UsePaginationParams {
  /**
   * Amount of itens that will be displayed in a page
   */
  pageSize: number
  /**
   * Total of items that are being paginated
   */
  total: number
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

export interface PaginationAction {
  type: PaginationActionType
  pageSize: number
}

export interface UsePaginationReturn extends PaginationState {
  paginate: (type: PaginationActionType) => void
}
