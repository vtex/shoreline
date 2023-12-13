import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import './page-title.css'
import { Text } from '../text'

/**
 * Title of a page
 * @example
 * <Page>
 *  <PageHeader>
 *    <PageTitle>Title</PageTitle>
 *  </PageHeader>
 * </Page>
 */
export const PageTitle = forwardRef<HTMLHeadingElement, PageTitleProps>(
  function PageTitle(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Text
        as="h1"
        variant="display3"
        data-sl-page-title
        ref={ref}
        {...otherProps}
      >
        {children}
      </Text>
    )
  }
)

export type PageTitleProps = ComponentPropsWithoutRef<'h1'>
