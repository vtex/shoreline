import { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'

import { Overridable } from '../../types'
import { Primitive, PrimitiveProps } from '../Primitive'

export const ListItem = createComponent(Primitive, useListItem)

export function useListItem(props: ListItemProps): PrimitiveProps<'li'> {
  const { styleOverrides, ...htmlProps } = props

  return { styles: { text: 'body', ...styleOverrides }, ...htmlProps }
}

export interface ListItemProps extends Overridable {
  /**
   * component children
   */
  children?: ReactNode
}
