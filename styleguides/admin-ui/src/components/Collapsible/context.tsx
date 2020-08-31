import React, { useContext, createContext } from 'react'
import { DisclosureProps } from 'reakit'
import invariant from 'tiny-invariant'

const CollapsibleContext = createContext<DisclosureProps | null>(null)

export function useCollapsibleContext() {
  const context = useContext(CollapsibleContext)

  if (!context) {
    if ('production' !== process.env.NODE_ENV) {
      invariant(
        false,
        `Do not use Collapsible's composites outside of Collapsible context`
      )
    } else {
      invariant(false)
    }
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
