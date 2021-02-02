import { ReactNode } from 'react'
import {
  StyleProp,
  useResponsiveValue,
  ResponsiveValue,
  createComponent,
} from '@vtex/admin-core'

import { Overridable } from '../../types'
import { Primitive } from '../Primitive'

export const Set = createComponent(Primitive, useSet)

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

  return {
    themeKey,
    styles: {
      ...styles[variant],
      ...childrenSpacing,
      ...styleOverrides,
    },
    ...layoutProps,
  }
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
