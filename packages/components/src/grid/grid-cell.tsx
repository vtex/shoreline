import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { CSSProperty } from '@vtex/shoreline-utils'
import { cx } from '@vtex/shoreline-utils'

import { gridCellStyle } from './grid.css'

export const GridCell = forwardRef<HTMLDivElement, GridCellProps>(
  function GridCell(props, ref) {
    const {
      className,
      children,
      columnStart = 'auto',
      columnEnd = 'auto',
      rowStart = 'auto',
      rowEnd = 'auto',
      column = 'auto',
      row = 'auto',
      area = 'auto',
    } = props

    const style = getGridCellVariables({
      columnStart,
      columnEnd,
      rowStart,
      rowEnd,
      column,
      row,
      area,
    })

    return (
      <div ref={ref} className={cx(gridCellStyle, className)} style={style}>
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

function getGridCellVariables(
  props: Required<GridCellShorthandProps>
): CSSProperties {
  return {
    '--sl-grid-cell-columnStart': props.columnStart,
    '--sl-grid-cell-columnEnd': props.columnEnd,
    '--sl-grid-cell-rowStart': props.rowStart,
    '--sl-grid-cell-rowEnd': props.rowEnd,
    '--sl-grid-cell-column': props.column,
    '--sl-grid-cell-row': props.row,
    '--sl-grid-cell-area': props.area,
  } as CSSProperties
}
