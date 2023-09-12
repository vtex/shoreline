import { TabPanel as AriakitTabPanel } from 'ariakit'
import type { ReactNode, Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import type { TabState } from './tab-state'
import { tabPanelTheme } from './tab.style'
import { useTabPanelContext } from './tab-panel-list'

export const TabPanel = forwardRef(function TabPanel(
  props: TabPanelProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', state, children, ...divProps } = props

  const finalState = useTabPanelContext(state)

  if (!finalState) {
    console.error(
      'Provide the state property (prefered) or wrap TabPanel with TabPanelProvider'
    )

    return null
  }

  return (
    <AriakitTabPanel
      state={finalState}
      ref={ref}
      className={cx(tabPanelTheme, className)}
      {...divProps}
    >
      {children}
    </AriakitTabPanel>
  )
})

export interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  state: TabState
  tabId?: string
  children?: ReactNode
}
