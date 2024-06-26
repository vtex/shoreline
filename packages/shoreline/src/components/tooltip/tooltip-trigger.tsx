import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { TooltipAnchor } from '@ariakit/react'

/**
 * The anchor of the Tooltip
 * @example
 * <TooltipProvider>
 *  <TooltipTrigger asChild>
 *    <button>i</button>
 *  </TooltipTrigger>
 * </TooltipProvider>
 */
export const TooltipTrigger = forwardRef<HTMLDivElement, TooltipTriggerProps>(
  function TooltipTrigger(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <TooltipAnchor
        data-sl-tooltip-trigger
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </TooltipAnchor>
    )
  }
)

export interface TooltipTriggerOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type TooltipTriggerProps = TooltipTriggerOptions &
  ComponentPropsWithoutRef<'div'>
