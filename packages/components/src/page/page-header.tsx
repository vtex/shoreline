import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import './page-header.css'
import { Stack } from '../stack'
import { Content } from '../content'

/**
 * Header of the page
 * @example
 * <Page>
 *  <PageHeader>
 *    <PageTitle>Title</PageTitle>
 *  </PageHeader>
 * </Page>
 */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  function PageHeader(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Content data-sl-page-header as="header" narrow ref={ref} {...otherProps}>
        <Stack space="$space-3">{children}</Stack>
      </Content>
    )
  }
)

export type PageHeaderProps = ComponentPropsWithoutRef<'header'>