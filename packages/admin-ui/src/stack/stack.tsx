import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { ResponsiveProp } from '@vtex/admin-ui-react'
import { useBreakpoint, getResponsiveValue } from '@vtex/admin-ui-react'
import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'
import { stackStyle, stackTheme } from './stack.css'

/**
 * Component used to display a set of components that are spaced evenly.
 * @example
 * <Stack space="$space-3">
 *  <Button />
 *  <Button />
 * </Stack>
 */
export const Stack = forwardRef(function Stack(
  props: StackProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    direction = 'column',
    fluid = false,
    align = 'start',
    space = '$space-1',
    children,
    ...htmlProps
  } = props

  const { breakpoint } = useBreakpoint()

  const responsiveDirection = getResponsiveValue(direction, breakpoint)
  const responsiveFluid = getResponsiveValue(fluid, breakpoint)
  const responsiveAlign = getResponsiveValue(align, breakpoint)
  const responsiveSpace = getResponsiveValue(space, breakpoint)

  return (
    <div ref={ref} {...htmlProps}>
      <div
        className={stackTheme}
        data-direction={responsiveDirection}
        data-fluid={responsiveFluid}
        style={stackStyle(responsiveAlign, responsiveSpace) as any}
      >
        {children}
      </div>
    </div>
  )
})

export type StackProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * direction of items
   * @default column
   */
  direction?: ResponsiveProp<'column' | 'row'>
  /**
   * if the items should grow in width to match the container
   * @default false
   */
  fluid?: ResponsiveProp<boolean>
  /**
   * space between items
   * @default 0
   */
  space?: ResponsiveProp<CSSPropAutocomplete<SpaceTokens>>
  /**
   * items alignment
   * @default start
   */
  align?: ResponsiveProp<'start' | 'end'>
}
