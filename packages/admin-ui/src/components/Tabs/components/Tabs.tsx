import type { ReactNode } from 'react'
import React from 'react'
import type { TabStateReturn } from 'reakit'

import { TabsProvider } from '../context'

export function Tabs(props: TabsProps) {
  const { state, children, ...restProps } = props

  return (
    <TabsProvider state={state} {...restProps}>
      {children}
    </TabsProvider>
  )
}

export interface TabsProps {
  state: TabStateReturn
  children?: ReactNode
}
