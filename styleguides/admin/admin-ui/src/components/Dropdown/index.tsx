import React, { ReactNode } from 'react'
import { useSelect, UseSelectReturnValue } from 'downshift'
import { IconCaret } from '@vtex/admin-ui-icons'

import { Button, ButtonProps } from '../Button'
import { VisuallyHidden } from '../VisuallyHidden'
import { Overridable } from '../../types'
import { Set } from '../Set'
import { Box } from '../Box'

export function Dropdown<T>(props: DropdownProps<T>) {
  const {
    items,
    label,
    variant = 'primary',
    size = 'regular',
    state,
    renderItem = (item) => item,
    ...buttonProps
  } = props

  return (
    <Box
      styles={{
        position: 'relative',
      }}
    >
      <VisuallyHidden>
        <label {...state.getLabelProps()}>{label}</label>
      </VisuallyHidden>
      <Button
        variant={variant}
        size={size}
        icon={<IconCaret direction="down" />}
        iconPosition="end"
        {...state.getToggleButtonProps()}
        {...buttonProps}
      >
        {renderItem(state.selectedItem)}
      </Button>
      <Set
        fluid
        spacing={2}
        orientation="vertical"
        {...state.getMenuProps()}
        themeKey={`components.dropdown.menu${state.isOpen ? '-visible' : ''}`}
      >
        {state.isOpen &&
          items.map((item, index) => (
            <Box
              text="body"
              themeKey={`components.dropdown.item${
                state.highlightedIndex === index ? '-active' : ''
              }`}
              key={index}
              {...state.getItemProps({ item, index })}
            >
              {renderItem(item)}
            </Box>
          ))}
      </Set>
    </Box>
  )
}

export { useSelect as useDropdownState }
export { UseSelectReturnValue as UseDropdownReturnValue }

export interface DropdownProps<T>
  extends Overridable,
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
