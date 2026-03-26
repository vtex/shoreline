import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { style, type CSSProperty } from '@vtex/shoreline-utils'
import { Compose } from '../compose'

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
      columnStart,
      columnEnd,
      rowStart,
      rowEnd,
      column,
      row,
      area,
      style: styleObject = {},
      ...domProps
    } = props

    const Comp = asChild ? Compose : 'div'
    const placementStyle: GridCellStyle = {}

    if (columnStart !== undefined) {
      placementStyle['--sl-grid-cell-column-start'] = columnStart
    }

    if (columnEnd !== undefined) {
      placementStyle['--sl-grid-cell-column-end'] = columnEnd
    }

    if (rowStart !== undefined) {
      placementStyle['--sl-grid-cell-row-start'] = rowStart
    }

    if (rowEnd !== undefined) {
      placementStyle['--sl-grid-cell-row-end'] = rowEnd
    }

    if (column !== undefined) {
      placementStyle['--sl-grid-cell-column'] = column
    }

    if (row !== undefined) {
      placementStyle['--sl-grid-cell-row'] = row
    }

    if (area !== undefined) {
      placementStyle['--sl-grid-cell-area'] = area
    }

    return (
      <Comp
        data-sl-grid-cell
        ref={ref}
        style={style({
          ...placementStyle,
          ...styleObject,
        })}
        {...domProps}
      />
    )
  }
)

export interface GridCellOptions {
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

export type GridCellProps = GridCellOptions & ComponentPropsWithoutRef<'div'>

type GridCellStyle = NonNullable<ComponentPropsWithoutRef<'div'>['style']> &
  Record<`--${string}`, string | number | boolean>
