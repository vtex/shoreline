import React, { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import { Resolver } from './resolvers/core'
import { FilterConditionProps, FilterConjunction, FilterProps } from './typings'

export interface FilterBarContextProps<T> {
  filters: FilterProps<T>[]
  resolvers: Record<string, Resolver<T>>
  handleFilterChange: (filter: FilterProps<T>, index: number) => void
  handleConditionChange: (filter: FilterConditionProps, index: number) => void
  handleValueChange: (value: T | undefined, index: number) => void
  handleConjunctionChange: (conjunction: FilterConjunction) => void
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
