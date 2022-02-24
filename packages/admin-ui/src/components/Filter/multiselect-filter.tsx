import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import { Checkbox } from '../Checkbox'
import { Filter } from './filter'
import { Option } from './option'
import type { FilterItem, UseMultipleFilterReturn } from './useFilterState'

export function MultiselectFilter(props: MultiselectFilterProps) {
  const {
    state: { listState, selectedValues },
    state,
  } = props

  const selectedItemsLabel =
    selectedValues &&
    (selectedValues?.length > 1
      ? `${selectedValues[0]}, +${selectedValues.length - 1}`
      : selectedValues[0])

  const selectedValuesLabel = !!selectedValues?.length && (
    <>
      <span>:</span>
      <tag.span csx={{ color: '$primary', marginLeft: '$s' }}>
        {selectedItemsLabel}
      </tag.span>
    </>
  )

  return (
    <Filter state={state} selectedValuesLabel={selectedValuesLabel}>
      {[...listState.collection].map((item) => (
        <Option
          key={item.key}
          item={item}
          state={listState}
          inputRenderer={({ isSelected }) => <Checkbox checked={isSelected} />}
        />
      ))}
    </Filter>
  )
}

export interface MultiselectFilterProps {
  state: UseMultipleFilterReturn<FilterItem>
}
