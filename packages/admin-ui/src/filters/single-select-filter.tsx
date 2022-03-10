import React from 'react'
import { tag } from '@vtex/admin-ui-react'

import type { FilterItem } from './filter.state'
import type { UseSingleFilterReturn } from './single-filter.state'
import { Filter } from './filter'
import { StyledRadio } from './styled-radio'
import { Option } from './option'

export function SingleSelectFilter(props: SingleSelectFilterProps) {
  const {
    state: { listState, appliedValue },
    state,
  } = props

  const appliedValuesLabel = appliedValue && (
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
        {appliedValue}
      </tag.span>
    </>
  )

  const { collection } = listState
  const options = Array.from(collection.getKeys()).map((key) =>
    collection.getItem(key)
  )

  return (
    <Filter state={state} appliedValuesLabel={appliedValuesLabel}>
      {options.map((item) => (
        <Option
          key={item.key}
          item={item}
          state={listState}
          inputRenderer={({ isSelected }) => (
            <StyledRadio checked={isSelected} />
          )}
        />
      ))}
    </Filter>
  )
}

export interface SingleSelectFilterProps {
  state: UseSingleFilterReturn<FilterItem>
}
