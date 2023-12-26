import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Compose } from '@vtex/shoreline-primitives'
import './table-row.css'

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  function TableRow(props, ref) {
    const {
      selected = false,
      expanded = false,
      asChild = false,
      dimOnHover = true,
      ...otherProps
    } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        role="row"
        data-sl-table-row
        data-selected={selected}
        data-expanded={expanded}
        data-dim-on-hover={dimOnHover}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface TableRowProps extends ComponentPropsWithoutRef<'div'> {
  selected?: boolean
  expanded?: boolean
  asChild?: boolean
  dimOnHover?: boolean
}
