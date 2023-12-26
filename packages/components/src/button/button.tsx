import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { Children, forwardRef } from 'react'
import { Button as BaseButton } from '@ariakit/react'
import { Compose, Composable } from '@vtex/shoreline-primitives'

import { Spinner } from '../spinner'
import { Center } from '../center'
import './button.css'

/**
 * @TODO understand why bleed doesn't work correctly on button with icons
 */

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
          render={(node) => (
            <span data-sl-button-content>{spanizeString(node)}</span>
          )}
        >
          {asChild ? children : spanizeString(children)}
        </Composable>
      </Comp>
    )
  }
)

function spanizeString(children: ReactNode) {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return <span>{child}</span>
    }

    return child
  })
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  /**
   * Increase or decrease padding.
   * @default 'normal'
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
