import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { ComboboxPopoverOptions } from '@ariakit/react'
import { ComboboxPopover as Popover } from '@ariakit/react'

/**
 * Renders a popover for the combobox
 *
 * @kind primitives
 */
export const ComboboxPopover = forwardRef<HTMLDivElement, ComboboxPopoverProps>(
  function ComboboxPopover(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <Popover
        data-sl-combobox-popover
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </Popover>
    )
  }
)

type Options = Pick<ComboboxPopoverOptions, 'sameWidth'>

export interface ComboboxPopoverProps
  extends ComponentPropsWithoutRef<'div'>,
    Options {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
