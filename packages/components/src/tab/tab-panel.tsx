import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { TabPanel as BaseTabPanel } from '@ariakit/react'

import './tab-panel.css'

/**
 * @example
 * <TabProvider>
 *  <TabList>
 *    <Tab>Tab 1</Tab>
 *    <Tab>Tab 2</Tab>
 *  </TabList>
 *  <TabPanel>
 *    Tab 1
 *  </TabPanel>
 *  <TabPanel>
 *    Tab 2
 *  </TabPanel>
 * </TabProvider>
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <BaseTabPanel
        data-sl-tab-panel
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </BaseTabPanel>
    )
  }
)

export interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
  /**
   * The id of the tab that controls this panel. By default, this value will be inferred based on the order of the tabs and the panels.
   */
  tabId?: string
}
