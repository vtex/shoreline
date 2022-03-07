import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import { Checkbox } from '../Checkbox'
import { Filter } from './filter'
import { Option } from './option'
import type { FilterItem, UseMultipleFilterReturn } from './useFilterState'

export function MultiselectFilter(props: MultiselectFilterProps) {
  const {
    state: { listState, appliedValues },
    state,
  } = props

  const selectedItemsLabel =
    appliedValues &&
    (appliedValues?.length > 1
      ? `${appliedValues[0]}, +${appliedValues.length - 1}`
      : appliedValues[0])

  const appliedValuesLabel = !!appliedValues?.length && (
    <>
      <span>:</span>
      <tag.span csx={{ color: '$primary', marginLeft: '$s' }}>
        {selectedItemsLabel}
      </tag.span>
    </>
  )

  return (
    <Filter state={state} appliedValuesLabel={appliedValuesLabel}>
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
