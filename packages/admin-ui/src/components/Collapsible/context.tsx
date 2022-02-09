import React, { useContext, createContext } from 'react'

import invariant from 'tiny-invariant'
import type { CollapsibleState } from '.'

const CollapsibleContext = createContext<
  (CollapsibleState & { disabled: boolean }) | null
>(null)

export function useCollapsibleContext() {
  const context = useContext(CollapsibleContext)

  invariant(
    context,
    `Do not use Collapsible's composites outside of Collapsible context`
  )

  return context
}

export function CollapsibleProvider({
  children,
  ...restProps
}: CollapsibleState & { disabled: boolean; children: React.ReactNode }) {
  return (
    <CollapsibleContext.Provider value={{ ...restProps }}>
      {children}
    </CollapsibleContext.Provider>
  )
}
