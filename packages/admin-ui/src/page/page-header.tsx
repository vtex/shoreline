import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { PageHeaderContext } from './page-header-context'
import * as style from './page.style'

/**
 * Page header component
 *
 * @example
 * import { Tabs, TabPanel, Button, PageHeader } from "@vtex/admin-ui"
 *
 * <Tabs state={tabs}>
 *   <PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
 *     Product #123
 *   </PageHeader>
 *   <TabPanel id="1">
 *     <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
 *   </TabPanel>
 *   <TabPanel id="2">
 *     <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
 *   </TabPanel>
 *   <TabPanel id="3">
 *     <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
 *   </TabPanel>
 * </Tabs>
 */
export const PageHeader = createComponent<'header', PageHeaderOptions>(
  (props) => {
    const { onPopNavigation, children, ...htmlProps } = props

    return useElement('header', {
      baseStyle: style.pageHeader,
      children: (
        <PageHeaderContext.Provider
          value={{
            onPopNavigation,
          }}
        >
          {children}
        </PageHeaderContext.Provider>
      ),
      ...htmlProps,
    })
  }
)

export interface PageHeaderOptions {
  /**
   * Callback function to the "return", or "back" method you would like.
   */
  onPopNavigation?: () => void
}

export type PageHeaderProps = ComponentPropsWithRef<typeof PageHeader> &
  PageHeaderOptions
