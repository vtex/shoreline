import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { ListItem } from './ListItem'

const _List = jsx.ul({
  text: 'body',
  listStylePosition: 'inside',
  '> ul, ol': {
    paddingLeft: 2,
  },
  '> :not(last-child)': {
    paddingBottom: 1,
  },
  variants: {
    style: {
      disc: {
        listStyleType: 'disc',
      },
      circle: {
        listStyleType: 'circle',
      },
      none: {
        listStyleType: 'none',
      },
      square: {
        listStyleType: 'square',
      },
      decimal: {
        listStyleType: 'decimal',
      },
      inherit: {
        listStyleType: 'inherit',
      },
      initial: {
        listStyleType: 'initial',
      },
      unset: {
        listStyleType: 'unset',
      },
    },
  },
})

export const List = Object.assign(_List, { Item: ListItem })

export type ListProps = ComponentPropsWithRef<typeof _List>
