import {
  Condition,
  Conjunction,
  Filter,
  ReducerFilters,
  Statement,
} from './typings'

export function defaultReducer<T>(
  state: ReducerFilters<T>,
  action: Action<T>
): ReducerFilters<T> {
  switch (action.type) {
    case 'conjunction': {
      const { conjunction } = action
      const { statements } = state

      const nextState = { conjunction, statements, applied: false }

      return nextState
    }
    case 'filter': {
      const { filter, index } = action

      const { conjunction, statements } = state
      statements[index] = {
        condition: filter.conditions[0],
        filter,
        target: filter.resolver.defaultValue,
      }

      const nextState = { conjunction, statements, applied: false }

      return nextState
    }
    case 'condition': {
      const { condition, index } = action
      const { conjunction, statements } = state

      statements[index] = { ...statements[index], condition }

      const nextState = { conjunction, statements, applied: false }

      return nextState
    }
    case 'value': {
      const { value, index } = action
      const { conjunction, statements } = state

      statements[index] = { ...statements[index], target: value }

      const nextState = { conjunction, statements, applied: false }

      return nextState
    }
    case 'newStatement': {
      const { filter } = action
      const { conjunction, statements } = state

      const emptyStatement: Statement<T> = {
        filter: filter,
        condition: filter.conditions[0],
        target: filter.resolver.defaultValue,
      }

      const nextState = {
        conjunction,
        statements: [...statements, emptyStatement],
        applied: false,
      }

      return nextState
    }
    case 'filtersReset': {
      const nextState: ReducerFilters<T> = {
        conjunction: 'And',
        statements: [],
        applied: false,
      }

      return nextState
    }
    case 'duplicateStatement': {
      const { index } = action
      const { conjunction, statements } = state

      const duplicatedStatement = statements[index]

      const nextState = {
        conjunction,
        statements: [...statements, duplicatedStatement],
        applied: false,
      }

      return nextState
    }
    case 'deleteStatement': {
      const { index } = action
      const { conjunction, statements } = state
      statements.splice(index, 1)

      const nextState = { conjunction, statements, applied: false }

      return nextState
    }
    case 'apply': {
      return { ...state, applied: true }
    }
  }
}

export type Action<T> =
  | {
      type: 'conjunction'
      conjunction: Conjunction
    }
  | {
      type: 'filter'
      filter: Filter<T>
      index: number
    }
  | {
      type: 'condition'
      condition: Condition
      index: number
    }
  | {
      type: 'value'
      value: T
      index: number
    }
  | {
      type: 'newStatement'
      filter: Filter<T>
    }
  | {
      type: 'filtersReset'
    }
  | {
      type: 'duplicateStatement'
      index: number
    }
  | {
      type: 'deleteStatement'
      index: number
    }
  | {
      type: 'apply'
    }
