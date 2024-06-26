import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import type { ContentOptions } from '../content'
import { Container, Content } from '../content'

/**
 * Header of the page
 *
 * @example
 * <Page>
 *  <PageHeader>
 *    <PageHeading>Title</PageHeading>
 *  </PageHeader>
 * </Page>
 */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  function PageHeader(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Container>
        <Content
          data-sl-page-header-container
          asChild
          narrow
          ref={ref}
          {...otherProps}
        >
          <header>
            <div data-sl-page-header>{children}</div>
          </header>
        </Content>
      </Container>
    )
  }
)

export type PageHeaderOptions = Omit<ContentOptions, 'narrow'>

export type PageHeaderProps = PageHeaderOptions &
  ComponentPropsWithoutRef<'header'>
