import { forwardRef, Ref, ReactNode } from 'react'
import { Box as ReakitBox } from 'reakit/Box'
import {
  SxStyleProp,
  useResponsiveValue,
  ResponsiveValue,
} from '@vtex/admin-ui-system'

import { createElement } from '../../system'
import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

export const Set = forwardRef(function Set(
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
    spacingX,
    spacingY,
    align = 'start',
    styleOverrides,
    themeKey,
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
        marginTop: spacingY ?? spacing,
        marginLeft: spacingX ?? spacing,
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
    themeKey,
  })

  return { setProps, currentOrientation }
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
   * horizontal spacing
   */
  spacingX?: ResponsiveValue<number>
  /**
   * vertical spacing
   * @default 0
   */
  spacingY?: ResponsiveValue<number>
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
