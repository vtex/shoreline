import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { ButtonProps } from '../button'
import { Button } from '../button'
import { IconButton } from '../icon-button'

/**
 * Specific button used for contextual actions
 * @example
 * <Action>Label</Action>
 */
export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  function Action(props, ref) {
    const { vertical = true, iconOnly, label, ...otherProps } = props

    if (iconOnly) {
      return (
        <IconButton
          data-sl-action
          ref={ref}
          variant="tertiary"
          label={label}
          {...otherProps}
        />
      )
    }

    return (
      <Button data-sl-action ref={ref} variant="tertiary" {...otherProps} />
    )
  }
)

export type ActionProps = Omit<ButtonProps, 'variant'> & {
  iconOnly?: boolean
  label?: ReactNode
  vertical?: boolean
}
