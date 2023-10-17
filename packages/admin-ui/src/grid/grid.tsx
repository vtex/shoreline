import type { ComponentPropsWithRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { ResponsiveProp } from '../use-breakpoint'
import type * as CSS from 'csstype'

import { gridStyle, gridTheme, toResponsiveObject } from './grid.style'
import { cx } from '@vtex/admin-ui-core'

export const Grid = forwardRef(function Grid(
  props: GridProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    gap,
    rowGap,
    columnGap,
    templateAreas,
    templateRows,
    templateColumns,
    className = '',
    ...htmlProps
  } = props

  const responsiveCssProps = gridStyle({
    gap: toResponsiveObject(gap),
    rowGap: toResponsiveObject(rowGap),
    columnGap: toResponsiveObject(columnGap),
    templateRows: toResponsiveObject(templateRows),
    templateColumns: toResponsiveObject(templateColumns),
    templateAreas: toResponsiveObject(templateAreas),
  })

  return (
    <div
      ref={ref}
      style={responsiveCssProps as any}
      className={cx(gridTheme, className)}
      {...htmlProps}
    />
  )
})

export interface GridProps extends ComponentPropsWithRef<'div'> {
  /** Shorthand for CSS gridGap property */
  gap?: ResponsiveProp<CSS.Property.GridGap>
  /** Shorthand for CSS gridRowGap property */
  rowGap?: ResponsiveProp<CSS.Property.GridRowGap>
  /** Shorthand for CSS gridColumnGap property */
  columnGap?: ResponsiveProp<CSS.Property.GridColumnGap>
  /** Shorthand for CSS gridTemplateAreas property */
  templateAreas?: ResponsiveProp<string[]>
  /** Shorthand for CSS gridTemplateRows property */
  templateRows?: ResponsiveProp<CSS.Property.GridTemplateRows>
  /** Shorthand for CSS gridTemplateColumns property */
  templateColumns?: ResponsiveProp<CSS.Property.GridTemplateColumns>
}
