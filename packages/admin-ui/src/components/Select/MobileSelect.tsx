import type { ChangeEvent } from 'react'
import React from 'react'
import { IconCaret } from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'
import { tag } from '@vtex/admin-ui-react'

import { Label } from '../Label'
import type { SelectProps } from './index'

export function MobileSelect<T>(props: SelectProps<T>) {
  const {
    state,
    label,
    items,
    error,
    disabled,
    block,
    renderItem = (item) => item as unknown as string,
  } = props

  const handleOption = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const selectedItem = items.find(
      (item: T) => renderItem(item) === event.target.value
    )

    selectedItem && state.selectItem(selectedItem)
  }

  return (
    <Box
      csx={{
        position: 'relative',
        width: 288,
        height: 48,
        ...(block
          ? {
              display: 'block',
              minWidth: 288,
              width: 'full',
            }
          : {}),
      }}
    >
      <Label
        csx={{
          position: 'absolute',
          top: '25%',
          lineHeight: 1.5,
          paddingLeft: 3,
          color: 'dark.secondary',
          zIndex: 2,
          ...(state.selectedItem ? { top: 2, text: 'small' } : {}),
        }}
      >
        {label}
      </Label>
      <tag.select
        value={renderItem(state.selectedItem) ?? ''}
        disabled={disabled}
        onChange={handleOption}
        csx={{
          fontFamilly: 'sans',
          color: 'dark.primary',
          outline: 'none',
          fontSize: 1,
          appearance: 'none',
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'mid.secondary',
          borderRadius: 'default',
          paddingTop: '1.125rem',
          paddingLeft: 3,
          width: '100%',
          height: '100%',
          ':focus': {
            borderColor: 'blue',
            boxShadow: 'inputFocus',
          },
          ':disabled': {
            bg: 'light.secondary',
            borderColor: 'mid.primary',
            color: 'dark.primary',
            opacity: 1,
          },
          ':disabled > svg': {
            color: 'dark.secondary',
          },
          ...(error
            ? {
                borderColor: 'red',
                ':focus': {
                  borderColor: 'red',
                  boxShadow: 'inputFocusError',
                },
              }
            : {}),
        }}
      >
        {!state.selectedItem && <option disabled value="" />}

        {items.map((item: T, index: number) => (
          <option key={`option-${index}`}>{renderItem(item)}</option>
        ))}
      </tag.select>
      <IconCaret
        direction="down"
        size={24}
        csx={{
          position: 'absolute',
          right: 12,
          top: '25%',
          color: 'dark.secondary',
        }}
      />
    </Box>
  )
}
