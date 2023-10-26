import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    const { selected = false, expanded = false, ...otherProps } = props

    return (
      <tr
        data-sl-table-row
        data-selected={selected}
        data-expanded={expanded}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  selected?: boolean
  expanded?: boolean
}
