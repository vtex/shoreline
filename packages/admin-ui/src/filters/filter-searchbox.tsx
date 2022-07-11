import type { ChangeEvent } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useCombobox } from 'ariakit/combobox'

import { Search } from '..'
import { usePopoverContext } from './filter-popover-context'

export const FilterSearchbox = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { id, ...htmlProps } = props
    const {
      state: { combobox },
    } = usePopoverContext()

    const comboboxProps = useCombobox({
      state: { ...combobox, matches: [] },
      id,
      as: 'form',
    })

    const { onClick: _onClick, ...seachBoxProps } = comboboxProps
    const { setValue, value, status } = combobox

    return useElement('div', {
      ...htmlProps,
      baseStyle: { margin: '$l' },
      children: (
        <Search
          {...seachBoxProps}
          value={value}
          loading={status === 'loading'}
          onClear={() => {
            setValue('')
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
          }}
        />
      ),
    })
  }
)

interface ComboboxFieldProps {
  id: string
}
