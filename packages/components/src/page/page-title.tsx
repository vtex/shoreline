import React, { forwardRef } from 'react'
import type { HeadingProps } from '../heading'
import { Heading } from '../heading'

/**
 * Title of a page
 *
 * @example
 * <Page>
 *  <PageHeader>
 *    <PageTitle>Title</PageTitle>
 *  </PageHeader>
 * </Page>
 */
export const PageTitle = forwardRef<HTMLHeadingElement, HeadingProps>(
  function PageTitle(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Heading
        level={1}
        variant="display2"
        data-sl-page-title
        ref={ref}
        {...otherProps}
      >
        {children}
      </Heading>
    )
  }
)
