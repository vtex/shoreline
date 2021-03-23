import { createContext, useContext } from 'react'
import { SidebarState } from './hooks'

export const SidebarContext = createContext<SidebarState | null>(null)

export function useSidebarContext() {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('out of sidebar')
  }

  return ctx
}
