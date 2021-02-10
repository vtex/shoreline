import React, { useContext, createContext } from 'react'
import invariant from 'tiny-invariant'
import { ConditionProps, ConjunctionProps, FilterProps } from './index'

export interface HandleStateProps<T> {
  handleFilterChange: (filter: FilterProps<T>, index: number) => void
  handleConditionChange: (filter: ConditionProps, index: number) => void
  handleValueChange: (value: T, index: number) => void
  handleConjunctionChange: (conjunction: ConjunctionProps) => void
  handleDeleteStatement: (index: number) => void
  handleDuplicateStatement: (index: number) => void
}

const HandleStateContext = createContext<HandleStateProps<any> | null>(null)

export function useHandleStateContext() {
  const context = useContext(HandleStateContext)

  invariant(
    context,
    'Do not use handle changes functions without Handle Changes context'
  )

  return context
}

export function HandleStateProvider<T>(
  props: React.PropsWithChildren<HandleStateProps<T>>
) {
  const { children, ...restProps } = props

  return (
    <HandleStateContext.Provider value={restProps}>
      {children}
    </HandleStateContext.Provider>
  )
}
