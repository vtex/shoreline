import React, { createContext, useContext, ReactNode } from 'react'
import { TabStateReturn } from 'reakit'
import invariant from 'tiny-invariant'

export interface TabsProviderProps {
  state: TabStateReturn
  children?: ReactNode
}

const TabsContext = createContext<TabsProviderProps | null>(null)

export function useTabsContext() {
  const context = useContext(TabsContext)

  invariant(context, 'Do not use Tabs composites outside Tabs context!')

  return context
}

export function TabsProvider(
  props: React.PropsWithChildren<TabsProviderProps>
) {
  const { children, ...tabsProps } = props

  return (
    <TabsContext.Provider value={tabsProps}>{children}</TabsContext.Provider>
  )
}
