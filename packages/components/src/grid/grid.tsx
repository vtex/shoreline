import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { style, type CSSProperty } from '@vtex/shoreline-utils'
import { Compose } from '@vtex/shoreline-primitives'
import './grid.css'

/**
 * Grid layout
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Grid
 * @example
 * <Grid columns="repeat(3, 1fr)">
 *  <div>Item 1</div>
 *  <div>Item 2</div>
 *  <div>Item 3</div>
 *  <div>Item 4</div>
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  props,
  ref
) {
  const {
    asChild = false,
    gap = '$space-gap',
    areas = 'none',
    rows = 'auto',
    columns = 'auto',
    autoColumns = 'auto',
    autoRows = 'auto',
    autoFlow = 'row',
    style: styleObject = {},
    ...otherProps
  } = props

  const Comp = asChild ? Compose : 'div'

  return (
    <Comp
      data-sl-grid
      ref={ref}
      style={style({
        '--sl-grid-gap': gap,
        '--sl-grid-areas': areas,
        '--sl-grid-rows': rows,
        '--sl-grid-columns': columns,
        '--sl-grid-auto-columns': autoColumns,
        '--sl-grid-auto-rows': autoRows,
        '--sl-grid-auto-flow': autoFlow,
        ...styleObject,
      })}
      {...otherProps}
    />
  )
})

export interface GridProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * CSS Gap
   * @default '$space-gap'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/gap
   */
  gap?: CSSProperty.GridGap
  /**
   * CSS grid-template-areas
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
   */
  areas?: CSSProperty.GridTemplateAreas
  /**
   * CSS grid-template-rows
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
   */
  rows?: CSSProperty.GridTemplateRows
  /**
   * CSS grid-template-columns
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  columns?: CSSProperty.GridTemplateColumns
  /**
   * CSS grid-auto-columns
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
   */
  autoColumns?: CSSProperty.GridAutoColumns
  /**
   * CSS grid-auto-rows
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows
   */
  autoRows?: CSSProperty.GridAutoRows
  /**
   * CSS grid-auto-flow
   * @default 'row'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
   */
  autoFlow?: CSSProperty.GridAutoFlow
}
