import { Box as ReakitBox } from 'reakit'
import { ReactNode } from 'react'

import { useSystem, jsxs } from '../../system'
import { Overridable } from '../../types'
import { ListItem } from './ListItem'

export function List(props: ListProps) {
  const { ordered, ...htmlProps } = props
  const listProps = useList(htmlProps)
  const element = ordered ? 'ol' : 'ul'

  return jsxs({
    element,
    component: ReakitBox,
    props: listProps,
  })
}

export function useList(props: ListProps) {
  const { style, styleOverrides, ...htmlProps } = props
  const { cn } = useSystem()

  const className = cn({
    text: 'body',
    listStyleType: style,
    listStylePosition: 'inside',
    '> ul, ol': {
      paddingLeft: 2,
    },
    '> :not(last-child)': {
      paddingBottom: 1,
    },
    ...styleOverrides,
  })

  return { className, ...htmlProps }
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

export interface ListProps extends Overridable {
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
