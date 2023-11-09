import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { TooltipAnchor as Anchor } from '@ariakit/react'

/**
 * The anchor of the Tooltip
 * @example
 * <TooltipProvider>
 *  <TooltipAnchor asChild>
 *    <button>i</button>
 *  </TooltipAnchor>
 * </TooltipProvider>
 */
export const TooltipAnchor = forwardRef<HTMLDivElement, TooltipAnchorProps>(
  function TooltipAnchor(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <Anchor
        data-sl-tooltip-anchor
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </Anchor>
    )
  }
)

export interface TooltipAnchorProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}
