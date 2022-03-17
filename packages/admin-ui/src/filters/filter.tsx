import React from 'react'
import { tag } from '@vtex/admin-ui-react'

import type { UseFilterReturn } from './filter.state'
import { BaseFilter } from './base-filter'
import { FilterRadio } from './filter-radio'
import { FilterOption } from './filter-option'

export function Filter(props: FilterProps) {
  const {
    state: { listState, appliedItem },
    state,
  } = props

  const appliedValuesLabel = appliedItem && (
    <>
      <span>:</span>
      <tag.span
        csx={{
          color: '$primary',
          marginLeft: '$s',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '300px',
        }}
      >
        {appliedItem.label}
      </tag.span>
    </>
  )

  const { collection } = listState
  const options = Array.from(collection.getKeys()).map((key) =>
    collection.getItem(key)
  )

  return (
    <BaseFilter state={state} appliedValuesLabel={appliedValuesLabel}>
      {options.map((item) => (
        <FilterOption
          key={item.key}
          item={item}
          state={listState}
          inputRenderer={({ isSelected }) => (
            <FilterRadio checked={isSelected} />
          )}
        />
      ))}
    </BaseFilter>
  )
}

export interface FilterProps {
  state: UseFilterReturn
}
