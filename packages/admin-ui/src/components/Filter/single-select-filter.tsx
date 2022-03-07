import React from 'react'
import { tag } from '@vtex/admin-ui-react'

import type { FilterItem } from './useFilterState'
import type { UseSingleFilterReturn } from './useSingleFilterState'
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
      <tag.span csx={{ color: '$primary', marginLeft: '$s' }}>
        {appliedValue}
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
