import React, { ReactNode, Ref } from 'react'
import { useSelect, UseSelectReturnValue } from 'downshift'
import { IconCaret } from '@vtex/admin-ui-icons'
import { forwardRef } from '@vtex/admin-core'

import { Button, ButtonProps } from '../Button'
import { VisuallyHidden } from '../VisuallyHidden'
import { Set } from '../Set'
import { Box } from '@vtex/admin-primitives'
import { SystemComponent } from '../../types'

export const Dropdown = forwardRef(
  <T extends unknown>(props: DropdownProps<T>, ref: Ref<HTMLDivElement>) => {
    const {
      items,
      label,
      variant = 'primary',
      size = 'regular',
      state,
      renderItem = (item) => item,
      csx,
      ...buttonProps
    } = props

    return (
      <Box
        ref={ref}
        csx={{
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
          csx={csx}
          {...buttonProps}
        >
          {renderItem(state.selectedItem)}
        </Button>
        <Set
          fluid
          spacing={2}
          orientation="vertical"
          {...state.getMenuProps()}
          csx={{
            themeKey: `components.dropdown.menu${
              state.isOpen ? '-visible' : ''
            }`,
          }}
        >
          {state.isOpen &&
            items.map((item, index) => (
              <Box
                csx={{
                  themeKey: `components.dropdown.item${
                    state.highlightedIndex === index ? '-active' : ''
                  }`,
                  text: 'body',
                }}
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
)

export { useSelect as useDropdownState }
export { UseSelectReturnValue as UseDropdownReturnValue }

export interface DropdownProps<T>
  extends SystemComponent,
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
