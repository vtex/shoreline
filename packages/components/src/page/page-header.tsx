import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Stack } from '../stack'
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
            <Stack space="$space-3" data-sl-page-header>
              {children}
            </Stack>
          </header>
        </Content>
      </Container>
    )
  }
)

export type PageHeaderProps = ComponentPropsWithoutRef<'header'>
