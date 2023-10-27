import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '../compose'

export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  function TableCell(props, ref) {
    const { asChild = false, ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    return <Comp role="cell" data-sl-table-cell ref={ref} {...otherProps} />
  }
)

export interface TableCellProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}
