import { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'

import { SystemComponent } from '../../types'
import { Primitive, PrimitiveProps } from '@vtex/admin-primitives'

export const ListItem = createComponent(Primitive, useListItem)

export function useListItem(props: ListItemProps): PrimitiveProps<'li'> {
  const { styleOverrides, ...htmlProps } = props

  return {
    element: 'li',
    csx: { text: 'body', ...styleOverrides },
    ...htmlProps,
  }
}

export interface ListItemProps extends SystemComponent {
  /**
   * component children
   */
  children?: ReactNode
}
