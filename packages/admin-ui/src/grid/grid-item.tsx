import type { ComponentPropsWithRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import type * as CSS from 'csstype'
import type { ResponsiveProp } from '@vtex/admin-ui-react'
import { gridItemStyle, gridItemTheme, toResponsiveObject } from './grid.css'
import { cx } from '@vtex/admin-ui-core'

export const GridItem = forwardRef(function Grid(
  props: GridItemProps,
  ref: Ref<HTMLDivElement>
) {
  const { area, className = '', ...htmlProps } = props

  const responsiveCssProps = gridItemStyle({
    area: toResponsiveObject(area),
  })

  return (
    <div
      ref={ref}
      style={responsiveCssProps as any}
      className={cx(gridItemTheme, className)}
      {...htmlProps}
    />
  )
})

export interface GridItemProps extends ComponentPropsWithRef<'div'> {
  /** Shorthand for CSS gridArea property */
  area?: ResponsiveProp<CSS.Property.GridArea>
}
