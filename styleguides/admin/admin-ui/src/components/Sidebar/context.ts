import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import { AnchorDirection, Item } from './utils'

const SidebarContext = createContext<{
  direction: AnchorDirection
  currentItem: Item | null
  collapse: boolean | null
  selectedItemsMemory: Item[]
  setCurrentItem: (currentItem: Item | null) => void
  setCollapse: (state: boolean | null) => void
  setSelectedItemsMemory: (items: Item[]) => void
} | null>(null)

export function useSidebarContext() {
  const context = useContext(SidebarContext)

  invariant(context, 'You must use Sidebar composites inside Sidebar context!')

  return context
}

const { Provider } = SidebarContext

export { Provider as SidebarProvider }
