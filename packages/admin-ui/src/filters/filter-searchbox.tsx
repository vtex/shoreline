import type { ChangeEvent } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useCombobox } from 'ariakit/combobox'

import { Search } from '..'
import { usePopoverContext } from './filter-popover-context'
import type { UseFilterStateReturn } from './filter/filter.state'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'

export const FilterSearchbox = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { state: propState, id, ...htmlProps } = props
    const { state } = usePopoverContext()

    const combobox = propState?.combobox ?? state.combobox

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
  state?: UseFilterStateReturn<any> | UseFilterMultipleReturn<any>
}
