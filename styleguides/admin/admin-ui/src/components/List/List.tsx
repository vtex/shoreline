import { Box as ReakitBox } from 'reakit'
import { ReactNode } from 'react'
import { useClassName } from '@vtex/admin-ui-system'
import { TextPattern } from '@vtex/admin-ui-theme'

import { createElement } from '../../system'
import { Overridable } from '../../types'
import { ListItem } from './ListItem'

export function List(props: ListProps) {
  const { style, styleOverrides, ordered, ...htmlProps } = props

  const className = useClassName({
    props: {
      text: 'body',
      styles: {
        listStyleType: style,
        listStylePosition: 'inside',
        '> ul, ol': {
          paddingLeft: 2,
        },
        '> :not(last-child)': {
          paddingBottom: 1,
        },
        ...styleOverrides,
      },
    },
  })

  const element = ordered ? 'ol' : 'ul'

  return createElement({
    element,
    component: ReakitBox,
    htmlProps: { ...htmlProps, className },
  })
}

List.Item = ListItem

type ListStyleType =
  | 'disc'
  | 'circle'
  | 'none'
  | 'square'
  | 'decimal'
  | 'inherit'
  | 'initial'
  | 'unset'

export interface ListProps extends Overridable, TextPattern {
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
