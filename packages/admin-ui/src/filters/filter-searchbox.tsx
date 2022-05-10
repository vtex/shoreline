import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Combobox } from 'ariakit/combobox'
import type { ComboboxState } from '../combobox'
import { Search } from '..'
import { messages } from './filter.i18n'
import { useMessageFormatter } from '../i18n'

export const FilterSeachbox = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { state, id, ...htmlProps } = props
    const formatMessage = useMessageFormatter(messages.searchBox)

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
              placeholder={formatMessage('searchPlaceholder')}
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
