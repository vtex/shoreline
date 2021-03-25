import { createContext, useContext } from 'react'
import { SidebarState } from './hooks'

export const SidebarContext = createContext<SidebarState | null>(null)

export function useSidebarContext() {
  const ctx = useContext(SidebarContext)

  if (!ctx) {
    throw new Error(
      'You are trying to use a Sidebar composite outside of context. Check the render method of your Sidebar'
    )
  }

  return ctx
}
