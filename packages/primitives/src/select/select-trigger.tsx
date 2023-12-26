import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Select } from '@ariakit/react'

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <Select
        data-sl-select
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </Select>
    )
  }
)

export interface SelectTriggerProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
