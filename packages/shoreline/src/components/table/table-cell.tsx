import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '../compose'

/**
 * Cell of the table body
 */
export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  function TableCell(props, ref) {
    const { asChild = false, align = 'start', ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        role="cell"
        data-sl-table-cell
        data-sl-align={align}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface TableCellOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Cell content alignment
   * @default 'start'
   */
  align?: 'start' | 'end'
}

export type TableCellProps = TableCellOptions & ComponentPropsWithoutRef<'div'>
