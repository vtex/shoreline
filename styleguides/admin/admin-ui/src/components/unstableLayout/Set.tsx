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

export const unstableSet = forwardRef(function Input(
  props: SetProps,
  ref: Ref<HTMLElement>
) {
  const {
    orientation = 'horizontal',
    fluid = false,
    spacing = 1,
    ...layoutProps
  } = props

  const responsiveOrientation = useResponsiveValue(orientation)

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
  }[responsiveOrientation]

  const variant = `${responsiveOrientation}${fluid ? '-fluid' : ''}`

  const setProps = useComponent({
    props: {
      ...layoutProps,
      styles: { ...styles[variant], ...childrenSpacing },
    },
    themeKey: 'components.set',
  })

  return createElement({
    component: ReakitBox,
    element: 'div',
    htmlProps: setProps,
    ref,
  })
})
