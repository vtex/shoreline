import { useCallback, useReducer } from 'react'
import { Action, defaultReducer } from './reducer'
import {
  Condition,
  Conjunction,
  Filter,
  ReducerFilters,
  UseFilterBarStateParams,
  UseFilterBarStateReturn,
} from './typings'

export function useFilterBarState<T>(
  params: UseFilterBarStateParams<T>
): UseFilterBarStateReturn<T> {
  const {
    conjunction: initialConjunction,
    statements: initialStatements = [],
    filters,
    onApply,
  } = params

  const reducer = useCallback(
    (state: ReducerFilters<T>, action: Action<T>) =>
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

  const newStatement = useCallback(() => {
    dispatch({
      type: 'newStatement',
      filter: filters[0],
    })
  }, [filters, dispatch])

  const apply = useCallback(
    () =>
      dispatch({
        type: 'apply',
      }),
    [dispatch]
  )

  const deleteStatement = useCallback(
    (index: number) =>
      dispatch({
        type: 'deleteStatement',
        index,
      }),
    [dispatch]
  )

  const duplicateStatement = (index: number) =>
    useCallback(
      () =>
        dispatch({
          type: 'duplicateStatement',
          index,
        }),
      [index]
    )

  const clearFilter = useCallback(
    () =>
      dispatch({
        type: 'filtersReset',
        conjunction: initialConjunction,
      }),
    [dispatch, initialConjunction]
  )

  const valueChange = useCallback(
    (value: T, index: number) =>
      dispatch({
        type: 'value',
        value,
        index,
      }),
    [dispatch]
  )

  const filterChange = (filter: Filter<T>, index: number) =>
    useCallback(
      () =>
        dispatch({
          type: 'filter',
          filter,
          index,
        }),
      [dispatch, filter]
    )

  const conditionChange = useCallback(
    (condition: Condition, index: number) =>
      dispatch({
        type: 'condition',
        condition: condition,
        index,
      }),
    [dispatch]
  )

  const conjunctionChange = useCallback(
    (conjunction: Conjunction) =>
      dispatch({
        type: 'conjunction',
        conjunction,
      }),
    [dispatch]
  )

  return {
    conjunction,
    statements,
    applied,
    filters,
    onApply,
    newStatement,
    deleteStatement,
    apply,
    duplicateStatement,
    clearFilter,
    valueChange,
    filterChange,
    conditionChange,
    conjunctionChange,
  }
}
