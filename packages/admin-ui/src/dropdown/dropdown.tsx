import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import React from 'react'
import type { UseSelectReturnValue } from 'downshift'
import { useSelect } from 'downshift'
import { IconCaretDown } from '@vtex/phosphor-icons'
import { forwardRef } from '@vtex/admin-ui-util'

import type { ButtonProps } from '../button'
import { Button } from '../button'
import { VisuallyHidden } from '../visually-hidden'
import { Stack } from '../stack'
import {
  dropdownContainerTheme,
  dropdownPopoverTheme,
  dropdownItemTheme,
} from './dropdown.style'

export const Dropdown = forwardRef(
  <T,>(props: DropdownProps<T>, ref: Ref<HTMLDivElement>) => {
    const {
      items,
      label,
      variant = 'primary',
      size = 'normal',
      state,
      renderItem = (item) => item,
      ...buttonProps
    } = props

    return (
      <div ref={ref} className={dropdownContainerTheme}>
        <VisuallyHidden>
          <label {...state.getLabelProps()}>{label}</label>
        </VisuallyHidden>
        <Button
          variant={variant}
          size={size}
          icon={<IconCaretDown />}
          iconPosition="end"
          {...state.getToggleButtonProps()}
          {...buttonProps}
        >
          {renderItem(state.selectedItem)}
        </Button>
        <Stack
          fluid
          {...state.getMenuProps()}
          data-visible={state.isOpen}
          className={dropdownPopoverTheme}
        >
          {state.isOpen &&
            items.map((item, index) => (
              <div
                data-selected={state.highlightedIndex === index}
                className={dropdownItemTheme}
                key={index}
                {...state.getItemProps({ item, index })}
              >
                {renderItem(item)}
              </div>
            ))}
        </Stack>
      </div>
    )
  }
)

export { useSelect as useDropdownState }
export type { UseSelectReturnValue as UseDropdownReturnValue }

export interface DropdownProps<T>
  extends ComponentPropsWithoutRef<'button'>,
    Pick<ButtonProps, 'variant' | 'size' | 'disabled'> {
  /**
   * aria-label. will be visually hidden
   */
  label: string
  /**
   * return of useDropdownState
   */
  state: UseSelectReturnValue<T>
  /**
   * array of items
   */
  items: T[]
  /**
   * Custom item rendering
   */
  renderItem?: (item: T | null) => ReactNode
}
