import type { ComponentPropsWithoutRef } from 'react'
import { useElement, createHook, createComponent } from '@vtex/admin-ui-react'
import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'

import type { ResponsiveProp } from './responsive'
import { useBreakpoint, getResponsiveValue } from './responsive'

/**
 * Stack behavior
 * @example
 * const stackProps = useStack({})
 */
export const useStack = createHook<'div', StackOptions>((props) => {
  const {
    direction = 'column',
    fluid = false,
    align = 'start',
    space = '$m',
    ...htmlProps
  } = props

  const { breakpoint } = useBreakpoint()

  const responsiveDirection = getResponsiveValue(direction, breakpoint)
  const repsponsiveFluid = getResponsiveValue(fluid, breakpoint)
  const repsponsiveAlign = getResponsiveValue(align, breakpoint)
  const responsiveSpace = getResponsiveValue(space, breakpoint)
  const isColumn = responsiveDirection === 'column'
  const spaceProp = isColumn ? 'marginTop' : 'marginLeft'

  return {
    ...htmlProps,
    baseStyle: {
      display: 'flex',
      flexDirection: responsiveDirection,
      alignItems: repsponsiveFluid
        ? 'unset'
        : isColumn
        ? repsponsiveAlign
        : 'center',
      justifyContent: repsponsiveFluid
        ? 'unset'
        : isColumn
        ? 'unset'
        : repsponsiveAlign,
      '> *:not(:first-child)': {
        [spaceProp]: responsiveSpace,
      },
    },
  }
})

/**
 * Component used to display a set of components that are spaced evenly.
 * @example
 * <Stack>
 *  <Button />
 *  <Button />
 * </Stack>
 */
export const Stack = createComponent<'div', StackOptions>((props) => {
  const stackProps = useStack(props)

  return useElement('div', stackProps)
})

export interface StackOptions {
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

export type StackProps = ComponentPropsWithoutRef<typeof Stack> & StackOptions
