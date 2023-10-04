import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Button as BaseButton } from '@ariakit/react'
import { cx } from '@vtex/shoreline-utils'

import { buttonStyle } from './button.css'
import { Spinner } from '../spinner'
import { Center } from '../center'

/**
 * Button
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      type = 'button',
      size = 'normal',
      variant = 'secondary',
      loading = false,
      disabled = false,
      className,
      children,
      ...buttonProps
    } = props

    return (
      <BaseButton
        data-sl-button
        aria-busy={loading}
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        disabled={disabled || loading}
        type={type}
        ref={ref}
        className={cx(buttonStyle, className)}
        {...buttonProps}
      >
        {loading && (
          <Center data-sl-button-overlay>
            <Spinner />
          </Center>
        )}
        <span data-sl-button-content>{children}</span>
      </BaseButton>
    )
  }
)

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  /**
   * Increase or decrease padding.
   * @default normal
   */
  size?: 'normal' | 'large'
  /**
   * Change between color combinations.
   * @default 'secondary'
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'critical'
    | 'criticalTertiary'
  /**
   * Disable the button and show a spinner.
   * @default false
   */
  loading?: boolean
}
