import React, { forwardRef, Ref, ReactNode } from 'react'
import {
  Button as ReakitButton,
  ButtonProps as ReakitButtonProps,
} from 'reakit/Button'
import { useClassName } from '@vtex/admin-ui-system'

import { jsx, StyleProp } from '../../system'
import { Variant, Size } from './types'
import { Overridable, OmitNotAllowedProps } from '../../types'
import { Box } from '../Box'

/**
 * Component that handles all Button variants of the DS.
 * It renders a button jsx element by default
 * @example
 * ```jsx
 * import { Button, ButtonProps } from `@vtex/admin-ui`
 * <Button>Default Button</Button>
 * ```
 */
export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const buttonProps = useButton(props)

  return jsx({
    component: ReakitButton,
    element: 'button',
    props: buttonProps,
    ref,
  })
})

export function useButton(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'regular',
    iconPosition = 'start',
    icon,
    children: prevChildren,
    styleOverrides,
    ...compoundProps
  } = props

  const { resolvedSize, containerStyles } = useButtonSize({
    size,
    icon,
    iconPosition,
    children: prevChildren,
  })

  const className = useClassName({
    themeKey: `components.button.${variant}-${resolvedSize}`,
    ...styleOverrides,
  })

  return {
    className,
    children: (
      <Box
        styles={{
          display: 'flex',
          height: 'full',
          width: 'full',
          margin: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          ...containerStyles,
        }}
      >
        {icon}
        {prevChildren}
      </Box>
    ),
    ...compoundProps,
  }
}

function useButtonSize({
  size,
  icon,
  iconPosition,
  children,
}: Pick<ButtonProps, 'size' | 'icon' | 'iconPosition' | 'children'>) {
  const iconStart = !!icon && iconPosition === 'start'
  const iconEnd = !!icon && iconPosition === 'end'
  const iconOnly = !!icon && !children

  const containerStyles: StyleProp = {
    flexDirection: iconEnd ? 'row-reverse' : 'row',
  }

  const resolvedSize = `${size}${
    iconOnly ? `-icon` : iconStart || iconEnd ? `-icon-${iconPosition}` : ''
  }`

  return {
    resolvedSize,
    containerStyles,
  }
}

export interface ButtonProps
  extends OmitNotAllowedProps<ReakitButtonProps>,
    Overridable {
  /** Size of the button
   * @default regular
   * */
  size?: Size
  /** Button variant
   * @default primary
   * */
  variant?: Variant
  /**
   * Icon of the button
   */
  icon?: ReactNode
  /**
   * Position of the icon
   * @default start
   */
  iconPosition?: 'start' | 'end'
  /**
   * React children
   * Also support render prop
   */
  children?: React.ReactNode | ((props: ButtonProps) => React.ReactNode)
}
