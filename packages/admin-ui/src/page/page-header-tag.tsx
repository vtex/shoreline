import type { Ref } from 'react'
import React, { forwardRef } from 'react'

import type { TagProps } from '../tag'
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
export const PageHeaderTag = forwardRef(
  (props: TagProps, ref: Ref<HTMLDivElement>) => {
    const { size = 'large', ...tagProps } = props

    return <Tag size={size} ref={ref} {...tagProps} />
  }
)
