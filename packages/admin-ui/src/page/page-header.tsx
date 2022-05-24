import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { PageHeaderContext } from './page-header-context'
import * as style from './page.style'

/**
 * Page header component
 * @example
 * <PageHeader onPopNavigation={() => {}}>
 *  <PageTitle>
 *    Title
 *  </PageTitle>
 * </PageHeader>
 */
export const PageHeader = createComponent<'header', PageHeaderOptions>(
  (props) => {
    const { onPopNavigation, children, ...htmlProps } = props

    return useElement('div', {
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
  onPopNavigation?: () => void
}

export type PageHeaderProps = ComponentPropsWithRef<typeof PageHeader> &
  PageHeaderOptions
