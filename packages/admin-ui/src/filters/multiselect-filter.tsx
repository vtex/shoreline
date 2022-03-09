import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import { Checkbox } from '../components/Checkbox'
import { Filter } from './filter'
import { Option } from './option'
import type { FilterItem, UseMultipleFilterReturn } from './filter.state'

export function MultiselectFilter(props: MultiselectFilterProps) {
  const {
    state: { listState, appliedValues },
    state,
  } = props

  const firstSelectedItemLabel =
    appliedValues?.length > 1 ? `${appliedValues[0]},` : `${appliedValues[0]}`

  const remainingSelectedItemsCount =
    appliedValues?.length > 1 && `+${appliedValues.length - 1}`

  const appliedValuesLabel = !!appliedValues?.length && (
    <>
      <span>:</span>
      <tag.span
        csx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '300px',
          marginX: '$s',
        }}
      >
        {firstSelectedItemLabel}
      </tag.span>
      {remainingSelectedItemsCount}
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
