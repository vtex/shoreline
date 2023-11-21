import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Select as SelectTrigger } from '@ariakit/react'
import './select.css'

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  function Select(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <SelectTrigger
        data-sl-select
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </SelectTrigger>
    )
  }
)

export interface SelectProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
