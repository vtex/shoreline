import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '../compose'

/**
 * Body of the table
 */
export const TableBody = forwardRef<HTMLDivElement, TableBodyProps>(
  function TableBody(props, ref) {
    const { asChild = false, ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp role="presentation" data-sl-table-body ref={ref} {...otherProps} />
    )
  }
)

export interface TableBodyOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type TableBodyProps = TableBodyOptions & ComponentPropsWithoutRef<'div'>
