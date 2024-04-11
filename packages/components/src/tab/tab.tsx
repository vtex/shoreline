import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Tab as BaseTab } from '@ariakit/react'

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
export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  props,
  ref
) {
  const { asChild = false, children, ...otherProps } = props

  return (
    <BaseTab
      data-sl-tab
      ref={ref}
      render={asChild ? (children as JSX.Element) : undefined}
      {...otherProps}
    >
      <div data-sl-tab-content>{children}</div>
    </BaseTab>
  )
})

export interface TabOptions {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

type TabProps = TabOptions & ComponentPropsWithoutRef<'button'>
