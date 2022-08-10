import React, { useEffect } from 'react'
import { FilterOptionalProvider } from './filter-optional-context'
import type { FilterControlState } from './filter-control-state'

export const FilterOptional = (props: FilterOptionalProps) => {
  const { state, id, label, children } = props

  const isVisible = state.visible.find((i) => i.id === id)

  useEffect(() => {
    state.addFilter({ id, label })

    return () => state.removeFilter({ id, label })
  }, [])

  return isVisible && children ? (
    <FilterOptionalProvider
      value={{ shouldOpenOnMount: () => state.shouldOpenOnMount(id) }}
    >
      {children}
    </FilterOptionalProvider>
  ) : null
}

interface FilterOptionalProps {
  state: FilterControlState
  id: string
  label: string
  children?: React.ReactNode
}
