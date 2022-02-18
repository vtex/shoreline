import React, { useRef } from 'react'

import type { UseFilterCheckboxReturn } from './useFilterCheckbox'

import { Checkbox } from '../../../Checkbox'
import { useOption } from '@react-aria/listbox'
import { tag } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'
import { Set } from '../../../Set'
import type { FilterItem } from '../Filter'

export function ChecklistFilterContent(props: FilterCheckboxProps) {
  const {
    state: { listBoxProps, listState, ref },
  } = props

  return (
    <Set
      as="ul"
      spacing={5}
      orientation="vertical"
      ref={ref}
      csx={{ margin: '$l', paddingY: '$m' }}
      {...listBoxProps}
    >
      {[...listState.collection].map((item) => {
        return <Option key={item.key} item={item} state={listState} />
      })}
    </Set>
  )
}

function Option({ item, state }: any) {
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
      <Checkbox checked={isSelected} />
      <tag.span csx={{ marginLeft: '$m' }}>{item.rendered}</tag.span>
    </tag.li>
  )
}

export interface FilterCheckboxProps {
  state: UseFilterCheckboxReturn<FilterItem>
}
