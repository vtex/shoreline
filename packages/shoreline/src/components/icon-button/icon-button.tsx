import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { AccessibleIcon } from '../accessible-icon'

import type { ButtonOptions } from '../button'
import { Button } from '../button'

/**
 * Icon Buttons represent minor actions in a flow. It includes a label only for accessibility that is not visible, so the icon must be recognizable by itself.
 * @status stable
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

export interface IconButtonOptions extends ButtonOptions {
  /**
   * Icon button label. Needed for accessibility.
   */
  label: ReactNode
}

export type IconButtonProps = IconButtonOptions &
  ComponentPropsWithoutRef<'button'>
