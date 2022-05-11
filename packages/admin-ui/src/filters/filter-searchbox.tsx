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

    // it seems like search doesnt currently accept html props
    const comboboxProps: any = useCombobox({
      state,
      id,
    } as any)

    return useElement('div', {
      ...htmlProps,
      children: (
        <Search
          {...comboboxProps}
          placeholder={formatMessage('searchPlaceholder')}
          state={{
            value: state.value,
            debouncedValue: state.deferredValue,
            setValue: state.setValue,
            loading: state.status === 'loading',
            showClear: state.value !== '',
            clear: () => state.setValue(''),
            // test
            onSubmit: () => {},
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
