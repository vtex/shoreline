import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { SelectPopover as Popover } from '@ariakit/react'

import './select-popover.css'

export const SelectPopover = forwardRef<HTMLDivElement, SelectPopoverProps>(
  function SelectPopover(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <Popover
        data-sl-select-popover
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </Popover>
    )
  }
)

export interface SelectPopoverProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
