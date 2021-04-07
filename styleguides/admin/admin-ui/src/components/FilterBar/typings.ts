import { BaseResolvers } from './resolvers/base'
import { Resolver } from './resolvers/core'

export interface FilterBarProps<T> {
  handleStatementChange: (flters: Filters<T>) => void
  conjunction?: Conjunction
  statements?: Statement<T>[]
  filters: Filter<T>[]
  label: string
  resolvers?: Record<string, Resolver<T>>
}

export interface Filters<T> {
  statements: Statement<T>[]
  conjunction: Conjunction
}

export type Conjunction = 'And' | 'Or'

export interface Filter<T, R = BaseResolvers<T>> {
  label: string
  id: string
  conditions: Condition[]
  resolver: R
}

export type Statement<T, R = BaseResolvers<T>> = {
  condition: Condition
  filter: Filter<T, R>
  target: T
}
export interface Condition {
  label: string
  id: string
}
