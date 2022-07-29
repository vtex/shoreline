import type { FilterVisibilityStateReturn } from './filter-visibility-state'

export const FilterOptional = (props: FilterOptionalProps) => {
  const { state, id, children } = props

  const isVisible = state.visible.find((i) => i.id === id)

  return isVisible && children ? (children as React.ReactElement) : null
}

interface FilterOptionalProps {
  state: FilterVisibilityStateReturn
  id: string
  children?: React.ReactNode
}
