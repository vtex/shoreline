import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { SidebarState } from './hooks'

export const SidebarContext = createContext<SidebarState | null>(null)

export function useSidebarContext() {
  const ctx = useContext(SidebarContext)

  invariant(
    ctx,
    'You are trying to use a Sidebar composite outside of context. Check the render method of your Sidebar'
  )

  return ctx
}
