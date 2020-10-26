import { forwardRef, Ref, ReactNode } from 'react'
import { Box as ReakitBox } from 'reakit/Box'
import {
  createElement,
  SxStyleProp,
  useResponsiveValue,
  ResponsiveValue,
} from '@vtex/admin-ui-system'

import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

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
   * @default 1
   */
  spacing?: ResponsiveValue<number>
  /**
   * items alignment
   * @default start
   */
  align?: ResponsiveValue<'start' | 'end'>
}

export const unstableSet = forwardRef(function Set(
  props: SetProps,
  ref: Ref<HTMLElement>
) {
  const { setProps } = useSet(props)

  return createElement({
    component: ReakitBox,
    element: 'div',
    htmlProps: setProps,
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
    ...layoutProps
  } = props

  const currentOrientation = useResponsiveValue(orientation)
  const currentAlign = useResponsiveValue(align)

  const styles: Record<string, SxStyleProp> = {
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
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: `flex-${currentAlign}`,
    },
  }

  const childrenSpacing = {
    horizontal: {
      '> *': {
        marginTop: spacing,
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

  const setProps = useComponent({
    props: {
      ...layoutProps,
      styles: { ...styles[variant], ...childrenSpacing, ...styleOverrides },
    },
    // themeKey: 'components.set',
  })

  return { setProps, currentOrientation }
}
