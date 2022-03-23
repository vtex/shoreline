import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import { Checkbox } from '../components/Checkbox'
import { BaseFilter } from './base-filter'
import { FilterOption } from './filter-option'
import type { UseFilterMultipleReturn } from './base-filter.state'

export function FilterMultiple(props: FilterMultipleProps) {
  const {
    state: { listState, appliedItems = [] },
    state,
  } = props

  const firstSelectedItemLabel =
    appliedItems.length > 1
      ? `${appliedItems[0]?.label},`
      : `${appliedItems[0]?.label}` // no comma in this case

  const remainingSelectedItemsCount =
    appliedItems.length > 1 && `+${appliedItems.length - 1}`

  const appliedValuesLabel = !!appliedItems.length && (
    <>
      <span>:</span>
      <tag.span csx={{ color: '$primary' }}>
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
          inputRenderer={({ isSelected }) => <Checkbox checked={isSelected} />}
        />
      ))}
    </BaseFilter>
  )
}

export interface FilterMultipleProps {
  state: UseFilterMultipleReturn
}
