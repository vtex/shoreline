import { Box as ReakitBox } from 'reakit'
import { ReactNode } from 'react'
import { createElement } from '@vtex/admin-ui-system'
import { TextPattern } from '@vtex/admin-ui-theme'

import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

export function ListItem(props: ListItemProps) {
  const liProps = useComponent({ props: { text: 'body', ...props } })

  return createElement({
    element: 'li',
    component: ReakitBox,
    htmlProps: liProps,
  })
}

export interface ListItemProps extends Overridable, TextPattern {
  /**
   * component children
   */
  children?: ReactNode
}
