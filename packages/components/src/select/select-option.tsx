import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { SelectItem } from '@ariakit/react'
import { SelectOptionCheck } from './select-option-check'

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  function SelectOption(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <SelectItem
        data-sl-select-option
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
        <SelectOptionCheck />
      </SelectItem>
    )
  }
)

export interface SelectOptionProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Option value
   */
  value?: string
}
