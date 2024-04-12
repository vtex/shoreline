import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { ComboboxList as List } from '@ariakit/react'

/**
 * Renders a list for the combobox
 */
export const ComboboxList = forwardRef<HTMLDivElement, ComboboxListProps>(
  function ComboboxList(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <List
        data-sl-combobox-list
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      >
        {children}
      </List>
    )
  }
)

export interface ComboboxListOptions extends ComponentPropsWithoutRef<'div'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

export type ComboboxListProps = ComboboxListOptions &
  ComponentPropsWithoutRef<'div'>
