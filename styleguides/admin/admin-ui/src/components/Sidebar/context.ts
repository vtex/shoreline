import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import { CornerScope } from './utils'

export interface SidebarCurrentItem {
  scope: CornerScope
  index: number
}

const SidebarContext = createContext<{
  currentItem: SidebarCurrentItem
  setCurrentItem: (state: SidebarCurrentItem) => void
} | null>(null)

export function useSidebarContext() {
  const context = useContext(SidebarContext)

  invariant(context, 'You must use Sidebar composites inside Sidebar context!')

  return context
}

const { Provider } = SidebarContext

export { Provider as SidebarProvider }
