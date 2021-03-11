import React, { ReactNode } from 'react'
import {
  TabList as ReakitTabList,
  TabPanel as ReakitTabPanel,
  Tab as ReakitTab,
  TabProps as ReakitTabProps,
  TabStateReturn,
} from 'reakit'
import { useSystem } from '@vtex/admin-core'

import { TabsProvider, useTabsContext } from './context'
import { SystemComponent, SystemComponentProps } from '../../types'

export function Tabs(props: TabsProps) {
  const { state, children, ...restProps } = props
  return (
    <TabsProvider state={state} {...restProps}>
      {children}
    </TabsProvider>
  )
}

export function TabList(props: TabListProps) {
  const { children, csx, fluid = false, ...restProps } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()

  return (
    <ReakitTabList
      {...restProps}
      {...state}
      className={cn({
        themeKey: {
          tabList: {
            variant: fluid ? 'fluid' : 'block',
          },
        },
        ...csx,
      })}
    >
      {children}
    </ReakitTabList>
  )
}

export function Tab(props: TabProps) {
  const { label, id, csx, ...restProps } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()

  return (
    <ReakitTab
      className={cn({
        themeKey: {
          tab: {
            variant: state.selectedId === id ? 'active' : 'default',
          },
        },
        ...csx,
      })}
      id={id}
      aria-label={label}
      {...state}
      {...restProps}
    >
      {label}
    </ReakitTab>
  )
}

export function TabContent(props: TabContentProps) {
  const { children, csx, id, ...restProps } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()

  return (
    <ReakitTabPanel
      {...restProps}
      {...state}
      tabId={id}
      className={cn({
        themeKey: 'components.tabContent',
        ...csx,
      })}
    >
      {children}
    </ReakitTabPanel>
  )
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Content = TabContent

export interface TabsProps {
  state: TabStateReturn
  children?: ReactNode
}

export interface TabListProps extends SystemComponent {
  children?: ReactNode
  fluid?: boolean
}
export interface TabProps
  extends SystemComponentProps<Pick<ReakitTabProps, 'onClick' | 'children'>> {
  label: string
  id: string
}

export interface TabContentProps extends SystemComponent {
  children?: ReactNode
  id: string
}

export { useTabState, TabStateReturn } from 'reakit'
