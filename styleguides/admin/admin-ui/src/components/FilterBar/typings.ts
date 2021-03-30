import { BaseResolvers } from './resolvers/base'
import { Resolver } from './resolvers/core'

export interface FilterBarProps<T> {
  handleStatementChange: (statements: FilterStatements<T>) => void
  conjunction?: FilterConjunction
  statements?: FilterStatement<T>[]
  filters: FilterProps<T>[]
  label: string
  resolvers?: Record<string, Resolver<T>>
}

export interface FilterStatements<T> {
  statements: FilterStatement<T>[]
  conjunction?: FilterConjunction
}

export type FilterConjunction = 'And' | 'Or'

export interface FilterProps<T, R = BaseResolvers<T>> {
  label: string
  id: string
  conditions: FilterConditionProps[]
  resolver: R
}

export interface FilterStatement<T, R = BaseResolvers<T>> {
  condition: FilterConditionProps
  value?: T
  filter: FilterProps<T, R>
}

export interface FilterConditionProps {
  label: string
  id: string
}
