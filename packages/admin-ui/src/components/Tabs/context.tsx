import React, { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { TabsProps } from './index'

const TabsContext = createContext<TabsProps | null>(null)

export function useTabsContext() {
  const context = useContext(TabsContext)

  invariant(context, 'Do not use Tabs composites outside Tabs context!')

  return context
}

export function TabsProvider(props: React.PropsWithChildren<TabsProps>) {
  const { children, ...tabsProps } = props

  return (
    <TabsContext.Provider value={tabsProps}>{children}</TabsContext.Provider>
  )
}
