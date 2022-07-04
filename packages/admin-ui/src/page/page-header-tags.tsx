import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Stack } from '../stack'

/**
 * Page header tags component wrapper
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
export const PageHeaderTags = createComponent<typeof Stack>((props) => {
  const { children, direction = 'row', space = '$m', ...htmlProps } = props

  return useElement(Stack, {
    children,
    direction,
    space,
    ...htmlProps,
  })
})
