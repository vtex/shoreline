import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { ComboboxPopoverOptions as AriakitComboboxPopoverOptions } from '@ariakit/react'
import { ComboboxPopover as Popover } from '@ariakit/react'

/**
 * Renders a popover for the combobox
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

export interface ComboboxPopoverOptions
  extends Pick<AriakitComboboxPopoverOptions, 'sameWidth'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

export type ComboboxPopoverProps = ComboboxPopoverOptions &
  ComponentPropsWithoutRef<'div'>
