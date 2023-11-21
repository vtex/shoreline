import { constants } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '../compose'
import './table.css'

export const Table = forwardRef<HTMLDivElement, TableProps>(function Table(
  props,
  ref
) {
  const {
    columnWidths,
    asChild = false,
    stickyHeader = false,
    stickyColumn = false,
    density = 'default',
    style = {},
    ...otherProps
  } = props

  const Comp = asChild ? Compose : 'div'

  return (
    <Comp
      role="table"
      data-sl-table
      data-sl-table-header-sticky={stickyHeader}
      data-sl-table-sticky-column={stickyColumn}
      data-sl-table-density={density}
      ref={ref}
      style={
        {
          ...style,
          '--sl-table-grid-template-columns': columnWidths?.join(
            constants.whiteSpace
          ),
        } as CSSProperties
      }
      {...otherProps}
    />
  )
})

export interface TableProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Array of column widths
   *
   * When using the Table component
   * @default []
   *
   * When using the SimpleTable component
   * @default [repeat(${columns.length}, var(--sl-table-default-column-width))]
   */
  columnWidths?: string[]
  /**
   * If true, the Table component will be rendered as a child of the Compose component
   * @default false
   */
  asChild?: boolean
  /**
   * If true, the header will be sticky
   * @default false
   */
  stickyHeader?: boolean
  /**
   * If true, the first column will be sticky
   * @default false
   */
  stickyColumn?: boolean
  /**
   * The density of the table
   * @default 'default'
   */
  density?: 'default' | 'comfortable' | 'compact'
}
