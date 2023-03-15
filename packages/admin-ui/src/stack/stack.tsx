import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef, Children } from 'react'
import type { ResponsiveProp } from '@vtex/admin-ui-react'
import { useBreakpoint, getResponsiveValue } from '@vtex/admin-ui-react'
import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'
import { cx } from '@vtex/admin-ui-core'
import { stackChildTheme, stackStyle, stackTheme } from './stack.css'

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
    className = '',
    children,
    ...htmlProps
  } = props

  const { breakpoint } = useBreakpoint()

  const responsiveDirection = getResponsiveValue(direction, breakpoint)
  const responsiveFluid = getResponsiveValue(fluid, breakpoint)
  const responsiveAlign = getResponsiveValue(align, breakpoint)
  const responsiveSpace = getResponsiveValue(space, breakpoint)

  return (
    <div
      ref={ref}
      {...htmlProps}
      data-direction={responsiveDirection}
      data-fluid={responsiveFluid}
      style={stackStyle(responsiveAlign, responsiveSpace) as any}
      className={cx(stackTheme, className)}
    >
      {Children.map(children, (child, index) => {
        const isFirstChild = index === 0

        if (child === null) return null

        return (
          <div
            key={`stack-${index}`}
            data-direction={responsiveDirection}
            data-firstchild={isFirstChild}
            className={stackChildTheme}
          >
            {child}
          </div>
        )
      })}
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
