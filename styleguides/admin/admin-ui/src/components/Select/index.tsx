/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactNode } from 'react'
// import { useClassName, SxStyleProp } from '@vtex/admin-ui-system'
import { useSelect } from 'downshift'

import { Overridable } from '../../types'
import { cn, get } from '../../system'
import { Set } from '../Set'
import { Box } from '../Box'
import { Label } from '../Label'

export function Select(props: SelectProps) {
  const { items, label } = props
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items })

  const labelSelected = selectedItem
    ? {
        transform: 'translate(4px, 4px) scale(0.875)',
        color: 'primary.base',
      }
    : {}

  return (
    <div
      className={cn({
        display: 'flex',
        position: 'relative',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      })}
    >
      <Label
        styleOverrides={{
          fontSize: 1,
          paddingX: 4,
          paddingTop: 2,
          color: 'muted.1',
          marginBottom: 3,
          pointerEvents: 'none',
          position: 'absolute',
          transform: 'translate(0, 16px) scale(1)',
          transformOrigin: 'top left',
          transition: 'all 0.2s ease-out;',
          ...labelSelected,
        }}
        {...getLabelProps()}
      >
        {label}
      </Label>
      <button
        className={cn({
          bg: 'background',
          cursor: 'pointer',
          textAlign: 'start',
          fontVariationSettings: '"wght" 92',
          width: 'full',
          height: 48,
          paddingTop: 4,
          paddingX: 4,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'muted.3',
          borderRadius: 4,
          marginY: 1,
          fontSize: 1,
          color: 'text',
          outline: 0,
          transition: 'pop',
          ':hover': {
            borderColor: 'muted.2',
          },
          ':focus': {
            borderColor: 'primary.base',
            boxShadow: (theme) =>
              `inset 0 0 0 1px  ${get(theme, 'colors.primary.base')}`,
          },
        })}
        {...getToggleButtonProps()}
      >
        {selectedItem}
      </button>
      <Set
        orientation="vertical"
        spacingX={0}
        spacingY={1}
        fluid
        {...getMenuProps()}
        styleOverrides={{
          cursor: 'pointer',
          visibility: isOpen ? 'visible' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bg: 'background',
          borderRadius: 'default',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'muted.2',
          boxShadow: 'menu',
          outline: 'none',
          paddingY: 1,
        }}
      >
        {isOpen &&
          items.map((item, index) => (
            <Box
              styles={{
                display: 'flex',
                alignItems: 'center',
                height: 24,
                paddingX: 3,
                cursor: 'pointer',
                bg:
                  highlightedIndex === index
                    ? 'primary.washed.0'
                    : 'background',
              }}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </Box>
          ))}
      </Set>
    </div>
  )
}

export interface SelectProps extends Overridable {
  items: string[]
  label?: ReactNode
  variant?: 'primary' | 'tertiary'
}
