import type { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-jsxs'
import type { PrimitiveProps } from '@vtex/admin-primitives'
import { Primitive } from '@vtex/admin-primitives'

import type { SystemComponent } from '../../types'

export const ListItem = createComponent(Primitive, useListItem)

export function useListItem(props: ListItemProps): PrimitiveProps<'li'> {
  const { csx, ...htmlProps } = props

  return {
    element: 'li',
    csx: { text: 'body', ...csx },
    ...htmlProps,
  }
}

export interface ListItemProps extends SystemComponent {
  /**
   * component children
   */
  children?: ReactNode
}
