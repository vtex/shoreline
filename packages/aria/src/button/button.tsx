import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { ButtonProps as BaseButtonProps } from '@ariakit/react'
import { Button as BaseButton } from '@ariakit/react'

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const buttonProps = useButton(props)

  return <BaseButton ref={ref} {...buttonProps} />
})

export function useButton(props: ButtonProps): BaseButtonProps {
  const {
    type = 'button',
    size = '',
    variant = '',
    loading = false,
    bleed = 'none',
    icon,
    iconPosition,
    iconOnly,
    ...buttonProps
  } = props

  return {
    'data-sl-button': true,
    'data-variant': variant,
    'data-size': size,
    'data-loading': loading,
    'data-bleed': bleed,
    type,
    ...buttonProps,
  }
}

export interface ButtonProps extends BaseButtonProps {
  size?: string
  variant?: string
  loading?: boolean
  bleed?: 'x' | 'y' | 'xy' | 'none'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  iconOnly?: boolean
}
