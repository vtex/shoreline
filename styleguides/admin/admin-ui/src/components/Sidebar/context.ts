import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

const SidebarContext = createContext<{} | null>(null)

export function useSidebarContext() {
  const context = useContext(SidebarContext)

  invariant(context, 'You must use Sidebar composites inside Sidebar context!')

  return context
}

const { Provider } = SidebarContext

export { Provider as SidebarProvider }
