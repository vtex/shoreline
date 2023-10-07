import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Button as BaseButton } from '@ariakit/react'
import { cx } from '@vtex/shoreline-utils'

import { buttonStyle } from './button.css'
import { Spinner } from '../spinner'
import { Center } from '../center'
import { Compose, Composable } from '../compose'

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
      asChild = false,
      className,
      children,
      ...buttonProps
    } = props

    const Comp = asChild ? Compose : BaseButton

    return (
      <Comp
        ref={ref}
        aria-busy={loading}
        data-sl-button
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        className={cx(buttonStyle, className)}
        {...buttonProps}
      >
        {loading && (
          <Center data-sl-button-overlay>
            <Spinner />
          </Center>
        )}
        <Composable
          render={(node) => <span data-sl-button-content>{node}</span>}
        >
          {children}
        </Composable>
      </Comp>
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
  /**
   * Merge button props with immediate child.
   * @default false
   */
  asChild?: boolean
}
