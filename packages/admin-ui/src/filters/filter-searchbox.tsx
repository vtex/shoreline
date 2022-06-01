import type { ChangeEvent } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useCombobox } from 'ariakit/combobox'
import type { ComboboxState } from '../combobox'
import { Search } from '..'
import { messages } from './filter.i18n'
import { useMessageFormatter } from '../i18n'

export const FilterSeachbox = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { state, id, ...htmlProps } = props
    const formatMessage = useMessageFormatter(messages.searchBox)

    const comboboxProps = useCombobox({
      state,
      id,
      as: 'form',
    })

    const { onClick: _onClick, ...seachBoxProps } = comboboxProps

    return useElement('div', {
      ...htmlProps,
      children: (
        <Search
          {...seachBoxProps}
          placeholder={formatMessage('searchPlaceholder')}
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
