import React from 'react'

import { Checkbox } from '../components/Checkbox'
import { BaseFilter } from './filter-base'

import type { UseFilterMultipleReturn } from './filter-multiple.state'
import * as style from './filter.style'

import { ComboboxItem } from '../combobox/combobox-item'
import { FilterSeachbox } from './filter-searchbox'
import { MultipleItemsLabel } from './MultipleItemsLabel'
import { Box } from '..'
import { useMessageFormatter } from '../i18n'
import { messages } from './filter.i18n'

export function FilterMultipleSearch<T>(props: FilterMultipleProps<T>) {
  const formatMessage = useMessageFormatter(messages.searchBox)
  const {
    state: { appliedItems, combobox, baseId, getOptionId, getOptionLabel },
    state,
  } = props

  const isEmpty = !combobox.matches.length

  return (
    <BaseFilter
      state={state}
      appliedValuesLabel={<MultipleItemsLabel appliedItems={appliedItems} />}
    >
      <FilterSeachbox state={combobox} id={`${baseId ?? ''}-search`} />
      {isEmpty && <Box>{formatMessage('noResultsTitle')}</Box>}
      {combobox.matches.map((item) => (
        <ComboboxItem
          aria-selected={combobox.isSelected(item)}
          key={getOptionId(item)}
          onClick={() => combobox.onChange(item)}
          style={style.option}
          id={`${baseId ?? ''}-item-${getOptionId(item)}`}
        >
          <Checkbox
            checked={combobox.isSelected(item)}
            aria-checked={undefined}
            csx={{ marginRight: '$s' }}
            readOnly
          />
          {getOptionLabel(item)}
        </ComboboxItem>
      ))}
    </BaseFilter>
  )
}

export interface FilterMultipleProps<T> {
  state: UseFilterMultipleReturn<T>
}
