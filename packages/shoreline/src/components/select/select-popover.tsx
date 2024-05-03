import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import type { SelectPopoverOptions as PopoverOptions } from '@ariakit/react'
import { SelectPopover as Popover } from '@ariakit/react'

/**
 * Popover box of Select
 */
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

export interface SelectPopoverOptions extends PopoverOptions {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

export type SelectPopoverProps = SelectPopoverOptions &
  ComponentPropsWithoutRef<'div'>
