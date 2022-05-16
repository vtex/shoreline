import React from 'react'

import { BaseFilter } from './filter-base'
import { ComboboxItem } from '../combobox/combobox-item'
import { FilterRadio } from './filter-radio'
import { FilterSeachbox } from './filter-searchbox'
import { SingleItemLabel } from './SingleItemLabel'
import { Box } from '..'
import { useMessageFormatter } from '../i18n'
import type { FilterProps } from '.'

import { messages } from './filter.i18n'
import * as style from './filter.style'

export function FilterSearch<T>(props: FilterProps<T>) {
  const formatMessage = useMessageFormatter(messages.searchBox)
  const {
    state: { combobox, appliedItem, baseId, getOptionId, getOptionLabel },
    state,
  } = props

  const currentSelectedId = combobox.selectedItem
    ? getOptionId(combobox.selectedItem)
    : null

  const isEmpty = !combobox.matches.length

  return (
    <BaseFilter
      state={state}
      appliedValuesLabel={
        appliedItem && (
          <SingleItemLabel appliedItem={appliedItem} state={state} />
        )
      }
    >
      {<FilterSeachbox state={combobox} id={`${baseId ?? ''}-search`} />}
      {isEmpty && <Box>{formatMessage('noResultsTitle')}</Box>}
      {combobox.matches.map((item) => {
        const itemId = getOptionId(item)

        return (
          <ComboboxItem
            aria-selected={itemId === currentSelectedId}
            key={itemId}
            value={itemId}
            focusOnHover
            hideOnClick={false}
            onClick={() => combobox.setSelectedItem(item)}
            style={style.option}
            id={`${baseId ?? ''}-item-${itemId}`}
          >
            <FilterRadio checked={itemId === currentSelectedId} />
            {getOptionLabel(item)}
          </ComboboxItem>
        )
      })}
    </BaseFilter>
  )
}
