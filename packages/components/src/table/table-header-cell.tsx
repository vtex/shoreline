import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '../compose'

export const TableHeaderCell = forwardRef<HTMLDivElement, TableHeaderCellProps>(
  function TableHeaderCell(props, ref) {
    const { asChild = false, ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        role="columnheader"
        data-sl-table-header-cell
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}
