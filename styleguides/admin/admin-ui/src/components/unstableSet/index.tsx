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
  children?: ReactNode
  orientation?: ResponsiveValue<'vertical' | 'horizontal'>
  fluid?: boolean
  spacing?: ResponsiveValue<number>
}

export const unstableSet = forwardRef(function Input(
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
    ...layoutProps
  } = props

  const currentOrientation = useResponsiveValue(orientation)

  const styles: Record<string, SxStyleProp> = {
    vertical: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    'vertical-fluid': {
      display: 'flex',
      flexDirection: 'column',
    },
    horizontal: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
      styles: { ...styles[variant], ...childrenSpacing },
    },
    // themeKey: 'components.set',
  })

  return { setProps, currentOrientation }
}
