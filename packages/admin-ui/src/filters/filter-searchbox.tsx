import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Combobox } from 'ariakit/combobox'

import type { ComboboxState } from '../combobox'
import { Search } from '..'

export const FilterSeachbox = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { state, id, ...htmlProps } = props

    return useElement('div', {
      ...htmlProps,
      children: (
        <Combobox id={id} state={state}>
          {() => (
            <Search
              state={{
                value: state.value,
                debouncedValue: state.deferredValue,
                setValue: state.setValue,
                loading: state.status === 'loading',
                showClear: state.value !== '',
                clear: () => state.setValue(''),
              }}
              placeholder="Search"
            />
          )}
        </Combobox>
      ),
    })
  }
)

interface ComboboxFieldProps {
  id: string
  state: ComboboxState<any>
}
