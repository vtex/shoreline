import { Condition, Conjunction, Filter, Filters, Statement } from './typings'

export function defaultReducer<T>(
  state: Filters<T>,
  action: Action<T>
): Filters<T> {
  switch (action.type) {
    case 'conjunction': {
      const { conjunction, onStatementChange } = action
      const { statements } = state

      const nextState = { conjunction, statements }

      onStatementChange(nextState)

      return nextState
    }
    case 'filter': {
      const { filter, onStatementChange, index } = action

      const { conjunction, statements } = state
      statements[index] = {
        condition: filter.conditions[0],
        filter,
        target: filter.resolver.defaultValue,
      }

      const nextState = { conjunction, statements }

      onStatementChange(nextState)

      return nextState
    }
    case 'condition': {
      const { condition, onStatementChange, index } = action
      const { conjunction, statements } = state

      statements[index] = { ...statements[index], condition }

      const nextState = { conjunction, statements }

      onStatementChange(nextState)

      return nextState
    }
    case 'value': {
      const { value, onStatementChange, index } = action
      const { conjunction, statements } = state

      statements[index] = { ...statements[index], target: value }

      const nextState = { conjunction, statements }

      onStatementChange(nextState)

      return nextState
    }
    case 'newStatement': {
      const { onStatementChange, filter } = action
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

      onStatementChange(nextState)

      return nextState
    }
    case 'filtersReset': {
      const { onStatementChange } = action

      const nextState: Filters<T> = {
        conjunction: 'And',
        statements: [],
      }

      onStatementChange(nextState)

      return nextState
    }
    case 'duplicateStatement': {
      const { index, onStatementChange } = action
      const { conjunction, statements } = state

      const duplicatedStatement = statements[index]

      const nextState = {
        conjunction,
        statements: [...statements, duplicatedStatement],
      }

      onStatementChange(nextState)

      return nextState
    }
    case 'deleteStatement': {
      const { index, onStatementChange } = action
      const { conjunction, statements } = state
      statements.splice(index, 1)

      const nextState = { conjunction, statements }

      onStatementChange(nextState)

      return nextState
    }
  }
}

export type Action<T> =
  | {
      type: 'conjunction'
      conjunction: Conjunction
      onStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'filter'
      filter: Filter<T>
      index: number
      onStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'condition'
      condition: Condition
      index: number
      onStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'value'
      value: T
      index: number
      onStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'newStatement'
      filter: Filter<T>
      onStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'filtersReset'
      onStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'duplicateStatement'
      index: number
      onStatementChange: (filters: Filters<T>) => void
    }
  | {
      type: 'deleteStatement'
      index: number
      onStatementChange: (filters: Filters<T>) => void
    }
