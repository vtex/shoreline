import { BaseResolvers } from './resolvers/base'
import { Resolver } from './resolvers/core'

export interface FilterBarProps<T> {
  handleStatementChange: (conditions: ConditionsProps<T>) => void
  conjunction?: ConjunctionProps
  statements?: StatementProps<T>[]
  filters: FilterProps<T>[]
  label: string
  resolvers?: Record<string, Resolver<T>>
  dir?: 'rtl' | 'ltr'
}

export interface ConditionsProps<T> {
  statements: StatementProps<T>[]
  conjunction?: ConjunctionProps
}

export type ConjunctionProps = 'And' | 'Or'

export interface FilterProps<T, R = BaseResolvers<T>> {
  label: string
  conditions: ConditionProps[]
  resolver: R
}

export interface StatementProps<T, R = BaseResolvers<T>> {
  condition: ConditionProps
  value?: T
  filter: FilterProps<T, R>
}

export interface ConditionProps {
  label: string
  id: string
}
