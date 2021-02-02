import React, { ChangeEvent } from 'react'
import { IconCaret } from '@vtex/admin-ui-icons'

import { Box } from '../Box'
import { Label } from '../Label'
import { useSystem } from '@vtex/admin-core'
import { SelectProps } from './index'

export function MobileSelect<T>(props: SelectProps<T>) {
  const {
    state,
    label,
    items,
    error,
    disabled,
    block,
    renderItem = (item) => (item as unknown) as string,
  } = props
  const { cn, stylesOf } = useSystem()

  const handleOption = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const selectedItem = items.find(
      (item: T) => renderItem(item) === event.target.value
    )

    selectedItem && state.selectItem(selectedItem)
  }

  return (
    <Box
      themeKey="components.select.mobileContainer"
      styles={block ? { display: 'block', minWidth: 288, width: 'full' } : {}}
    >
      <Label
        styleOverrides={stylesOf(
          `components.select.mobileLabel${
            state.selectedItem ? 'SelectedItem' : ''
          }`
        )}
      >
        {label}
      </Label>
      <select
        value={renderItem(state.selectedItem) ?? ''}
        disabled={disabled}
        onChange={handleOption}
        className={cn(
          stylesOf(`components.select.mobileSelect${error ? 'Error' : ''}`)
        )}
      >
        {!state.selectedItem && <option disabled value="" />}

        {items.map((item: T, index: number) => (
          <option key={`option-${index}`}>{renderItem(item)}</option>
        ))}
      </select>
      <IconCaret
        direction="down"
        size={24}
        styleOverrides={stylesOf('components.select.mobileIcon')}
      />
    </Box>
  )
}
