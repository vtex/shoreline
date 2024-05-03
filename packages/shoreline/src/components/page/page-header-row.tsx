import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from '@vtex/shoreline-utils'
import { Compose } from '../compose'

/**
 * Row of the page header
 * @status stable
 * @example
 * <Page>
 *  <PageHeader>
 *    <PageHeaderRow>
 *      <PageHeading>Title</PageHeading>
 *    </PageHeaderRow>
 *    <PageHeaderRow>
 *      {tabs}
 *    </PageHeaderRow>
 *  </PageHeader>
 * </Page>
 */
export const PageHeaderRow = forwardRef<HTMLDivElement, PageHeaderRowProps>(
  function PageHeaderRow(props, ref) {
    const { asChild = false, ...otherProps } = props
    const Comp = asChild ? Compose : 'div'

    return <Comp data-sl-page-header-row ref={ref} {...otherProps} />
  }
)

export interface PageHeaderRowOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type PageHeaderRowProps = PageHeaderRowOptions &
  ComponentPropsWithoutRef<'div'>
