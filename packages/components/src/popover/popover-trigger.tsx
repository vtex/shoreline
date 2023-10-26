import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { PopoverDisclosure } from '@ariakit/react'

/**
 * Triggers popover containers
 *
 * @example
 *  <PopoverProvider>
 *    <PopoverTrigger>Trigger</PopoverTrigger>
 *    <Popover>Content</Popover>
 *  </PopoverProvider>
 */
export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(function PopoverTrigger(props, ref) {
  const { asChild = false, children, ...otherProps } = props

  return (
    <PopoverDisclosure
      data-sl-popover-trigger
      ref={ref}
      render={asChild && (children as any)}
      {...otherProps}
    >
      {children}
    </PopoverDisclosure>
  )
})

export interface PopoverTriggerProps
  extends ComponentPropsWithoutRef<'button'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}
