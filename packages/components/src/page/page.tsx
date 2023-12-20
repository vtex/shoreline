import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Container } from '../content'

/**
 * Page containers allow merchants to identify where they are, view content related to a single main job, and perform related actions.
 *
 * @example
 * <Page>
 *  <PageHeader>
 *    <PageTitle>Title</PageTitle>
 *  </PageHeader>
 *  <PageContent>Content</PageContent>
 * <Page>
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  props,
  ref
) {
  const { children, ...otherProps } = props

  return (
    <Container data-sl-page ref={ref} tabIndex={0} {...otherProps}>
      {children}
    </Container>
  )
})

export type PageProps = ComponentPropsWithoutRef<'div'>
