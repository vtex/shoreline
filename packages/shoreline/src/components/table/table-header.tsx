import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { Compose } from '../compose'

/**
 * Header of the table
 */
export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(
  function TableHeader(props, ref) {
    const { asChild = false, ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        role="presentation"
        data-sl-table-header
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface TableHeaderOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type TableHeaderProps = TableHeaderOptions &
  ComponentPropsWithoutRef<'div'>
