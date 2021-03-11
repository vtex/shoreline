import { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'

import { SystemComponent } from '../../types'
import { ListItem } from './ListItem'
import { Primitive } from '@vtex/admin-primitives'

const _List = createComponent(Primitive, useList)

export const List = Object.assign(_List, { Item: ListItem })

export function useList(props: ListProps) {
  const { style, csx, ordered = false, ...htmlProps } = props

  return {
    element: ordered ? 'ol' : 'ul',
    csx: {
      text: 'body',
      listStyleType: style,
      listStylePosition: 'inside',
      '> ul, ol': {
        paddingLeft: 2,
      },
      '> :not(last-child)': {
        paddingBottom: 1,
      },
      ...csx,
    },
    ...htmlProps,
  }
}

type ListStyleType =
  | 'disc'
  | 'circle'
  | 'none'
  | 'square'
  | 'decimal'
  | 'inherit'
  | 'initial'
  | 'unset'

export interface ListProps extends SystemComponent {
  /**
   * list children
   */
  children?: ReactNode
  /**
   * indicates if the list is ordered
   * @default false
   */
  ordered?: boolean
  /**
   * style
   * @default disc
   */
  style?: ListStyleType
}
