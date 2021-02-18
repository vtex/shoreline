import { useCallback, useMemo } from 'react'
import { baseResolvers } from './resolvers/base'
import {
  ConditionProps,
  ConjunctionProps,
  FilterBarProps,
  FilterProps,
  StatementProps,
  StatementsProps,
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
    (state: StatementsProps<T>, action: Action<T>) =>
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
  state: StatementsProps<T>,
  action: Action<T>
): StatementsProps<T> {
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
      statements[index] = { ...currentStatements[index], filter }

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
      statements[index] = { ...currentStatements[index], value }

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
      } as StatementProps<T>

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
      } as StatementsProps<T>

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
      conjunction: ConjunctionProps
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'filter'
      filter: FilterProps<T>
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'condition'
      condition: ConditionProps
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'value'
      value?: T
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'newStatement'
      filter: FilterProps<T>
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'filtersReset'
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'duplicateStatement'
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'deleteStatement'
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
