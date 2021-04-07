import { useCallback, useMemo } from 'react'
import { baseResolvers } from './resolvers/base'
import {
  Condition,
  Conjunction,
  FilterBarProps,
  Filter,
  Statement,
  Filters,
} from './typings'

export function useFilterBar<T>(props: FilterBarProps<T>) {
  const {
    statements = [],
    conjunction = 'And',
    filters,
    resolvers: defaultResolvers = baseResolvers<T>(),
    handleStatementChange: onStatementChange,
    ...restProps
  } = props

  const reducer = useCallback(
    (state: Filters<T>, action: Action<T>) => defaultReducer(state, action),
    [defaultReducer]
  )

  const handleStatementChange = useCallback(onStatementChange, [
    onStatementChange,
  ])

  const resolvers = useMemo(() => defaultResolvers, [defaultResolvers])

  return {
    reducer,
    statements,
    conjunction,
    filters,
    resolvers,
    handleStatementChange,
    ...restProps,
  }
}

function defaultReducer<T>(state: Filters<T>, action: Action<T>): Filters<T> {
  switch (action.type) {
    case 'conjunction': {
      const { conjunction, handleStatementChange } = action
      const { statements } = state

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'filter': {
      const { filter, handleStatementChange, index } = action
      const { conjunction, statements: currentStatements } = state

      let statements = currentStatements
      statements[index] = {
        condition: filter.conditions[0],
        filter,
        target: filter.resolver.defaultValue,
      }

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'condition': {
      const { condition, handleStatementChange, index } = action
      const { conjunction, statements } = state

      let nextState = statements
      nextState[index] = { ...statements[index], condition }

      handleStatementChange({ conjunction, statements: nextState })

      return { conjunction, statements: nextState }
    }
    case 'value': {
      const { value, handleStatementChange, index } = action
      const { conjunction, statements: currentStatements } = state

      let statements = currentStatements
      statements[index] = { ...currentStatements[index], target: value }

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'newStatement': {
      const { handleStatementChange, filter } = action
      const { conjunction, statements } = state

      const emptyStatement = {
        filter: filter,
        condition: filter.conditions[0],
        target: filter.resolver.defaultValue,
      } as Statement<T>

      const nextState = {
        conjunction,
        statements: [...statements, emptyStatement],
      }

      handleStatementChange(nextState)

      return nextState
    }
    case 'filtersReset': {
      const { handleStatementChange } = action

      const nextState = {
        conjunction: 'And',
        statements: [],
      } as Filters<T>

      handleStatementChange(nextState)

      return nextState
    }
    case 'duplicateStatement': {
      const { index, handleStatementChange } = action
      const { conjunction, statements } = state

      const duplicatedStatement = statements[index]

      const nextState = {
        conjunction,
        statements: [...statements, duplicatedStatement],
      }

      handleStatementChange(nextState)

      return nextState
    }
    case 'deleteStatement': {
      const { index, handleStatementChange } = action
      const { conjunction, statements } = state
      statements.splice(index, 1)

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
  }
}

export type Action<T> =
  | {
      type: 'conjunction'
      conjunction: Conjunction
      handleStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'filter'
      filter: Filter<T>
      index: number
      handleStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'condition'
      condition: Condition
      index: number
      handleStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'value'
      value: T
      index: number
      handleStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'newStatement'
      filter: Filter<T>
      handleStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'filtersReset'
      handleStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'duplicateStatement'
      index: number
      handleStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'deleteStatement'
      index: number
      handleStatementChange: (filters: Filters<T>) => void
    }
