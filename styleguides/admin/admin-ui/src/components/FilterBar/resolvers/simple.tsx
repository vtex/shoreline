import React, { ReactNode } from 'react'
import { get, useSystem } from '@vtex/admin-core'
import { Dropdown, useDropdownState } from '../../Dropdown'

import { createResolver, defaultRender, ResolverRenderProps } from './core'
import warning from 'tiny-warning'

export function simpleResolver<T extends { label?: string }>() {
  return createResolver<T, 'simple', SimpleResolver<T>>({
    value: function SimpleResolver({ statement, index, handleValueChange }) {
      const { value, filter } = statement
      const { resolver } = filter
      const { items, accessor } = resolver

      const { stylesOf } = useSystem()

      const render = resolver?.render ?? defaultRender

      const state = useDropdownState({
        items,
        selectedItem: value ?? items[0],
        onSelectedItemChange: ({ selectedItem: value }) => {
          if (value) {
            handleValueChange(value, index)
          }
        },
      })

      const renderItem = (item: T | null) => {
        if (!item) return

        const selectedValue = get(item, accessor, undefined)

        warning(
          selectedValue,
          `Simple resolver: The selected data is undefined. Make sure that you are using the correct acessor for the following filter: ${filter.label}`
        )

        return selectedValue
      }

      const data = (
        <Dropdown
          state={state}
          renderItem={renderItem}
          label="Value"
          items={items}
          variant="adaptative-dark"
          csx={stylesOf('components.filterBar.dropdown')}
        />
      )

      return render({ data, statement, handleValueChange, index })
    },
  })
}

export type SimpleResolver<T> = {
  type: 'simple'
  items: T[]
  accessor: string
  render?: (props: ResolverRenderProps<T, JSX.Element>) => ReactNode
}
