import React, { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import { Resolver } from './resolvers/core'
import { Condition, Conjunction, Filter } from './typings'

export interface FilterBarContextProps<T> {
  filters: Filter<T>[]
  resolvers: Record<string, Resolver<T>>
  handleFilterChange: (filter: Filter<T>, index: number) => void
  handleConditionChange: (filter: Condition, index: number) => void
  handleValueChange: (value: T, index: number) => void
  handleConjunctionChange: (conjunction: Conjunction) => void
  handleDeleteStatement: (index: number) => void
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

  invariant(context, 'context null')

  return context
}
