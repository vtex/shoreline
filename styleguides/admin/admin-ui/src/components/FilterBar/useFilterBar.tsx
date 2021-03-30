import { useCallback, useMemo } from 'react'
import { baseResolvers } from './resolvers/base'
import {
  FilterConditionProps,
  FilterConjunction,
  FilterBarProps,
  FilterProps,
  FilterStatement,
  FilterStatements,
} from './typings'

export function useFilterBar<T>(props: FilterBarProps<T>) {
  const {
    statements = [],
    conjunction = 'And',
    filters,
    resolvers: defaultResolvers = baseResolvers<T>(),
    handleStatementChange: defaultHandleStatementChange,
    ...restProps
  } = props

  const reducer = useCallback(
    (state: FilterStatements<T>, action: Action<T>) =>
      defaultReducer(state, action),
    [defaultReducer]
  )

  const handleStatementChange = useCallback(defaultHandleStatementChange, [
    defaultHandleStatementChange,
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

function defaultReducer<T>(
  state: FilterStatements<T>,
  action: Action<T>
): FilterStatements<T> {
  switch (action.type) {
    case 'conjunction': {
      console.log('conjunction')
      const { conjunction, handleStatementChange } = action
      const { statements } = state

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'filter': {
      console.log('filter')
      const { filter, handleStatementChange, index } = action
      const { conjunction, statements: currentStatements } = state

      let statements = currentStatements
      statements[index] = {
        condition: filter.conditions[0],
        filter,
        value: filter.resolver.defaultValue,
      }

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'condition': {
      console.log('condition')
      const { condition, handleStatementChange, index } = action
      const { conjunction, statements } = state

      let nextState = statements
      nextState[index] = { ...statements[index], condition }

      handleStatementChange({ conjunction, statements: nextState })

      return { conjunction, statements: nextState }
    }
    case 'value': {
      console.log('value')
      const { value, handleStatementChange, index } = action
      const { conjunction, statements: currentStatements } = state

      let statements = currentStatements
      statements[index] = { ...currentStatements[index], value }

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'newStatement': {
      console.log('newStatement')
      const { handleStatementChange, filter } = action
      const { conjunction, statements } = state

      const emptyStatement = {
        filter: filter,
        condition: filter.conditions[0],
        value: filter.resolver.defaultValue,
      } as FilterStatement<T>

      const nextState = {
        conjunction,
        statements: [...statements, emptyStatement],
      }

      handleStatementChange(nextState)

      return nextState
    }
    case 'filtersReset': {
      console.log('filtersReset')
      const { handleStatementChange } = action

      const nextState = {
        conjunction: 'And',
        statements: [],
      } as FilterStatements<T>

      handleStatementChange(nextState)

      return nextState
    }
    case 'duplicateStatement': {
      console.log('duplicateStatement')
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
      console.log('deleteStatement')
      const { index, handleStatementChange } = action
      const { conjunction, statements } = state
      console.log('before', state)
      statements.splice(index, 1)
      console.log('after', statements)
      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
  }
}

export type Action<T> =
  | {
      type: 'conjunction'
      conjunction: FilterConjunction
      handleStatementChange: (statement: FilterStatements<T>) => void
    }
  | {
      type: 'filter'
      filter: FilterProps<T>
      index: number
      handleStatementChange: (statement: FilterStatements<T>) => void
    }
  | {
      type: 'condition'
      condition: FilterConditionProps
      index: number
      handleStatementChange: (statement: FilterStatements<T>) => void
    }
  | {
      type: 'value'
      value?: T
      index: number
      handleStatementChange: (statement: FilterStatements<T>) => void
    }
  | {
      type: 'newStatement'
      filter: FilterProps<T>
      handleStatementChange: (statement: FilterStatements<T>) => void
    }
  | {
      type: 'filtersReset'
      handleStatementChange: (statement: FilterStatements<T>) => void
    }
  | {
      type: 'duplicateStatement'
      index: number
      handleStatementChange: (statement: FilterStatements<T>) => void
    }
  | {
      type: 'deleteStatement'
      index: number
      handleStatementChange: (statement: FilterStatements<T>) => void
    }
