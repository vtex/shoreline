import React, { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import { Resolver } from './resolvers/core'
import { Condition, Conjunction, Filter } from './typings'

export interface FilterBarContextProps<T> {
  /** Filters available */
  filters: Filter<T>[]
  /** FilterBar resolvers */
  resolvers: Record<string, Resolver<T>>
  /** Handles the state of the statement filter */
  handleFilterChange: (filter: Filter<T>, index: number) => void
  /** Handles the state of the statement condition */
  handleConditionChange: (filter: Condition, index: number) => void
  /** Handles the state of the statement value */
  handleValueChange: (value: T, index: number) => void
  /** Handles the state of FilterBar conjunction */
  handleConjunctionChange: (conjunction: Conjunction) => void
  /** Handles the state of the statement deletion */
  handleDeleteStatement: (index: number) => void
  /** Handles the state of the statement duplication */
  handleDuplicateStatement: (index: number) => void
}

const FilterBarContext = createContext<FilterBarContextProps<{}> | null>(null)

export function FilterBarProvider<T>(
  props: React.PropsWithChildren<FilterBarContextProps<T>>
) {
  const { children, ...restProps } = props

  return (
    <FilterBarContext.Provider value={restProps as any}>
      {children}
    </FilterBarContext.Provider>
  )
}

export function useFilterBarContext<T>() {
  const context = useContext<FilterBarContextProps<T>>(FilterBarContext as any)

  invariant(
    context,
    'You are trying to use FilterBar composite outside of context. Check the render method of your FilterBar'
  )

  return context
}
