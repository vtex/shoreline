import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Tooltip } from '@ariakit/react'

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

export interface TooltipPopoverOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Distance (in px) from the trigger reference
   * @default 2
   */
  gutter?: number
}

export type TooltipPopoverProps = TooltipPopoverOptions &
  ComponentPropsWithoutRef<'div'>
