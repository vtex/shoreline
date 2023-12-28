import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Heading } from '../heading'

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
      <Heading
        level={1}
        variant="display3"
        data-sl-page-title
        ref={ref}
        {...otherProps}
      >
        {children}
      </Heading>
    )
  }
)

export type PageTitleProps = ComponentPropsWithoutRef<'h1'>
