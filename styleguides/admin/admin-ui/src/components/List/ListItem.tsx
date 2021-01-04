import { Box as ReakitBox } from 'reakit'
import { ReactNode } from 'react'

import { cn, jsxs } from '../../system'
import { Overridable } from '../../types'

export function ListItem(props: ListItemProps) {
  const liProps = useListItem(props)

  return jsxs({
    element: 'li',
    component: ReakitBox,
    props: liProps,
  })
}

export function useListItem(props: ListItemProps) {
  const { styleOverrides, ...htmlProps } = props

  const className = cn({
    text: 'body',
    ...styleOverrides,
  })

  return { className, ...htmlProps }
}

export interface ListItemProps extends Overridable {
  /**
   * component children
   */
  children?: ReactNode
}
