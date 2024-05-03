import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { SelectItem as Item } from '@ariakit/react'

import { SelectItemCheck } from './select-item-check'

/**
 * Option of the Select
 */
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(props, ref) {
    const { asChild = false, children, hideOnClick, ...domProps } = props

    return (
      <Item
        data-sl-select-item
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        hideOnClick={hideOnClick}
        {...domProps}
      >
        <SelectItemCheck />
        <span>{children}</span>
      </Item>
    )
  }
)

export interface SelectItemOptions {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Option value
   */
  value?: string
  /**
   * Whether to hide the select when this item is clicked. By default, it's true when the value prop is also provided.
   * @default true
   */
  hideOnClick?: boolean
}

export type SelectItemProps = SelectItemOptions &
  ComponentPropsWithoutRef<'div'>
