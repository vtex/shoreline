import type { ChangeEvent } from 'react'
import React from 'react'
import { IconCaret } from '@vtex/admin-ui-icons'
import { tag } from '@vtex/admin-ui-react'

import { Box } from '../Box'
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
          color: 'muted',
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
          color: 'base',
          outline: 'none',
          fontSize: 1,
          appearance: 'none',
          backgroundColor: 'field.primary',
          border: '1px solid',
          borderColor: 'field.primary',
          borderRadius: 'default',
          paddingTop: '1.125rem',
          paddingLeft: 3,
          width: '100%',
          height: '100%',
          ':focus': {
            borderColor: 'field.primaryFocus',
            boxShadow: 'ring.primary',
          },
          ':disabled': {
            bg: 'field.disabled',
            borderColor: 'field.disabled',
            color: 'field.disabled',
            opacity: 1,
          },
          ':disabled > svg': {
            color: 'field.disabled',
          },
          ...(error
            ? {
                borderColor: 'field.critical',
                ':hover': {
                  borderColor: 'field.criticalHover',
                },
                ':focus': {
                  borderColor: 'field.criticalFocus',
                  boxShadow: 'ring.critical',
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
          color: 'muted',
        }}
      />
    </Box>
  )
}
