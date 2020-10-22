/** @jsx jsx */
import { jsx, SxStyleProp } from '@theme-ui/core'
import { forwardRef, Ref, ReactNode } from 'react'
import {
  Button as ReakitButton,
  ButtonProps as ReakitButtonProps,
} from 'reakit'
import { createElement } from '@vtex/admin-ui-system'

import { Variant, Size, Palette } from './types'
import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

export const unstableButton = forwardRef(function Box(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const buttonProps = useButton(props)

  return createElement({
    component: ReakitButton,
    element: 'button',
    htmlProps: buttonProps,
    ref,
  })
})

function useButtonSize({
  size,
  icon,
  iconPosition,
  children,
}: Pick<ButtonProps, 'size' | 'icon' | 'iconPosition' | 'children'>) {
  const iconStart = !!icon && iconPosition === 'start'
  const iconEnd = !!icon && iconPosition === 'end'
  const iconOnly = !!icon && !children

  const containerStyles: SxStyleProp = {
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

export function useButton(props: ButtonProps): ButtonProps {
  const {
    variant = 'filled',
    palette = 'primary',
    size = 'regular',
    iconPosition = 'start',
    icon,
    children: prevChildren,
    ...compoundProps
  } = props

  const { resolvedSize, containerStyles } = useButtonSize({
    size,
    icon,
    iconPosition,
    children: prevChildren,
  })

  const buttonProps = useComponent({
    props: {
      ...compoundProps,
      children: (
        <div
          sx={{
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
        </div>
      ),
    },
    themeKey: `components.button.${variant}-${palette}-${resolvedSize}`,
  })

  return buttonProps
}

export interface ButtonProps extends ReakitButtonProps, Overridable {
  /** Size of the button
   * @default regular
   * */
  size?: Size
  /** Button variant
   * @default filled
   * */
  variant?: Variant
  /**
   * Button palette
   * @default primary
   */
  palette?: Palette
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
