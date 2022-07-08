import type { ChangeEvent } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useCombobox } from 'ariakit/combobox'
import type { ComboboxState } from '../combobox'
import { Search } from '..'

export const FilterSearchbox = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { state, id, ...htmlProps } = props

    const comboboxProps = useCombobox({
      state,
      id,
      as: 'form',
    })

    const { onClick: _onClick, ...seachBoxProps } = comboboxProps

    return useElement('div', {
      ...htmlProps,
      baseStyle: { margin: '$l' },
      children: (
        <Search
          {...seachBoxProps}
          value={state.value}
          loading={state.status === 'loading'}
          onClear={() => {
            state.setValue('')
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            state.setValue(e.target.value)
          }}
        />
      ),
    })
  }
)

interface ComboboxFieldProps {
  id: string
  state: ComboboxState<any>
}
