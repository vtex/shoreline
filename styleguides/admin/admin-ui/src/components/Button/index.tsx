import React, { ReactNode } from 'react'
import {
  Button as ReakitButton,
  ButtonProps as ReakitButtonProps,
} from 'reakit/Button'

import { StyleProp, useSystem, jsxs, createComponent } from '@vtex/admin-core'
import { Variant, Size } from './types'
import { SystemComponentProps } from '../../types'
import { Primitive } from '../Primitive'

/**
 * Component that handles all Button variants of the DS.
 * It renders a button jsx element by default
 * @example
 * ```jsx
 * import { Button, ButtonProps } from `@vtex/admin-ui`
 * <Button>Default Button</Button>
 * ```
 */
export const Button = createComponent(ReakitButton, useButton)

export function useButton(props: ButtonProps): ReakitButtonProps {
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
  const { cn } = useSystem()
  const className = cn({
    themeKey: `components.button.${variant}-${resolvedSize}`,
    ...styleOverrides,
  })

  return {
    className,
    children: jsxs(
      Primitive,
      {
        styles: {
          display: 'flex',
          height: 'full',
          width: 'full',
          margin: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          ...containerStyles,
        },
      },
      ...[icon, prevChildren]
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

export interface ButtonProps extends SystemComponentProps<ReakitButtonProps> {
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
