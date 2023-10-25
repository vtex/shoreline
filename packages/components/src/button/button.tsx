import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Button as BaseButton } from '@ariakit/react'

import { Spinner } from '../spinner'
import { Center } from '../center'
import { Compose, Composable } from '../compose'

/**
 * Buttons triggers allow users to identify and start the most important actions in a container.
 * @example
 * <Button>Action label</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      type = 'button',
      size = 'normal',
      variant = 'secondary',
      loading = false,
      asChild = false,
      disabled = false,
      iconOnly = false,
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
        data-icon-only={iconOnly}
        data-loading={loading}
        type={type}
        disabled={disabled || loading}
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
   * Adjust padding to force a square button
   * @default false
   */
  iconOnly?: boolean
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
