import { createComponent, useElement } from '@vtex/admin-ui-react'

import type { TagOptions } from '../tag'
import { Tag } from '../tag'

/**
 * Page header tag component
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
export const PageHeaderTag = createComponent<typeof Tag, TagOptions>(
  (props) => {
    const { children, size = 'large', ...htmlProps } = props

    return useElement(Tag, {
      children,
      size,
      ...htmlProps,
    })
  }
)
