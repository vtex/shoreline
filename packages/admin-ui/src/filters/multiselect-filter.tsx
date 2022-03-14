import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import { Checkbox } from '../components/Checkbox'
import { Filter } from './filter'
import { Option } from './option'
import type { UseMultipleFilterReturn } from './filter.state'

export function MultiselectFilter(props: MultiselectFilterProps) {
  const {
    state: { listState, appliedItems },
    state,
  } = props

  const firstSelectedItemLabel =
    appliedItems?.length > 1
      ? `${appliedItems[0].label},`
      : `${appliedItems[0]?.label}` // no comma in this case

  const remainingSelectedItemsCount =
    appliedItems?.length > 1 && `+${appliedItems.length - 1}`

  const appliedValuesLabel = !!appliedItems?.length && (
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
          inputRenderer={({ isSelected }) => <Checkbox checked={isSelected} />}
        />
      ))}
    </Filter>
  )
}

export interface MultiselectFilterProps {
  state: UseMultipleFilterReturn
}
