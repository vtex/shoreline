import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'
import type { ButtonProps } from '../button'
import { Button } from '../button'
import { AccessibleIcon } from '../accessible-icon'

import { iconButtonStyle } from './icon-button.css'

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const { className, label, children, ...buttonProps } = props

    return (
      <Button
        ref={ref}
        data-sl-icon-button
        className={cx(iconButtonStyle, className)}
        {...buttonProps}
      >
        <AccessibleIcon label={label}>{children}</AccessibleIcon>
      </Button>
    )
  }
)

export interface IconButtonProps extends ButtonProps {
  label: string
}
