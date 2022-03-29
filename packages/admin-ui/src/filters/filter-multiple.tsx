import React from 'react'
import { tag, useSystem } from '@vtex/admin-ui-react'
import { Checkbox } from '../components/Checkbox'
import { BaseFilter } from './filter-base'
import { ComboboxItem, Checkbox as AriaCheckbox } from 'ariakit'

import type { UseFilterMultipleReturn } from './filter-multiple.state'
import { itemStyle } from './filter'
import type { FilterItem } from '.'

export function FilterMultiple<T extends FilterItem>(
  props: FilterMultipleProps<T>
) {
  const {
    state: { appliedItems, checkbox, items, selectedKeys },
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

  const { cn } = useSystem()

  // TODO: Check the reason that we get a type error if the className is passed directly to Checkbox
  const styleProps: any = {
    className: cn(itemStyle),
  }

  return (
    <BaseFilter state={state} appliedValuesLabel={appliedValuesLabel}>
      {items.map(({ id, label }) => (
        <ComboboxItem
          aria-selected={!!(id && selectedKeys.find((a) => a === id))}
        >
          {(itemProps) => (
            <AriaCheckbox
              {...itemProps}
              {...styleProps}
              // Disable `checked` and `aria-checked` attributes so they don't
              // conflict with the `aria-selected` attribute.
              aria-checked={undefined}
              checked={undefined}
              state={checkbox}
              value={id}
              as="div"
            >
              <tag.div
                as={Checkbox}
                checked={!!(id && selectedKeys.find((a) => a === id))}
                aria-checked={undefined}
                csx={{ marginRight: '$s' }}
                readOnly
              />
              {label}
            </AriaCheckbox>
          )}
        </ComboboxItem>
      ))}
    </BaseFilter>
  )
}

export interface FilterMultipleProps<T> {
  state: UseFilterMultipleReturn<T>
}
