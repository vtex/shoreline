import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { TooltipArrow as Arrow } from '@ariakit/react'

/**
 * Arrow of the Tooltip
 * @example
 * <TooltipProvider>
 *  <TooltipPopover>
 *    <TooltipAnchor />
 *  </TooltipPopover>
 * </TooltipProvider>
 */
export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(
  function TooltipArrow(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <Arrow
        data-sl-tooltip-arrow
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      />
    )
  }
)

export interface TooltipArrowProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}
