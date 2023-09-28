import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { CSSProperty } from '@vtex/shoreline-utils'
import { cx } from '@vtex/shoreline-utils'

import { gridStyle } from './grid.css'

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  props,
  ref
) {
  const {
    className,
    children,
    gap = 0,
    rowGap = 0,
    columnGap = 0,
    templateAreas = 'none',
    templateRows = 'auto',
    templateColumns = 'auto',
    autoColumns = 'auto',
    autoRows = 'auto',
    autoFlow = 'row',
  } = props

  const style = getGridVariables({
    gap,
    rowGap,
    columnGap,
    templateAreas,
    templateRows,
    templateColumns,
    autoColumns,
    autoRows,
    autoFlow,
  })

  return (
    <div ref={ref} className={cx(gridStyle, className)} style={style}>
      {children}
    </div>
  )
})

export type GridProps = ComponentPropsWithoutRef<'div'> & GridShorthandProps

export interface GridShorthandProps {
  /** Shorthand for CSS gridGap property */
  gap?: CSSProperty.GridGap
  /** Shorthand for CSS gridRowGap property */
  rowGap?: CSSProperty.GridRowGap
  /** Shorthand for CSS gridColumnGap property */
  columnGap?: CSSProperty.GridColumnGap
  /** Shorthand for CSS gridTemplateAreas property */
  templateAreas?: CSSProperty.GridTemplateAreas
  /** Shorthand for CSS gridTemplateRows property */
  templateRows?: CSSProperty.GridTemplateRows
  /** Shorthand for CSS gridTemplateColumns property */
  templateColumns?: CSSProperty.GridTemplateColumns
  /** Shorthand for CSS gridAutoColumns property */
  autoColumns?: CSSProperty.GridAutoColumns
  /** Shorthand for CSS gridAutoRows property */
  autoRows?: CSSProperty.GridAutoRows
  /** Shorthand for CSS gridAutoFlow property */
  autoFlow?: CSSProperty.GridAutoFlow
}

function getGridVariables(props: Required<GridShorthandProps>): CSSProperties {
  return {
    '--sl-grid-gap': props.gap,
    '--sl-grid-rowGap': props.rowGap,
    '--sl-grid-columnGap': props.columnGap,
    '--sl-grid-templateAreas': props.templateAreas,
    '--sl-grid-templateRows': props.templateRows,
    '--sl-grid-templateColumns': props.templateColumns,
    '--sl-grid-autoColumns': props.autoColumns,
    '--sl-grid-autoRows': props.autoRows,
    '--sl-grid-autoFlow': props.autoFlow,
  } as CSSProperties
}
