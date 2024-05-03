import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Container, Content } from '../content'

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
      <Container data-sl-page-container>
        <Content
          data-sl-page-content
          data-layout={layout}
          ref={ref}
          {...otherProps}
        >
          {children}
        </Content>
      </Container>
    )
  }
)

export interface PageContentOptions {
  /**
   * Layout type
   * @default 'standard'
   */
  layout?: 'wide' | 'standard' | 'narrow'
}

export type PageContentProps = PageContentOptions &
  ComponentPropsWithoutRef<'div'>
