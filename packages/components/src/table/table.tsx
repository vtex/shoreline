import { constants } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '../compose'

export const Table = forwardRef<HTMLDivElement, TableProps>(function Table(
  props,
  ref
) {
  const {
    columnWidths,
    asChild = false,
    stickyHeader = false,
    style = {},
    ...otherProps
  } = props

  const Comp = asChild ? Compose : 'div'

  return (
    <Comp
      role="table"
      data-sl-table
      data-sl-table-header-sticky={stickyHeader}
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
  columnWidths?: string[]
  asChild?: boolean
  /**
   * If true, the header will be sticky
   * @default false
   */
  stickyHeader?: boolean
}
