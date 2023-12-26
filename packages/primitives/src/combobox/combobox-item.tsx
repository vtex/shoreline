import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { ComboboxItemOptions } from '@ariakit/react'
import { ComboboxItem as Item } from '@ariakit/react'

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  function ComboboxItem(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <Item
        data-sl-combobox-item
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </Item>
    )
  }
)

type Options = Pick<ComboboxItemOptions, 'value' | 'disabled'>

export interface ComboboxItemProps
  extends ComponentPropsWithoutRef<'div'>,
    Options {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
