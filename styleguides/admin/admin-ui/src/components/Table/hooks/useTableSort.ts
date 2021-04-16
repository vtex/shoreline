import { useReducer, useCallback } from 'react'

enum SortOrder {
  ASC = 'ASC',
  DSC = 'DSC',
}

enum ActionType {
  SortASC = 'SORT_ASC',
  SortDSC = 'SORT_DSC',
  Clear = 'CLEAR',
}

interface State {
  order?: SortOrder
  by?: string | number | symbol
}

interface Action {
  type: ActionType
  payload?: {
    id: string | number | symbol
  }
}

const clearState: State = {
  by: undefined,
  order: undefined,
}

export interface Sort {
  sorted: State
  sort: (id: string | number | symbol) => void
  clear: () => void
}

export function useTableSort(initialState?: Partial<State>) {
  const [sorted, dispatch] = useReducer(reducer, {
    ...clearState,
    ...initialState,
  })

  const sort = useCallback(
    (id: string | number | symbol) => {
      const { by, order } = sorted
      if (!by || by !== id) {
        dispatch({ type: ActionType.SortASC, payload: { id } })
      } else if (order === SortOrder.ASC) {
        dispatch({ type: ActionType.SortDSC, payload: { id } })
      } else {
        dispatch({ type: ActionType.Clear })
      }
    },
    [sorted, dispatch]
  )

  function clear() {
    dispatch({ type: ActionType.Clear })
  }

  return { sorted, sort, clear }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SortASC: {
      const { id } = action.payload ?? { id: undefined }
      return {
        by: id,
        order: SortOrder.ASC,
      }
    }
    case ActionType.SortDSC: {
      const { id } = action.payload ?? { id: undefined }
      return {
        by: id,
        order: SortOrder.DSC,
      }
    }
    case ActionType.Clear: {
      return clearState
    }
    default:
      return state
  }
}
