import React from 'react'
import { tag } from '@vtex/admin-ui-react'

import type { FilterItem } from './useFilterState'
import type { UseSingleFilterReturn } from './useSingleFilterState'
import { Filter } from './filter'
import { StyledRadio } from './styled-radio'
import { Option } from './option'

export function SingleSelectFilter(props: SingleSelectFilterProps) {
  const {
    state: { listState, selectedValue },
    state,
  } = props

  const selectedValuesLabel = selectedValue && (
    <>
      <span>:</span>
      <tag.span csx={{ color: '$primary', marginLeft: '$s' }}>
        {selectedValue}
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
