import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { pageHeaderTopTheme } from './page.style'
import { cx } from '@vtex/admin-ui-core'

/**
 * Page header top component
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
export const PageHeaderTop = forwardRef(function PageHeaderTop(
  props: PageHeaderTopProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', ...htmlProps } = props

  return (
    <div
      ref={ref}
      className={cx(pageHeaderTopTheme, className)}
      {...htmlProps}
    />
  )
})

export type PageHeaderTopProps = ComponentPropsWithoutRef<'div'>
