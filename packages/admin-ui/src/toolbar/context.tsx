import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { ToolbarState } from './state'

export const ToolbarContext = createContext<ToolbarState | null>(null)

export function useToolbarContext() {
  const ctx = useContext(ToolbarContext)

  invariant(ctx, 'Toolbar composites must not be used outside of its context')

  return ctx
}