import { useCallback, useReducer } from 'react'

interface PaginationState {
  currentPage: number
  currentItemFrom: number
  currentItemTo: number
}

interface PaginationAction {
  type: 'next' | 'prev'
  tableSize: number
}

export interface PaginationObj {
  paginationState: PaginationState
  paginate: (type: 'next' | 'prev') => void
}

export function usePagination(size: number): PaginationObj {
  const [paginationState, dispatch] = useReducer(reducer, {
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: size,
  })

  const paginate = useCallback(
    (type: 'next' | 'prev') => {
      dispatch({ type: type, tableSize: size })
    },
    [size, dispatch]
  )

  return { paginationState, paginate }
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
