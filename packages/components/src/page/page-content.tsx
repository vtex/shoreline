import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import './page-content.css'
import { Content } from '../content'

/**
 * Content of a page
 * @example
 * <Page>
 *  <PageContent>Content</PageContent>
 * </Page>
 */
export const PageContent = forwardRef<HTMLDivElement, PageContentProps>(
  function PageContent(props, ref) {
    const { children, layout = 'standard', ...otherProps } = props

    return (
      <Content
        data-sl-page-content
        data-layout={layout}
        ref={ref}
        {...otherProps}
      >
        {children}
      </Content>
    )
  }
)

export interface PageContentProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Layout type
   * @default 'standard'
   */
  layout?: 'wide' | 'standard' | 'narrow'
}
