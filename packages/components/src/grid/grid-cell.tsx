import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { style, type CSSProperty } from '@vtex/shoreline-utils'
import './grid-cell.css'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Optional cell of a grid layout
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Grid
 * @example
 * <Grid columns="repeat(3, 1fr)">
 *  <GridCell>Item 1</GridCell>
 *  <GridCell>Item 2</GridCell>
 *  <GridCell>Item 3</GridCell>
 *  <GridCell>Item 4</GridCell>
 * </Grid>
 */
export const GridCell = forwardRef<HTMLDivElement, GridCellProps>(
  function GridCell(props, ref) {
    const {
      asChild = false,
      columnStart = 'auto',
      columnEnd = 'auto',
      rowStart = 'auto',
      rowEnd = 'auto',
      column = 'auto',
      row = 'auto',
      area = 'auto',
      style: styleObject = {},
      ...domProps
    } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        data-sl-grid-cell
        ref={ref}
        style={style({
          '--sl-grid-cell-column-start': columnStart,
          '--sl-grid-cell-column-end': columnEnd,
          '--sl-grid-cell-row-start': rowStart,
          '--sl-grid-cell-row-end': rowEnd,
          '--sl-grid-cell-column': column,
          '--sl-grid-cell-row': row,
          '--sl-grid-cell-area': area,
          ...styleObject,
        })}
        {...domProps}
      />
    )
  }
)

export interface GridCellProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * CSS grid-column-start
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
   */
  columnStart?: CSSProperty.GridColumnStart
  /**
   * CSS grid-column-end
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
   */
  columnEnd?: CSSProperty.GridColumnEnd
  /**
   * CSS grid-row-start
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
   */
  rowStart?: CSSProperty.GridRowStart
  /**
   * CSS grid-row-end
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end
   */
  rowEnd?: CSSProperty.GridRowEnd
  /**
   * CSS grid-column
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   */
  column?: CSSProperty.GridColumn
  /**
   * CSS grid-row
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
   */
  row?: CSSProperty.GridRow
  /**
   * CSS grid-area
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area
   */
  area?: CSSProperty.GridArea
}
