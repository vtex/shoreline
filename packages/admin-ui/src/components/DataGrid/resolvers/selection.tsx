import type { ReactNode } from 'react'
import React from 'react'

import { SelectionTreeRoot, SelectionTreeItem } from '../../SelectionTree'
import type { ResolverRenderProps } from './core'
import { createResolver } from './core'

export function selectionResolver<T>() {
  return createResolver<T, 'selection', SelectionResolver<T>>({
    header: function Resolve({ context }) {
      return (
        <SelectionTreeRoot
          disabled={context.status === 'loading'}
          onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
            e.stopPropagation()
          }
        />
      )
    },
    cell: function Resolve({ context, column, item }) {
      const { resolver } = column

      return (
        <SelectionTreeItem
          value={resolver?.mapId(item)}
          disabled={context.status === 'loading'}
          onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
            e.stopPropagation()
          }
        />
      )
    },
  })
}

export interface SelectionResolver<T> {
  type: 'selection'
  mapId: (item: T) => string | number
  isSelected?: (item: T) => boolean
  onSelect?: (items: T[]) => void
  render?: (props: ResolverRenderProps<ReactNode, T>) => ReactNode
}
