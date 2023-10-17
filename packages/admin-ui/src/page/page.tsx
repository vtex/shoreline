import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { pageTheme } from './page.style'

/**
 * Page component
 * @example
 * <Page>
 *  <PageContent />
 * </Page>
 */
export const Page = forwardRef(function PageHeaderTop(
  props: PageProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', ...htmlProps } = props

  return <div ref={ref} className={cx(pageTheme, className)} {...htmlProps} />
})

export type PageProps = ComponentPropsWithoutRef<'div'>
