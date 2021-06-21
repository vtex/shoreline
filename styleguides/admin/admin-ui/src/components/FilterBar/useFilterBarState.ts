import { useCallback, useReducer } from 'react'
import { Action, defaultReducer } from './reducer'
import {
  ReducerFilters,
  UseFilterBarStateParams,
  UseFilterBarStateReturn,
} from './typings'

export function useFilterBarState<T, V extends { value: T }>(
  params: UseFilterBarStateParams<T, V>
): UseFilterBarStateReturn<T, V> {
  const {
    conjunction: initialConjunction,
    statements: initialStatements = [],
  } = params

  const reducer = useCallback(
    (state: ReducerFilters<T, V>, action: Action<T, V>) =>
      defaultReducer(state, action),
    [defaultReducer]
  )

  const initialState = {
    conjunction: initialConjunction,
    statements: initialStatements,
    applied: true,
  }

  const [{ conjunction, statements, applied }, dispatch] = useReducer(
    reducer,
    initialState
  )

  return {
    conjunction,
    statements,
    applied,
    dispatch,
    initialConjunction,
  }
}
