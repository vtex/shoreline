import type { ReactNode } from 'react'
import React from 'react'
import { get } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'

import { createResolver, defaultRender } from './core'
import type { ResolverRenderProps } from './core'
import { StatementDropdown } from '../components'

/**
 * Resolver that renders a simple select component
 *
 * @example
 *
 * resolver: {
 *   type: 'simple',
 *   defaultValue: { value: 1 },
 *   items: [{ value: 1 }, { value: 2 }],
 * }
 */
export function simpleResolver<T>() {
  return createResolver<T, 'simple', SimpleResolver<T>>({
    value: function SimpleResolver({ statement, index, handleValueChange }) {
      const { target, filter } = statement
      const { resolver } = filter
      const { items, accessor, defaultValue } = resolver

      const selectedItem = target ?? defaultValue

      const render = resolver?.render ?? defaultRender

      const renderItem = (item: T | null) => {
        if (typeof item !== 'object') return item

        const path = accessor ? `value.${accessor}` : `value`

        const selectedValue = get(item, path, undefined)

        invariant(
          selectedValue && typeof selectedValue !== 'object',
          `Simple resolver: The selected data is undefined or an object. Make sure that you are using the correct accessor for the following filter: ${filter.label}`
        )

        return selectedValue
      }

      const data = (
        <StatementDropdown<T>
          handleItemChange={({ selectedItem }) => {
            if (selectedItem) {
              handleValueChange(selectedItem, index)
            }
          }}
          selectedItem={selectedItem}
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
