import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import type { ComboboxItemOptions as AriakitComboboxItemOptions } from '@ariakit/react'
import { ComboboxItem as Item } from '@ariakit/react'

/**
 * Renders an item for the combobox
 */
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

export interface ComboboxItemOptions
  extends Pick<AriakitComboboxItemOptions, 'value' | 'disabled'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

export type ComboboxItemProps = ComboboxItemOptions &
  ComponentPropsWithoutRef<'div'>
