import type { ReactNode } from 'react'
import type { ListState } from '@react-stately/list'

import React, { useRef } from 'react'
import { useOption } from '@react-aria/listbox'
import { tag } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'
import type { FilterItem } from './useFilterState'

export const Option = ({
  item,
  state,
  inputRenderer,
}: {
  item: { key: string | number; rendered: ReactNode }
  state: ListState<FilterItem>
  inputRenderer: ({ isSelected }: { isSelected: boolean }) => ReactNode
}) => {
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
      {inputRenderer({ isSelected })}
      <tag.span csx={{ marginLeft: '$m' }}>{item.rendered}</tag.span>
    </tag.li>
  )
}
