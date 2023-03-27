import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { IconContainer } from '@vtex/admin-ui-react'

import { Center } from '../center'
import { Spinner } from '../spinner'
import {
  buttonTheme,
  innerContainerTheme,
  spinnerContainerTheme,
} from './button.css'
import { cx } from '@vtex/admin-ui-core'

/**
 * Button component
 * @example
 * import { Button } from `@vtex/admin-ui`
 * <Button>Button text</Button>
 */
export const Button = forwardRef(
  (props: ButtonProps, ref: React.LegacyRef<HTMLButtonElement>) => {
    const {
      icon,
      size = 'normal',
      variant = 'primary',
      iconPosition: defaultIconPosition = 'start',
      loading = false,
      disabled = false,
      bleedY = false,
      bleedX = false,
      className = '',
      children,
      ...htmlProps
    } = props

    const iconOnly = icon && !children

    const iconPosition = iconOnly ? 'center' : defaultIconPosition

    return (
      <button
        ref={ref}
        data-variant={variant}
        data-size={size}
        data-bleed-x={bleedX}
        data-bleed-y={bleedY}
        disabled={disabled || loading}
        className={cx(buttonTheme, className)}
        {...htmlProps}
      >
        <Center>
          <Center
            data-loading={loading}
            data-icon-position={iconPosition}
            className={innerContainerTheme}
          >
            {icon && (
              <IconContainer
                size={iconPosition === 'end' ? 'small' : 'regular'}
              >
                {icon}
              </IconContainer>
            )}
            {children}
          </Center>
          {loading ? (
            <Center className={spinnerContainerTheme}>
              <Spinner />
            </Center>
          ) : null}
        </Center>
      </button>
    )
  }
)

type ButtonSize = 'normal' | 'large'
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'critical'
  | 'criticalSecondary'
  | 'criticalTertiary'
  | 'neutralTertiary'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /**
   *  Whether is loading
   * @default false
   */
  loading?: boolean
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
   * Vertical bleed
   */
  bleedY?: boolean
  /**
   * Horizontal bleed
   */
  bleedX?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}
