import React, { useRef } from 'react'

import type { UseFilterCheckboxReturn } from './useFilterCheckbox'

import { Checkbox } from '../../../Checkbox'
import { useOption } from '@react-aria/listbox'
import { tag } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'

export function ChecklistFilterContent(props: FilterCheckboxProps) {
  const {
    state: { listBoxProps, listState, ref },
  } = props

  return (
    <div
      {...listBoxProps}
      ref={ref}
      style={{
        padding: 0,
        margin: '5px 0',
        listStyle: 'none',
        border: '1px solid gray',
        maxWidth: 250,
      }}
    >
      {[...listState.collection].map((item) => {
        return <Option key={item.key} item={item} state={listState} />
      })}
    </div>
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
        ...focusVisible('main'),
      }}
    >
      <Checkbox checked={isSelected} />
      {item.rendered}
    </tag.li>
  )
}

export interface FilterCheckboxProps {
  state: UseFilterCheckboxReturn
}
