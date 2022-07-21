import type { ReactNode, Ref } from 'react'
import React from 'react'
import type { UseSelectReturnValue } from 'downshift'
import { useSelect } from 'downshift'
import { IconCaretDown } from '@vtex/phosphor-icons'
import { Box } from '../../box'
import { forwardRef } from '@vtex/admin-ui-util'

import type { ButtonProps } from '../../button'
import { Button } from '../../button'
import { VisuallyHidden } from '../../visually-hidden'
import { Stack } from '../../stack'
import type { SystemComponent } from '../../types'
import * as style from './Dropdown.style'

export const Dropdown = forwardRef(
  <T,>(props: DropdownProps<T>, ref: Ref<HTMLDivElement>) => {
    const {
      items,
      label,
      variant = 'primary',
      size = 'normal',
      state,
      renderItem = (item) => item,
      csx,
      ...buttonProps
    } = props

    return (
      <Box ref={ref} csx={style.container}>
        <VisuallyHidden>
          <label {...state.getLabelProps()}>{label}</label>
        </VisuallyHidden>
        <Button
          variant={variant}
          size={size}
          icon={<IconCaretDown />}
          iconPosition="end"
          {...state.getToggleButtonProps()}
          csx={csx}
          {...buttonProps}
        >
          {renderItem(state.selectedItem)}
        </Button>
        <Stack
          fluid
          {...state.getMenuProps()}
          csx={style.menu({
            visible: state.isOpen,
          })}
        >
          {state.isOpen &&
            items.map((item, index) => (
              <Box
                csx={style.listboxItem({
                  selected: state.highlightedIndex === index,
                })}
                key={index}
                {...state.getItemProps({ item, index })}
              >
                {renderItem(item)}
              </Box>
            ))}
        </Stack>
      </Box>
    )
  }
)

export { useSelect as useDropdownState }
export type { UseSelectReturnValue as UseDropdownReturnValue }

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
