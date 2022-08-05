import type { MenuState } from 'ariakit'
import React, { useEffect, useState } from 'react'
import { FilterOptionalProvider } from './filter-optional-context'
import type { FilterVisibilityStateReturn } from './filter-visibility-state'

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
  state: FilterVisibilityStateReturn
  id: string
  label: string
  children?: React.ReactNode
}
