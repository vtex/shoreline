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
    reducer = defaultReducer,
    filters,
    onApply,
  } = params

  const memoizedReducer = useCallback(
    (state: ReducerFilters<T>, action: Action<T>) => reducer(state, action),
    [reducer]
  )

  const initialState = {
    conjunction: initialConjunction,
    statements: initialStatements,
    applied: true,
  }

  const [{ conjunction, statements, applied }, dispatch] = useReducer(
    memoizedReducer,
    initialState
  )

  const memoizedDispatch = useCallback((value: Action<T>) => dispatch(value), [
    dispatch,
  ])

  const addStatement = useCallback(
    () =>
      dispatch({
        type: 'newStatement',
        filter: filters[0],
      }),
    [dispatch, filters]
  )

  const resetFilters = useCallback(
    () =>
      dispatch({
        type: 'filtersReset',
        conjunction: initialConjunction,
      }),
    [dispatch, conjunction]
  )

  const applyFilters = () =>
    memoizedDispatch({
      type: 'apply',
    })

  const deleteStatement = (index: number) =>
    memoizedDispatch({
      type: 'deleteStatement',
      index,
    })

  const duplicateStatement = (index: number) =>
    memoizedDispatch({
      type: 'duplicateStatement',
      index,
    })

  const changeValue = (value: T, index: number) =>
    memoizedDispatch({
      type: 'value',
      value,
      index,
    })

  const changeFilter = (filter: Filter<T>, index: number) =>
    memoizedDispatch({
      type: 'filter',
      filter,
      index,
    })

  const changeCondition = (condition: Condition, index: number) =>
    memoizedDispatch({
      type: 'condition',
      condition: condition,
      index,
    })

  const changeConjunction = (conjunction: Conjunction) =>
    memoizedDispatch({
      type: 'conjunction',
      conjunction,
    })

  return {
    conjunction,
    statements,
    applied,
    filters,
    onApply,
    addStatement,
    deleteStatement,
    applyFilters,
    duplicateStatement,
    resetFilters,
    changeValue,
    changeFilter,
    changeCondition,
    changeConjunction,
  }
}
