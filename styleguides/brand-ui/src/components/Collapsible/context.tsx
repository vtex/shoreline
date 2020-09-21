import React, { useContext, createContext } from 'react'
import { DisclosureProps } from 'reakit'
import invariant from 'tiny-invariant'

const CollapsibleContext = createContext<DisclosureProps | null>(null)

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
}: DisclosureProps) {
  return (
    <CollapsibleContext.Provider value={{ ...restProps }}>
      {children}
    </CollapsibleContext.Provider>
  )
}
