import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'
import { isElement } from 'react-is'

import type { CompositeStateReturn } from '../components/Aria'
import { useCompositeState } from '../components/Aria'
import { useReducedState } from './useReducedState'

export function useSidebarState(): SidebarState {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const layout = useReducedState()

  const composite = useCompositeState({
    baseId: 'sidebar-root--',
    orientation: 'vertical',
    wrap: 'vertical',
    loop: true,
  })

  const isSelected = useCallback(
    (uniqueKey: string | number) =>
      uniqueKey === selectedItem?.uniqueKey ?? false,
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
  /** Checks whether the state is reduced or not */
  isReduced: () => boolean
  /** Checks whether an item is selected or not */
  isSelected: (item: string | number) => boolean
  /** The selected item */
  selectedItem: Item | null
  /** Sets the selected item */
  setSelectedItem: (newItem: Item | null) => void
  /** Checks whether a sidebar item is expandable or not */
  isExpandable: (children: ReactNode) => boolean
  /**
   * Sidebar's layout controller interface.
   * See `useReducedState` for more information on this.
   */
  layout: ReturnType<typeof useReducedState>
  /**
   * Sidebar's root composite state.
   * This allows accessible navigation through the Sidebar.
   */
  composite: CompositeStateReturn
}
