import type { ReactNode, Ref } from 'react'
import React from 'react'
import { useSelect, UseSelectReturnValue } from 'downshift'
import { IconCaret } from '@vtex/admin-ui-icons'
import { Box } from '../Box'
import { forwardRef } from '@vtex/admin-ui-util'

import type { ButtonProps } from '../Button'
import { Button } from '../Button'
import { VisuallyHidden } from '../VisuallyHidden'
import { Set } from '../Set'
import type { SystemComponent } from '../../types'

export const Dropdown = forwardRef(
  <T,>(props: DropdownProps<T>, ref: Ref<HTMLDivElement>) => {
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
            visibility: state.isOpen ? 'visible' : 'hidden',
            cursor: 'pointer',
            bg: 'light.primary',
            borderRadius: 'default',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'mid.secondary',
            boxShadow: 'menu',
            outline: 'none',
            marginTop: 1,
            paddingY: 4,
            minWidth: 'inherit',
            width: 'max-content',
            position: 'absolute',
            zIndex: 999,
          }}
        >
          {state.isOpen &&
            items.map((item, index) => (
              <Box
                csx={{
                  text: 'body',
                  display: 'flex',
                  alignItems: 'center',
                  height: 24,
                  paddingX: 4,
                  cursor: 'pointer',
                  bg:
                    state.highlightedIndex === index
                      ? 'blue.secondary'
                      : 'light.primary',
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
