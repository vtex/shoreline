import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { SelectItem, useSelectContext } from '@ariakit/react'
import { SelectOptionCheck } from './select-option-check'

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  function SelectOption(props, ref) {
    const { asChild = false, children, ...otherProps } = props
    const context = useSelectContext()

    console.log({
      context,
      state: context?.getState(),
    })

    return (
      <SelectItem
        data-sl-select-item
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
