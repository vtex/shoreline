import type { Ref } from 'react'
import React, { forwardRef } from 'react'

import type { StackProps } from '../stack'
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
export const PageHeaderTags = forwardRef(
  (props: StackProps, ref: Ref<HTMLDivElement>) => {
    const { direction = 'row', space = '$m', ...stackProps } = props

    return (
      <Stack direction={direction} space={space} ref={ref} {...stackProps} />
    )
  }
)
