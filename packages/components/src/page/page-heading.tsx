import React, { forwardRef } from 'react'
import type { HeadingProps } from '../heading'
import { Heading } from '../heading'

/**
 * Title of a page
 *
 * @example
 * <Page>
 *  <PageHeader>
 *    <PageHeading>Title</PageHeading>
 *  </PageHeader>
 * </Page>
 */
export const PageHeading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function PageHeading(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Heading
        level={1}
        variant="display1"
        data-sl-page-heading
        ref={ref}
        {...otherProps}
      >
        {children}
      </Heading>
    )
  }
)
