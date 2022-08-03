import type { ReactNode } from 'react'
import React from 'react'
import { get } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'
import type { BulkActionsState } from '../../bulk-actions'

import type { ResolverRenderProps } from './resolver-core'
import { createResolver } from './resolver-core'
import { Checkbox } from '../../checkbox'

export function bulkResolver<T extends {}>() {
  return createResolver<T, 'bulk', BulkResolver<T>>({
    header: function BulkResolver({ context, column }) {
      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the bulk resolver'
      )

      const {
        state: { allSelected, root, setRoot },
      } = resolver

      return (
        <Checkbox
          state={{
            value: allSelected || root,
            setValue: setRoot,
          }}
          disabled={context.status === 'loading' || allSelected}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.stopPropagation()
          }
        />
      )
    },
    cell: function BulkResolver({ context, column, item }) {
      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the bulk resolver'
      )

      const {
        state: { allSelected, isItemSelected, toggleItem },
      } = resolver

      return (
        <Checkbox
          value={get(item, 'id')}
          checked={allSelected || isItemSelected(item)}
          onChange={() => {
            toggleItem(item)
          }}
          disabled={context.status === 'loading'}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.stopPropagation()
          }
        />
      )
    },
  })
}

export interface BulkResolver<T> {
  type: 'bulk'
  state: BulkActionsState<T>
  render?: (props: ResolverRenderProps<ReactNode, T>) => ReactNode
}
