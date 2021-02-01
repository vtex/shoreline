import React, { ReactNode } from 'react'
import {
  TabList as ReakitTabList,
  TabPanel as ReakitTabPanel,
  Tab as ReakitTab,
  TabProps as ReakitTabProps,
  TabStateReturn,
} from 'reakit'
import { inlineVariant } from '@vtex/admin-core'

import { useSystem } from '../../system'
import { TabsProvider, useTabsContext } from './context'
import { Overridable } from '../../types'

export function Tabs(props: TabsProps) {
  const { state, children, ...restProps } = props
  return (
    <TabsProvider state={state} {...restProps}>
      {children}
    </TabsProvider>
  )
}

export function TabList(props: TabListProps) {
  const { children, styleOverrides, fluid = false, ...restProps } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()

  const themeKey = inlineVariant('components.tabs.list', [[fluid, '-fluid']])

  return (
    <ReakitTabList
      {...restProps}
      {...state}
      className={cn({
        themeKey,
        ...styleOverrides,
      })}
    >
      {children}
    </ReakitTabList>
  )
}

export function Tab(props: TabProps) {
  const { label, id, styleOverrides, ...restProps } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()

  const active = state.selectedId === id
  const themeKey = inlineVariant('components.tabs.tab', [[active, '-active']])

  return (
    <ReakitTab
      className={cn({
        themeKey,
        ...styleOverrides,
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
  const { children, styleOverrides, id, ...restProps } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()

  return (
    <ReakitTabPanel
      {...restProps}
      {...state}
      tabId={id}
      className={cn({
        themeKey: 'components.tabs.tab-content',
        ...styleOverrides,
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

export interface TabListProps extends Overridable {
  children?: ReactNode
  fluid?: boolean
}
export interface TabProps
  extends Pick<ReakitTabProps, 'onClick' | 'children'>,
    Overridable {
  label: string
  id: string
}

export interface TabContentProps extends Overridable {
  children?: ReactNode
  id: string
}

export { useTabState, TabStateReturn } from 'reakit'
