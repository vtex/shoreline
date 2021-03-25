import { ReactNode, useCallback, useState } from 'react'
import { isElement } from 'react-is'

import { useCompositeState, CompositeStateReturn } from '../components/Aria'
import { useReducedState } from './useReducedState'

export function useSidebarState(): SidebarState {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const layout = useReducedState()

  const composite = useCompositeState({
    baseId: 'sidebar-menu-base-id--',
    orientation: 'vertical',
    wrap: 'vertical',
    loop: true,
  })

  const isSelected = useCallback(
    (unk: string | number) => unk === selectedItem?.uniqueKey ?? false,
    [selectedItem]
  )

  const isExpandable = useCallback((children: ReactNode) => {
    if (!children) return false

    return (
      Array.isArray(children) &&
      children.some(
        (child) =>
          isElement(child) &&
          child.props.children &&
          Array.isArray(child.props.children) &&
          child.props.children.length > 0
      )
    )
  }, [])

  const isReduced = useCallback(() => {
    if (!selectedItem) return false
    const { expandable } = selectedItem

    return (expandable && layout.reduced) || !expandable
  }, [selectedItem, layout.reduced])

  return {
    isSelected,
    selectedItem,
    setSelectedItem,
    isExpandable,
    layout,
    composite,
    isReduced,
  }
}

export interface Item {
  uniqueKey: string | number
  expandable: boolean
}

export interface SidebarState {
  /** if hte state is reduced or not */
  isReduced: () => boolean
  isSelected: (item: string | number) => boolean
  selectedItem: Item | null
  setSelectedItem: (newItem: Item | null) => void
  isExpandable: (children: ReactNode) => boolean
  layout: ReturnType<typeof useReducedState>
  composite: CompositeStateReturn
}
