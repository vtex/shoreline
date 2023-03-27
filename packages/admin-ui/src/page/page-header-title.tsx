import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { IconArrowLeft } from '@vtex/phosphor-icons'

import { Box } from '../box'
import { Button } from '../button'
import { usePageHeaderContext } from './page-header-context'
import * as style from './page.style'

/**
 * Page header title component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderTitle, PageHeaderTags, PageHeaderTag } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *      <PageHeaderTags>
 *        <PageHeaderTag label="Short text" />
 *        <PageHeaderTag label="Short text" />
 *      </PageHeaderTags>
 *    </PageHeaderTitle>
 *  </PageHeaderTop>
 * </PageHeader>
 */
export const PageHeaderTitle = createComponent<'div'>((props) => {
  const { children, ...htmlProps } = props
  const { onPopNavigation } = usePageHeaderContext()

  return useElement('div', {
    baseStyle: style.pageHeaderTitleBase,
    children: (
      <>
        {onPopNavigation && (
          <Button
            aria-label="Back"
            variant="tertiary"
            bleedX
            size="large"
            bleedY
            icon={<IconArrowLeft />}
            onClick={onPopNavigation}
            className={style.popNavigationButtonTheme}
          />
        )}
        <Box csx={style.pageHeaderTitle}>{children}</Box>
      </>
    ),
    ...htmlProps,
  })
})

export type PageHeaderTitle = ComponentPropsWithRef<typeof PageHeaderTitle>
