import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { TabList as BaseTabList } from '@ariakit/react'

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
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  function TabList(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <BaseTabList
        data-sl-tab-list
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </BaseTabList>
    )
  }
)

export interface TabListOptions {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

export type TabListProps = TabListOptions & ComponentPropsWithoutRef<'div'>
