import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { AccessibleIcon } from '@vtex/shoreline-primitives'

import type { ButtonProps } from '../button'
import { Button } from '../button'

/**
 * A button designed specifically for usage with a single icon.
 * @example
 * <IconButton label="Delete">
 *  <IconTrash />
 * </IconButton>
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const { label, children, asChild, ...buttonProps } = props

    return (
      <Button ref={ref} data-sl-icon-button asChild={asChild} {...buttonProps}>
        {asChild ? (
          children
        ) : (
          <AccessibleIcon label={label}>{children}</AccessibleIcon>
        )}
      </Button>
    )
  }
)

export interface IconButtonProps extends ButtonProps {
  /**
   * Icon button label. Needed for accessibility.
   */
  label: ReactNode
}
