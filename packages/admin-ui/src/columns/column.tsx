import type { ComponentPropsWithRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import type { ResponsiveProp } from '../use-breakpoint'
import { getResponsiveValue, useBreakpoint } from '../use-breakpoint'
import { columnStyle, columnTheme } from './columns.style'

export const Column = forwardRef(function Columns(
  props: ColumnProps,
  ref: Ref<HTMLDivElement>
) {
  const { units, offset = 'none', className = '', ...htmlProps } = props

  const { breakpoint } = useBreakpoint()

  const responsiveUnits = getResponsiveValue(units, breakpoint)
  const responsiveOffset = getResponsiveValue(offset, breakpoint)

  const resolvedOffset = responsiveUnits ? responsiveOffset : 'none'
  const hasUnits = !!responsiveUnits

  return (
    <div
      ref={ref}
      style={columnStyle(responsiveUnits) as any}
      data-offset={resolvedOffset}
      data-units={hasUnits}
      className={cx(columnTheme, className)}
      {...htmlProps}
    />
  )
})

export interface ColumnProps extends ComponentPropsWithRef<'div'> {
  units?: ResponsiveProp<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>
  offset?: ResponsiveProp<'left' | 'right' | 'both' | 'none'>
}
