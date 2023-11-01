import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { PopoverDismiss as Dismiss } from '@ariakit/react'

/**
 * Dismiss the Popover
 * @example
 * <PopoverProvider>
 *  <Popover>
 *    <PopoverDismiss>Dismiss</PopoverDismiss>
 *  </Popover>
 * </PopoverProvider>
 */
export const PopoverDismiss = forwardRef<
  HTMLButtonElement,
  PopoverDismissProps
>(function PopoverDismiss(props, ref) {
  const { children, asChild = false, ...otherProps } = props

  return (
    <Dismiss
      data-sl-popover-dismiss
      ref={ref}
      render={asChild && (children as any)}
      {...otherProps}
    >
      {children}
    </Dismiss>
  )
})

export interface PopoverDismissProps
  extends ComponentPropsWithoutRef<'button'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}
