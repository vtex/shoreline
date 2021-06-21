import { Dispatch } from 'react'
import { SystemComponent } from '../../types'
import { Action } from './reducer'
import { BaseResolvers } from './resolvers/base'
import { Resolver } from './resolvers/core'

export interface FilterBarProps<T, V extends { value: T }>
  extends SystemComponent {
  /** Handles the state of FilterBar statements */
  onApply: (filters: Filters<T, V>) => void
  conjunctions: Conjunction[]
  /** Filters available */
  filters: Filter<T, V>[]
  /** FilterBar label. It appears when there are no statements */
  label: string
  /**
   * FilterBar resolvers
   * @default baseResolvers<T, V>()
   */
  resolvers?: Record<string, Resolver<T, V>>
  /** Set of labels used internally */
  internalLabels: InternalLabels

  filterBarState: UseFilterBarStateReturn<T, V>
}

export interface UseFilterBarStateParams<T, V extends { value: T }> {
  /** FilterBar initial conjunction */
  conjunction: Conjunction
  /** FilterBar initial statements */
  statements?: Statement<T, V>[]
}

export interface UseFilterBarStateReturn<T, V extends { value: T }> {
  conjunction: Conjunction
  statements: Statement<T, V>[]
  applied: boolean
  dispatch: Dispatch<Action<T, V>>
  initialConjunction: Conjunction
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
export interface Filters<T, V extends { value: T }> {
  /** FilterBar statements */
  statements: Statement<T, V>[]
  /** FilterBar conjunction */
  conjunction: Conjunction
}

export interface ReducerFilters<T, V extends { value: T }>
  extends Filters<T, V> {
  /** Whether current filters are applied or not */
  applied: boolean
}

export type Conjunction = {
  /** Conjunction label */
  label: string
  /** Conjunction value */
  value: 'and' | 'or'
}

export interface Filter<T, V extends { value: T }, R = BaseResolvers<T, V>> {
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
export type Statement<T, V extends { value: T }, R = BaseResolvers<T, V>> = {
  /** Statement condition */
  condition: Condition
  /** Statement Filter */
  filter: Filter<T, V, R>
  /** Statement value */
  target: V
}

export interface Condition {
  label: string
  id: string
}
