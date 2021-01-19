import { forwardRef, Ref, ReactNode } from 'react'
import { Box as ReakitBox } from 'reakit/Box'
import {
  StyleProp,
  useResponsiveValue,
  ResponsiveValue,
} from '@vtex/admin-ui-system'

import { jsxs, useSystem } from '../../system'
import { Overridable } from '../../types'

export const Set = forwardRef(function Set(
  props: SetProps,
  ref: Ref<HTMLElement>
) {
  const { setProps } = useSet(props)

  return jsxs({
    component: ReakitBox,
    element: 'div',
    props: setProps,
    ref,
  })
})

export function useSet(props: SetProps) {
  const {
    orientation = 'horizontal',
    fluid = false,
    spacing = 1,
    align = 'start',
    styleOverrides,
    themeKey,
    ...layoutProps
  } = props

  const { cn } = useSystem()
  const currentOrientation = useResponsiveValue(orientation)
  const currentAlign = useResponsiveValue(align)

  const styles: Record<string, StyleProp> = {
    vertical: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: `flex-${currentAlign}`,
    },
    'vertical-fluid': {
      display: 'flex',
      flexDirection: 'column',
    },
    horizontal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: `flex-${currentAlign}`,
    },
  }

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

  const variant = `${currentOrientation}${fluid ? '-fluid' : ''}`

  const className = cn({
    themeKey,
    ...styles[variant],
    ...childrenSpacing,
    ...styleOverrides,
  })

  return { setProps: { ...layoutProps, className }, currentOrientation }
}

export interface SetProps extends Overridable {
  /** component children */
  children?: ReactNode
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
  spacing?: ResponsiveValue<number>
  /**
   * items alignment
   * @default start
   */
  align?: ResponsiveValue<'start' | 'end'>
  /**
   * optional themeKey
   */
  themeKey?: string
}
