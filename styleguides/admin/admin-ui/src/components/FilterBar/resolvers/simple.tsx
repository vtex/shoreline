import React, { ReactNode } from 'react'
import { get } from '@vtex/admin-core'
import invariant from 'tiny-invariant'

import { useDropdownState } from '../../Dropdown'
import { ResolverRenderProps } from './core'
import { createResolver, defaultRender } from './core'
import { FilterDropdown } from '../components'

export function simpleResolver<T>() {
  return createResolver<T, 'simple', SimpleResolver<T>>({
    value: function SimpleResolver({ statement, index, handleValueChange }) {
      const { target, filter } = statement
      const { resolver } = filter
      const { items, accessor, defaultValue } = resolver

      const selectedItemValue = target ?? defaultValue

      const render = resolver?.render ?? defaultRender

      const state = useDropdownState<T>({
        items,
        selectedItem: selectedItemValue,
        onSelectedItemChange: ({ selectedItem }) => {
          if (selectedItem) {
            handleValueChange(selectedItem, index)
          }
        },
      })

      const renderItem = (item: T | null) => {
        if (typeof item !== 'object') return item

        const path = accessor ? `.${accessor}` : ``

        const selectedValue = get(item, `value${path}`, undefined)

        invariant(
          selectedValue && typeof selectedValue !== 'object',
          `Simple resolver: The selected data is undefined or an object. Make sure that you are using the correct accessor for the following filter: ${filter.label}`
        )

        return selectedValue
      }

      const data = (
        <FilterDropdown<T>
          state={state}
          renderItem={renderItem}
          label="Value"
          items={items}
        />
      )

      return render({ data, statement, handleValueChange, index })
    },
  })
}

export type SimpleResolver<T> = {
  type: 'simple'
  items: T[]
  accessor?: string
  defaultValue: T
  render?: (props: ResolverRenderProps<T, JSX.Element>) => ReactNode
}
