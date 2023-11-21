import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Tooltip } from '@ariakit/react'

import './tooltip-popover.css'

/**
 * Popover of the Tooltip
 * @example
 * <TooltipProvider>
 *  <TooltipPopover>
 *    Text
 *  </TooltipPopover>
 * </TooltipProvider>
 */
export const TooltipPopover = forwardRef<HTMLDivElement, TooltipPopoverProps>(
  function TooltipPopover(props, ref) {
    const { asChild = false, children, gutter = 2, ...otherProps } = props

    return (
      <Tooltip
        data-sl-tooltip-popover
        gutter={gutter}
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </Tooltip>
    )
  }
)

export interface TooltipPopoverProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
  gutter?: number
}
