import React from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { PageHeaderContext } from './page-header-context'
import { PageHeaderTop } from './page-header-top'
import { PageHeaderStart } from './page-header-start'
import { PageHeaderEnd } from './page-header-end'
import type { ButtonProps } from '../button'
import type { MenuItemProps, MenuOptions } from '../components/Menu'
import type { TagProps } from '../tag'
import type { TabProps } from '../components/Tabs'
import * as style from './page.style'
import { PageHeaderBottom } from './page-header-bottom'

/**
 * Page header component
 *
 * @example
 * import { Tabs, TabPanel, Button, PageHeader } from "@vtex/admin-ui"
 *
 * <Tabs state={tabs}>
 *   <PageHeader
 *      title="Product"
 *      onPopNavigation={() => alert('onPopNavigation()')}
 *      actionOptions={actionOptions}
 *      tabOptions={tabOptions}
 *      menuOptions={menuOptions}
 *      tagOptions={tagOptions}
 *   />
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
    const {
      onPopNavigation,
      children,
      title,
      actionOptions,
      tabOptions,
      menuOptions,
      tagOptions,
      ...htmlProps
    } = props

    return useElement('header', {
      baseStyle: style.pageHeader,
      children: (
        <PageHeaderContext.Provider
          value={{
            onPopNavigation,
            title,
            tagOptions,
            menuOptions,
            tabOptions,
            actionOptions,
          }}
        >
          <PageHeaderTop>
            <PageHeaderStart />
            <PageHeaderEnd />
          </PageHeaderTop>
          <PageHeaderBottom />
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
  /**
   * Page header title.
   */
  title?: ReactNode
  /**
   * Page headers' actions options.
   */
  actionOptions?: ButtonProps[]
  /**
   * Tags options.
   */
  tagOptions?: TagProps[]
  /**
   * Tabs options.
   */
  tabOptions?: TabProps[]
  /**
   * Menu options.
   */
  menuOptions?: PageHeaderMenuOptions
}

export interface PageHeaderMenuOptions extends MenuOptions {
  menuItemOptions: MenuItemProps[]
}

export type PageHeaderProps = ComponentPropsWithRef<typeof PageHeader> &
  PageHeaderOptions
