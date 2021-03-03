import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import { AnchorDirection, CurrentItem } from './utils'

const SidebarContext = createContext<{
  direction: AnchorDirection
  currentItem: CurrentItem | null
  currentItemIsCollapsible: boolean | null
  collapse: boolean | null
  setCurrentItem: (currentItem: CurrentItem | null) => void
  setCurrentItemIsCollapsible: (isCollapsible: boolean) => void
  setCollapse: (state: boolean | null) => void
} | null>(null)

export function useSidebarContext() {
  const context = useContext(SidebarContext)

  invariant(context, 'You must use Sidebar composites inside Sidebar context!')

  return context
}

const { Provider } = SidebarContext

export { Provider as SidebarProvider }
