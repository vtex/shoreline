import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { CSSProperty } from '@vtex/shoreline-utils'

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  props,
  ref
) {
  const {
    children,
    gap = 0,
    templateAreas = 'none',
    templateRows = 'auto',
    templateColumns = 'auto',
    autoColumns = 'auto',
    autoRows = 'auto',
    autoFlow = 'row',
    ...otherProps
  } = props

  return (
    <div
      data-sl-grid
      ref={ref}
      style={
        {
          '--sl-grid-gap': gap,
          '--sl-grid-templateAreas': templateAreas,
          '--sl-grid-templateRows': templateRows,
          '--sl-grid-templateColumns': templateColumns,
          '--sl-grid-autoColumns': autoColumns,
          '--sl-grid-autoRows': autoRows,
          '--sl-grid-autoFlow': autoFlow,
        } as CSSProperties
      }
      {...otherProps}
    >
      {children}
    </div>
  )
})

export type GridProps = ComponentPropsWithoutRef<'div'> & GridShorthandProps

export interface GridShorthandProps {
  /** Shorthand for CSS gridGap property */
  gap?: CSSProperty.GridGap
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
