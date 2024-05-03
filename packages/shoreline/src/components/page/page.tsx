import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import type { ContainerOptions } from '../content'
import { Container } from '../content'

/**
 * The Page structure helps users to easily identify where they are, view content essential to the main job, and perform related actions.
 * @status stable
 * @example
 * <Page>
 *  <PageHeader>
 *    <PageHeading>Title</PageHeading>
 *  </PageHeader>
 *  <PageContent>Content</PageContent>
 * <Page>
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(
  function Page(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Container data-sl-page ref={ref} tabIndex={0} {...otherProps}>
        {children}
      </Container>
    )
  }
)

export type PageOptions = ContainerOptions
export type PageProps = ContainerOptions & ComponentPropsWithoutRef<'div'>
