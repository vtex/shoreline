import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { TabList as AriakitTabList } from 'ariakit'
import { cx } from '@vtex/admin-ui-core'

import { Inline } from '../inline'
import type { TabState } from './tab-state'
import { tabListTheme } from './tab.css'

export const TabList = forwardRef(function TabList(
  props: TabListProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', state, children, ...divProps } = props

  return (
    <AriakitTabList
      state={state}
      ref={ref}
      className={cx(tabListTheme, className)}
      {...divProps}
    >
      <Inline hSpace="$space-2" spaceInside>
        {children}
      </Inline>
    </AriakitTabList>
  )
})

export interface TabListProps extends ComponentPropsWithoutRef<'div'> {
  state: TabState
}
