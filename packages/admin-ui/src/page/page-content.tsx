import React, { forwardRef } from 'react'
import type { ComponentPropsWithRef, Ref } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { pageContentTheme } from './page.css'

/**
 * Page content component
 *
 * @example
 * import { Page, PageContent, PageHeader, PageHeaderTitle, PageHeaderTop } from "@vtex/admin-ui"
 *
 * <Page>
 *  <PageHeader>
 *    <PageHeaderTop>
 *      <PageHeaderTitle>
 *        Product #123
 *      </PageHeaderTitle>
 *    </PageHeaderTop>
 *  </PageHeader>
 *  <PageContent>
 *    Content
 *  </PageContent>
 * </Page>
 */
export const PageContent = forwardRef(function PageContent(
  props: PageContentProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', layout = 'standard', ...htmlProps } = props

  return (
    <div
      ref={ref}
      data-layout={layout}
      className={cx(pageContentTheme, className)}
      {...htmlProps}
    />
  )
})

export interface PageContentProps extends ComponentPropsWithRef<'div'> {
  layout?: 'standard' | 'wide' | 'narrow'
}
