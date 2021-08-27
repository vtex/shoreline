import type { ReactNode } from 'react'
import React from 'react'
import type { TabProps as ReakitTabProps, TabStateReturn } from 'reakit'
import {
  TabList as ReakitTabList,
  TabPanel as ReakitTabPanel,
  Tab as ReakitTab,
} from 'reakit'
import { useSystem } from '@vtex/admin-ui-core'

import { TabsProvider, useTabsContext } from './context'
import type { SystemComponent, SystemComponentProps } from '../../types'

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
        paddingX: 4,
        width: 'full',
        ...(fluid
          ? {
              display: 'flex',
              justifyContent: 'space-evenly',
              '> button': { width: 'full' },
            }
          : { display: 'inline-block' }),
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
        fontFamily: 'sans',
        fontSettings: 'regular',
        border: 'none',
        borderRadius: 'default',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
        borderBottomWidth: 2,
        borderTopStyle: 'solid',
        borderTopColor: 'transparent',
        borderTopWidth: '2px',
        height: 44,
        minWidth: 110,
        cursor: 'pointer',
        position: 'relative',
        ':focus:not([data-focus-visible-added])': {
          outline: 'none',
          boxShadow: 'none',
        },
        ':focus': {
          outline: 'none',
          boxShadow: 'focus',
        },
        paddingX: 6,
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
        color: 'dark.secondary',
        ...(state.selectedId === id
          ? { borderBottomColor: 'blue', color: 'blue' }
          : {
              ':hover': {
                color: 'blue.hover',
              },
            }),
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
        ':focus:not([data-focus-visible-added])': {
          outline: 'none',
          boxShadow: 'none',
        },
        ':focus': {
          outline: 'none',
          boxShadow: 'focus',
        },
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
