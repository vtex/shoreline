import React, { ReactNode } from 'react'
import { useSelect, UseSelectProps, UseSelectReturnValue } from 'downshift'

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
        palette="primary"
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
        styleOverrides={{
          visibility: state.isOpen ? 'visible' : 'hidden',
          cursor: 'pointer',
          bg: 'background',
          borderRadius: 'default',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'muted.2',
          boxShadow: 'menu',
          outline: 'none',
          marginTop: 1,
          paddingY: 4,
          width: 'max-content',
          position: 'absolute',
          zIndex: 999,
        }}
      >
        {state.isOpen &&
          items.map((item, index) => (
            <Box
              styles={{
                display: 'flex',
                alignItems: 'center',
                height: 24,
                paddingX: 4,
                cursor: 'pointer',
                bg:
                  state.highlightedIndex === index
                    ? 'primary.washed.0'
                    : 'background',
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

export { useSelect as useSelectState }

export function SelectState<T>(
  props: UseSelectProps<T> & {
    children: (state: UseSelectReturnValue<T>) => JSX.Element
  }
) {
  const { children, ...hookParams } = props
  const state = useSelect(hookParams)

  return children(state)
}

export interface SelectButtonProps<T>
  extends Overridable,
    Pick<ButtonProps, 'variant' | 'size' | 'disabled'> {
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
