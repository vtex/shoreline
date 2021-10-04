import React from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { PageHeaderContext } from './PageHeaderContext'

/**
 * @example
 * <PageHeader onPopNavigation={() => {}}>
 *  <PageTitle>
 *    Title
 *  </PageTitle>
 * </PageHeader>
 */
export const PageHeader = jsx('header')(
  {
    bg: 'light.primary',
    color: 'dark.primary',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: 'divider-bottom',
    position: 'sticky',
    top: 0,
    height: '4.5rem',
    paddingX: 4,
    zIndex: 999,
  },
  {
    options: ['onPopNavigation'],
    useOptions(options: PageHeaderOptions, props) {
      const { onPopNavigation } = options
      const { children, ...headerProps } = props

      return {
        ...headerProps,
        children: (
          <PageHeaderContext.Provider
            value={{
              onPopNavigation,
            }}
          >
            {children}
          </PageHeaderContext.Provider>
        ),
      }
    },
  }
)

export interface PageHeaderOptions {
  onPopNavigation?: () => void
}
