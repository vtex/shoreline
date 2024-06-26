import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { TabPanel as BaseTabPanel } from '@ariakit/react'

/**
 * Tabs are used to create up to five views inside a page. Use for related content that is not comparable, when a unified view is not necessary.
 * @status stable
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

export interface TabPanelOptions {
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

export type TabPanelProps = TabPanelOptions & ComponentPropsWithoutRef<'div'>
