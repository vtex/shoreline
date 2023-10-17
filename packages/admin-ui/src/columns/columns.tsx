import type { ComponentPropsWithRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { SpaceTokens, CSSPropAutocomplete } from '@vtex/admin-ui-core'
import { cx } from '@vtex/admin-ui-core'

import type { ResponsiveProp } from '../use-breakpoint'
import { getResponsiveValue, useBreakpoint } from '../use-breakpoint'
import { columnsStyle, columnsTheme } from './columns.style'

export const Columns = forwardRef(function Columns(
  props: ColumnsProps,
  ref: Ref<HTMLDivElement>
) {
  const { space = '$space-3', className = '', ...htmlProps } = props

  const { breakpoint } = useBreakpoint()

  const responsiveSpace = getResponsiveValue(space, breakpoint)

  return (
    <div
      ref={ref}
      style={columnsStyle(responsiveSpace) as any}
      className={cx(columnsTheme, className)}
      {...htmlProps}
    />
  )
})

export interface ColumnsProps extends ComponentPropsWithRef<'div'> {
  space?: ResponsiveProp<CSSPropAutocomplete<SpaceTokens>>
}
