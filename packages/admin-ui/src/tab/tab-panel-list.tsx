import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

import type { TabState } from './tab-state'

const TabPanelContext = createContext<TabState | null>(null)

export function TabPanelList(props: TabPanelListProps) {
  const { state, children } = props

  return (
    <TabPanelContext.Provider value={state}>
      {children}
    </TabPanelContext.Provider>
  )
}

export function useTabPanelContext(state?: TabState): TabState | null {
  const context = useContext(TabPanelContext)

  return state || context
}

export interface TabPanelListProps {
  state: TabState
  children?: ReactNode
}
