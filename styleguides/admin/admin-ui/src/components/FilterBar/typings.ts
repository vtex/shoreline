import { SystemComponent } from '../../types'
import { Action } from './reducer'
import { BaseResolvers } from './resolvers/base'
import { Resolver } from './resolvers/core'

export interface FilterBarProps<T, V extends { value: T }>
  extends SystemComponent {
  conjunctions: Conjunction[]
  /** FilterBar label. It appears when there are no statements */
  label: string
  /**
   * FilterBar resolvers
   * @default baseResolvers<T, V>()
   */
  resolvers?: Record<string, Resolver<V>>
  /** Set of labels used internally */
  internalLabels: InternalLabels
  /** Component state */
  state: UseFilterBarStateReturn<V>
}

export interface UseFilterBarStateParams<T> {
  /** FilterBar initial conjunction */
  conjunction: Conjunction
  /** FilterBar initial statements */
  statements?: Statement<T>[]
  /** Filters available */
  filters: Filter<T>[]
  /** Handles the state of FilterBar statements */
  onApply: (filters: Filters<T>) => void
  /**
   * Accepts custom reducer to be used in the component's useReducer.
   * If no reducer is provided the default component reducer will be used
   */
  reducer?: (state: ReducerFilters<T>, action: Action<T>) => ReducerFilters<T>
}

export interface UseFilterBarStateReturn<T> {
  conjunction: Conjunction
  statements: Statement<T>[]
  applied: boolean
  filters: Filter<T>[]
  onApply: (filters: Filters<T>) => void
  newStatement: () => void
  apply: () => void
  deleteStatement: (index: number) => void
  duplicateStatement: (index: number) => void
  filtersReset: () => void
  valueChange: (value: T, index: number) => void
  filterChange: (filter: Filter<T>, index: number) => void
  conditionChange: (condition: Condition, index: number) => void
  conjunctionChange: (conjunction: Conjunction) => void
}

export interface InternalLabels {
  /**
   * Conjunction dropdown aria-label
   */
  conjunctionLabel: string
  /**
   * Filter dropdown aria-label
   */
  filterLabel: string
  /**
   * Condition dropdown aria-label
   */
  conditionLabel: string
  /**
   * Statement menu aria-label
   */
  statementMenuLabel: string
  /**
   * Add filter button label
   */
  addFilterLabel: string
  /**
   * Apply filter button label
   */
  applyFilterLabel: string
  /**
   * Clear filter button label
   */
  clearFilterLabel: string
  /**
   * Duplicate statement button label
   */
  duplicateStatementLabel: string
  /**
   * Delete statement button label
   */
  deleteStatementLabel: string
  /**
   * First statement conjunction label
   */
  whereStatementLabel: string
}
export interface Filters<T> {
  /** FilterBar statements */
  statements: Statement<T>[]
  /** FilterBar conjunction */
  conjunction: Conjunction
}

export interface ReducerFilters<T> extends Filters<T> {
  /** Whether current filters are applied or not */
  applied: boolean
}

export type Conjunction = {
  /** Conjunction label */
  label: string
  /** Conjunction value */
  value: 'and' | 'or'
}

export interface Filter<T, R = BaseResolvers<T>> {
  /** Filter label */
  label: string
  /** Filter id */
  id: string
  /** Filter conditions */
  conditions: Condition[]
  /** Filter resolver */
  resolver: R
}

/**
 * Statement is a combination of a filter, a condition and a value.
 */
export type Statement<T, R = BaseResolvers<T>> = {
  /** Statement condition */
  condition: Condition
  /** Statement Filter */
  filter: Filter<T, R>
  /** Statement value */
  target: T
}

export interface Condition {
  label: string
  id: string
}
