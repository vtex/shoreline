import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Stack } from '../stack'
import { Container, Content } from '../content'
import './page-header.css'

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
        <Content data-sl-page-header asChild narrow ref={ref} {...otherProps}>
          <header>
            <Stack space="$space-3">{children}</Stack>
          </header>
        </Content>
      </Container>
    )
  }
)

export type PageHeaderProps = ComponentPropsWithoutRef<'header'>
