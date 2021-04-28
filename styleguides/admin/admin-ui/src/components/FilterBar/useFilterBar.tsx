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

      const emptyStatement: Statement<T> = {
        filter: filter,
        condition: filter.conditions[0],
        target: filter.resolver.defaultValue,
      }

      const nextState = {
        conjunction,
        statements: [...statements, emptyStatement],
      }

      handleStatementChange(nextState)

      return nextState
    }
    case 'filtersReset': {
      const { handleStatementChange } = action

      const nextState: Filters<T> = {
        conjunction: 'And',
        statements: [],
      }

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

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type Action<T> = XOR<
  {
    type: 'conjunction'
    conjunction: Conjunction
    handleStatementChange: (filters: Filters<T>) => void
  },
  XOR<
    {
      type: 'filter'
      filter: Filter<T>
      index: number
      handleStatementChange: (filters: Filters<T>) => void
    },
    XOR<
      {
        type: 'condition'
        condition: Condition
        index: number
        handleStatementChange: (filters: Filters<T>) => void
      },
      XOR<
        {
          type: 'value'
          value: T
          index: number
          handleStatementChange: (filters: Filters<T>) => void
        },
        XOR<
          {
            type: 'newStatement'
            filter: Filter<T>
            handleStatementChange: (filters: Filters<T>) => void
          },
          XOR<
            {
              type: 'filtersReset'
              handleStatementChange: (filters: Filters<T>) => void
            },
            XOR<
              {
                type: 'duplicateStatement'
                index: number
                handleStatementChange: (filters: Filters<T>) => void
              },
              {
                type: 'deleteStatement'
                index: number
                handleStatementChange: (filters: Filters<T>) => void
              }
            >
          >
        >
      >
    >
  >
>
