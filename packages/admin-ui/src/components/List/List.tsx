import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as listStyles from './list.style'

import { ListItem } from './ListItem'

const _List = createComponent<'ul', ListOptions>((props) => {
  const { style, ...restProps } = props

  return useElement('ul', {
    ...restProps,
    baseStyle: {
      ...listStyles.baseline,
      ...listStyles.variants({ style }),
    },
  })
})

export type ListOptions = VariantProps<typeof listStyles.variants>

export const List = Object.assign(_List, { Item: ListItem })

export type ListProps = ComponentPropsWithRef<typeof _List>
