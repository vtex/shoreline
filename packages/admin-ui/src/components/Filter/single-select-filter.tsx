import type { ReactNode } from 'react'
import React, { useRef } from 'react'

import type { FilterItem } from './useFilterState'

import { useOption } from '@react-aria/listbox'
import { tag } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'

import type { ListState } from '@react-stately/list'
import { Filter } from './filter'
import type { UseSingleFilterReturn } from './useSingleFilterState'
import { StyledRadio } from './styled-radio'

export function SingleSelectFilter(props: FilterCheckboxProps) {
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
      {[...listState.collection].map((item) => {
        return <Option key={item.key} item={item} state={listState} />
      })}
    </Filter>
  )
}

function Option({
  item,
  state,
}: {
  item: { key: string | number; rendered: ReactNode }
  state: ListState<FilterItem>
}) {
  const ref = useRef(null)
  const { optionProps, isSelected } = useOption({ key: item.key }, state, ref)

  return (
    <tag.li
      {...optionProps}
      ref={ref}
      csx={{
        display: 'flex',
        cursor: 'pointer',
        paddingY: '$s',
        ...focusVisible('main'),
      }}
    >
      <StyledRadio checked={isSelected} />
      <tag.span csx={{ marginLeft: '$m' }}>{item.rendered}</tag.span>
    </tag.li>
  )
}

export interface FilterCheckboxProps {
  state: UseSingleFilterReturn<FilterItem>
}
