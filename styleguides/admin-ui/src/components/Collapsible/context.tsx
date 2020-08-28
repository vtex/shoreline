import React, { useContext, createContext } from 'react'
import { DisclosureProps } from 'reakit'

const CollapsibleContext = createContext<DisclosureProps | null>(null)

export function useCollapsibleContext() {
  const context = useContext(CollapsibleContext)

  if (!context) {
    throw new Error(
      `Do not use Collapsible's composites outside of Collapsible context`
    )
  }

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
