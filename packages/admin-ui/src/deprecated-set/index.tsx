import type { ComponentPropsWithoutRef } from 'react'
import type { ResponsiveValue } from '@vtex/admin-ui-react'
import { jsx, useResponsiveValue } from '@vtex/admin-ui-react'

/**
 * Component used to display a set of components that are spaced evenly.
 * @deprecated Use Stack instead
 * @see https://admin-ui.vercel.app/guidelines/components/stack
 */
export const Set = jsx('div')(
  {
    display: 'flex',
  },
  {
    options: ['orientation', 'fluid', 'spacing', 'align'],
    useOptions(options: SetOptions, props) {
      const {
        orientation = 'horizontal',
        fluid = false,
        spacing = 1,
        align = 'start',
      } = options

      const { csx, ...layoutProps } = props

      const currentOrientation = useResponsiveValue(orientation)
      const currentAlign = useResponsiveValue(align)
      const isVertical = currentOrientation === 'vertical'

      const childrenSpacing = {
        horizontal: {
          '> *:not(:first-child)': {
            marginLeft: spacing,
          },
        },
        vertical: {
          '> *:not(:last-child)': {
            marginBottom: spacing,
          },
        },
      }[currentOrientation]

      return {
        ...layoutProps,
        csx: {
          flexDirection: isVertical ? 'column' : 'row',
          alignItems: fluid ? 'unset' : isVertical ? currentAlign : 'center',
          justifyContent: fluid ? 'unset' : isVertical ? 'unset' : currentAlign,
          ...childrenSpacing,
          ...csx,
        },
      }
    },
  }
)

export interface SetOptions {
  /**
   * orientation of items
   * @default vertical
   */
  orientation?: ResponsiveValue<'vertical' | 'horizontal'>
  /**
   * if the items should grow in width to match the container
   * @default false
   */
  fluid?: boolean
  /**
   * space between items
   * @default 0
   */
  spacing?: ResponsiveValue<number> | string
  /**
   * items alignment
   * @default start
   */
  align?: ResponsiveValue<'start' | 'end'>
}

export type SetProps = ComponentPropsWithoutRef<typeof Set> & SetOptions
