import type { MenuState } from 'ariakit'
import React, { useEffect, useState } from 'react'
import { FilterOptionalProvider } from './filter-optional-context'
import type { FilterVisibilityStateReturn } from './filter-visibility-state'

export const FilterOptional = (props: FilterOptionalProps) => {
  const { state, id, label, children } = props

  const [childMenuState, setChildMenuState] = useState<MenuState<any> | null>()

  const isVisible = state.visible.find((i) => i.id === id)
  const childMounted = !!childMenuState

  useEffect(() => {
    state.addFilter({ id, label })

    return () => state.removeFilter({ id, label })
  }, [])

  useEffect(() => {
    if (isVisible && childMenuState && state.shouldOpenOnMount(id)) {
      childMenuState.show()
    }
  }, [isVisible, childMounted])

  return isVisible && children ? (
    <FilterOptionalProvider value={{ setMenuState: setChildMenuState }}>
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
