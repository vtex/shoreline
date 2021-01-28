import React, { ReactNode } from 'react'
import {
  TabList as ReakitTabList,
  TabPanel as ReakitTabPanel,
  Tab as ReakitTab,
  useTabState,
  Button as ReakitButton,
  TabProps as ReakitTabProps,
} from 'reakit'
import { inlineVariant } from '@vtex/admin-core'

import { useSystem } from '../../system'
import { TabsProvider, useTabsContext } from './context'
import { Overridable } from '../../types'
import { Box } from '../Box'

export function TabList(props: TabListProps) {
  const { children, styleOverrides, fluid = false, ...restProps } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()

  // const themeKey = inlineVariant('components.tabs.list-container', [
  //   [fluid, '-fluid'],
  // ])

  const flexStyles = fluid
    ? {
        display: 'flex',
        justifyContent: 'space-evenly',
        '> button': { width: 'full' },
      }
    : {}

  return (
    <ReakitTabList
      {...restProps}
      {...state}
      className={cn({
        ...styleOverrides,
        themeKey: 'components.tabs.list',
        position: 'relative',
        paddingX: 0,
        height: 48,
      })}
    >
      <Box
        styles={{
          paddingX: 4,
          width: 'full',
          position: 'absolute',
          top: 1,
          ...flexStyles,
        }}
      >
        {children}
      </Box>
    </ReakitTabList>
  )
}

export function Tab(props: TabProps) {
  const {
    label,
    tabId,
    disabled,
    onClick,
    styleOverrides,
    ...restProps
  } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()

  const active = state.selectedId === tabId
  const themeKey = inlineVariant('components.tabs.tab', [[active, '-active']])

  return (
    <ReakitTab
      as={ReakitButton}
      className={cn({
        themeKey,
        ...styleOverrides,
      })}
      id={tabId}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      {...state}
      {...restProps}
    >
      {label}
    </ReakitTab>
  )
}

export function TabContent(props: TabContentProps) {
  const { children, styleOverrides, tabId, ...restProps } = props
  const { state } = useTabsContext()
  const { cn } = useSystem()
  const themeKey = 'components.tabs.tab-content'

  return (
    <ReakitTabPanel
      {...restProps}
      {...state}
      tabId={tabId}
      className={cn({ themeKey, ...styleOverrides })}
    >
      {children}
    </ReakitTabPanel>
  )
}

export interface TabProps
  extends Pick<ReakitTabProps, 'disabled' | 'onClick' | 'children'>,
    Overridable {
  label: string
  tabId: string
}

export interface TabListProps extends Overridable {
  children?: ReactNode
  fluid?: boolean
}

export interface TabContentProps extends Overridable {
  children?: ReactNode
  tabId: string
}

export { useTabState }

export { TabsProvider as Tabs }
