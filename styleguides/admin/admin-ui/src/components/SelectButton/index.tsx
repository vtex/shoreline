import React, { ReactNode } from 'react'
import { useSelect, UseSelectReturnValue } from 'downshift'

import { Button, ButtonProps } from '../Button'
import { VisuallyHidden } from '../VisuallyHidden'
import { Overridable } from '../../types'
import { Set } from '../Set'
import { Box } from '../Box'
import { IconCaret } from '../../icons'

export function SelectButton<T>(props: SelectButtonProps<T>) {
  const {
    items,
    label,
    variant = 'text',
    size = 'regular',
    state,
    renderItem = (item) => item,
    palette = 'primary',
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
        palette={palette}
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
        orientation="vertical"
        spacingX={0}
        spacingY={2}
        {...state.getMenuProps()}
        themeKey={`components.selectButton.menu${
          state.isOpen ? '-visible' : ''
        }`}
      >
        {state.isOpen &&
          items.map((item, index) => (
            <Box
              text="body"
              themeKey={`components.selectButton.item${
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

export { useSelect as useSelectState }

export interface SelectButtonProps<T>
  extends Overridable,
    Pick<ButtonProps, 'variant' | 'size' | 'disabled' | 'palette'> {
  /**
   * aria-label. will be visually hidden
   */
  label: string
  /**
   * return of useSelectState
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
