import React from 'react'
import { tag } from '@vtex/admin-ui-react'
import { Checkbox } from '../checkbox'
import { BaseFilter } from './filter-base'

import type { UseFilterMultipleReturn } from './filter-multiple.state'
import { itemStyle } from './filter'
import type { FilterItem } from '.'
import { ComboboxItem } from '../combobox/combobox-item'

export function FilterMultiple<T extends FilterItem>(
  props: FilterMultipleProps<T>
) {
  const {
    state: { appliedItems, items, combobox, baseId },
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

  return (
    <BaseFilter state={state} appliedValuesLabel={appliedValuesLabel}>
      {items.map((item) => (
        <ComboboxItem
          aria-selected={combobox.isSelected(item)}
          key={item.id}
          onClick={() => combobox.onChange(item)}
          style={itemStyle}
          id={`${baseId ?? ''}-item-${item.id}`}
        >
          <Checkbox
            checked={combobox.isSelected(item)}
            aria-checked={undefined}
            csx={{ marginRight: '$s' }}
            aria-readonly="true"
          />
          {item.label}
        </ComboboxItem>
      ))}
    </BaseFilter>
  )
}

export interface FilterMultipleProps<T> {
  state: UseFilterMultipleReturn<T>
}
