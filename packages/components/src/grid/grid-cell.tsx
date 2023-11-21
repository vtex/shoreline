import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { CSSProperty } from '@vtex/shoreline-utils'
import './grid-cell.css'

export const GridCell = forwardRef<HTMLDivElement, GridCellProps>(
  function GridCell(props, ref) {
    const {
      children,
      columnStart = 'auto',
      columnEnd = 'auto',
      rowStart = 'auto',
      rowEnd = 'auto',
      column = 'auto',
      row = 'auto',
      area = 'auto',
      ...otherProps
    } = props

    return (
      <div
        data-sl-grid-cell
        ref={ref}
        style={
          {
            '--sl-grid-cell-columnStart': columnStart,
            '--sl-grid-cell-columnEnd': columnEnd,
            '--sl-grid-cell-rowStart': rowStart,
            '--sl-grid-cell-rowEnd': rowEnd,
            '--sl-grid-cell-column': column,
            '--sl-grid-cell-row': row,
            '--sl-grid-cell-area': area,
          } as CSSProperties
        }
        {...otherProps}
      >
        {children}
      </div>
    )
  }
)

export type GridCellProps = ComponentPropsWithoutRef<'div'> &
  GridCellShorthandProps

export interface GridCellShorthandProps {
  /** Shorthand for CSS gridColumnStart property */
  columnStart?: CSSProperty.GridColumnStart
  /** Shorthand for CSS gridColumnEnd property */
  columnEnd?: CSSProperty.GridColumnEnd
  /** Shorthand for CSS gridRowStart property */
  rowStart?: CSSProperty.GridRowStart
  /** Shorthand for CSS gridRowEnd property */
  rowEnd?: CSSProperty.GridRowEnd
  /** Shorthand for CSS gridColumn property */
  column?: CSSProperty.GridColumn
  /** Shorthand for CSS gridRow property */
  row?: CSSProperty.GridRow
  /** Shorthand for CSS gridArea property */
  area?: CSSProperty.GridArea
}
