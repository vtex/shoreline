import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '@vtex/shoreline-primitives'

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

export interface TableCellProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
  align?: 'start' | 'end'
}
