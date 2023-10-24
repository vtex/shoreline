import React, { forwardRef } from 'react'
import type { ButtonProps } from '../button'
import { Button } from '../button'

/**
 * Specific button used for contextual actions
 * @example
 * <Action>Label</Action>
 */
export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  function Action(props, ref) {
    const { vertical = true, ...otherProps } = props

    return (
      <Button data-sl-action ref={ref} variant="tertiary" {...otherProps} />
    )
  }
)

export interface ActionProps extends Omit<ButtonProps, 'variant'> {
  vertical?: boolean
}
