import { SystemComponent } from '../../types'
import { BaseResolvers } from './resolvers/base'
import { Resolver } from './resolvers/core'

export interface FilterBarProps<T> extends SystemComponent {
  /** Handles the state of FilterBar statements */
  onApply: (filters: Filters<T>) => void
  /** FilterBar initial conjunction */
  conjunction?: Conjunction
  /** FilterBar initial statements */
  statements?: Statement<T>[]
  /** Filters available */
  filters: Filter<T>[]
  /** FilterBar label. It appears when there are no statements */
  label: string
  /**
   * FilterBar resolvers
   * @default baseResolvers<T>()
   */
  resolvers?: Record<string, Resolver<T>>
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

export type Conjunction = 'And' | 'Or'

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
