import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Row of the table
 */
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

export interface TableRowOptions {
  /**
   * Indicates the row selection
   * @default false
   */
  selected?: boolean
  /**
   * Indicates the row expansion
   * @default false
   */
  expanded?: boolean
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Indicates that the row dims while hovered
   * @default true
   */
  dimOnHover?: boolean
}

export type TableRowProps = TableRowOptions & ComponentPropsWithoutRef<'div'>
