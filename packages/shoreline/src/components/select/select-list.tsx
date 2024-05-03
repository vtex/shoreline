import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { SelectList as List } from '@ariakit/react'

/**
 * List that wraps the SelectItems
 */
export const SelectList = forwardRef<HTMLDivElement, SelectListProps>(
  function SelectList(props, ref) {
    const {
      asChild = false,
      alwaysVisible = false,
      children,
      ...otherProps
    } = props

    return (
      <List
        data-sl-select-list
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        alwaysVisible={alwaysVisible}
        {...otherProps}
      >
        {children}
      </List>
    )
  }
)

export interface SelectListOptions {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
  /**
   *
   * @default false
   */
  alwaysVisible?: boolean
}

export type SelectListProps = SelectListOptions &
  ComponentPropsWithoutRef<'div'>
