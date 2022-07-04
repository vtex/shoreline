import { createComponent, useElement } from '@vtex/admin-ui-react'

import type { ButtonOptions } from '../button'
import { Button } from '../button'
import * as style from './page.style'

/**
 * Page header button component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderActions, PageHeaderButton } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *    </PageHeaderTitle>
 *    <PageHeaderActions>
 *      <PageHeaderButton>Create</PageHeaderButton>
 *      <PageHeaderButton variant="critical">Delete</PageHeaderButton>
 *    </PageHeaderActions>
 *  </PageHeaderTop>
 * </PageHeader>
 */
export const PageHeaderButton = createComponent<typeof Button, ButtonOptions>(
  (props) => {
    const { children, size = 'large', bleedY = true, ...htmlProps } = props

    return useElement(Button, {
      baseStyle: style.pageHeaderButton,
      children,
      size,
      bleedY,
      ...htmlProps,
    })
  }
)
