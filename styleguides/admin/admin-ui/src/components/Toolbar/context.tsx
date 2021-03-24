import { createContext, useContext } from 'react'
import { ToolbarState } from './components'

export const ToolbarContext = createContext<ToolbarState | null>(null)

export function useToolbarContext() {
  const ctx = useContext(ToolbarContext)

  if (!ctx) {
    throw new Error('out of toolbar')
  }

  return ctx
}
