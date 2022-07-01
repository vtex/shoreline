import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './page.style'

/**
 * Page header top component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderTitle } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *      <Stack direction="row" space="$m">
 *        <Tag label="Short text" size="large" />
 *        <Tag label="Short text" size="large" />
 *      </Stack>
 *    </PageHeaderTitle>
 *  </PageHeaderTop>
 * </PageHeader>
 */
export const PageHeaderTop = createComponent<'div'>((props) =>
  useElement('div', {
    baseStyle: style.pageHeaderTop,
    ...props,
  })
)

export type PageHeaderTop = ComponentPropsWithRef<typeof PageHeaderTop>
