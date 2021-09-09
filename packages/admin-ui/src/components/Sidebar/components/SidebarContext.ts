import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import type { CompositeStateReturn } from 'reakit/Composite'

import type { SidebarState } from '../hooks/useSidebarState'

export const SidebarContext = createContext<SidebarState | null>(null)

export function useSidebarContext() {
  const ctx = useContext(SidebarContext)

  invariant(
    ctx,
    'You are trying to use a Sidebar composite outside of context. Check the render method of your Sidebar'
  )

  return ctx
}

const ItemContext = createContext<{
  id: string
  state: CompositeStateReturn
  selected: boolean
} | null>(null)

const { Provider } = ItemContext

export { Provider as ItemProvider }

export function useItemContext() {
  const ctx = useContext(ItemContext)

  invariant(
    ctx,
    'You are trying to use a SidebarItem composite outside of context. Check the render method of your SidebarItem'
  )

  return ctx
}
