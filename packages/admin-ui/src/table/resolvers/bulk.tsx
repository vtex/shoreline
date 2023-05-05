import type { ReactNode } from 'react'
import React from 'react'
import { get } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'
import type { BulkActionsState } from '../../bulk-actions'

import type { ResolverRenderProps } from './resolver-core'
import { defaultRender, createResolver } from './resolver-core'
import { Checkbox } from '../../checkbox'
import { Skeleton } from '../../skeleton'
import { csx } from '@vtex/admin-ui-core'

export function bulkResolver<T extends {}>() {
  return createResolver<T, 'bulk', BulkResolver<T>>({
    header: function BulkResolver({ context, column }) {
      if (context === 'loading') {
        return <Skeleton className={csx({ size: '1.5rem' })} />
      }

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
          disabled={allSelected}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.stopPropagation()
          }
        />
      )
    },
    cell: function BulkResolver({ context, column, item }) {
      if (context === 'loading') {
        return <Skeleton className={csx({ size: '1.5rem' })} />
      }

      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the bulk resolver'
      )

      const {
        state: { allSelected, selectedItemsIds, pageIds, setSelectedItemsIds },
      } = resolver

      const selectedPageItems = allSelected ? pageIds : null

      const data = (
        <Checkbox
          value={get(item, 'id')}
          state={{
            value: selectedPageItems || selectedItemsIds,
            setValue: setSelectedItemsIds,
          }}
          disabled={allSelected}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.stopPropagation()
          }
        />
      )

      const render = resolver.render ?? defaultRender

      return render({ data, item, context })
    },
  })
}

export interface BulkResolver<T> {
  type: 'bulk'
  state: BulkActionsState<T>
  render?: (props: ResolverRenderProps<ReactNode, T>) => ReactNode
}
