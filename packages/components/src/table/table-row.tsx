import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    return <tr data-sl-table-row ref={ref} {...props} />
  }
)

export type TableRowProps = ComponentPropsWithoutRef<'tr'>
