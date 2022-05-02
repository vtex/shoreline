import React from 'react'
import { Stack, tag } from '@vtex/admin-ui'
import type { ListItemProps, ListProps, StyleProp } from '@vtex/admin-ui'

export function List(props: ListProps) {
  const { children } = props

  return (
    <tag.ol csx={styles.list}>
      <Stack space="$2xl">{children}</Stack>
    </tag.ol>
  )
}

export function ListItem(props: ListItemProps) {
  const { children } = props

  return <tag.li csx={styles.listItem}>{children}</tag.li>
}

const styles: Record<string, StyleProp> = {
  list: {
    listStyle: 'none',
    counterReset: 'li',
  },
  listItem: {
    text: '$title2',
    counterIncrement: 'li',
    position: 'relative',
    paddingLeft: 48,
    ':before': {
      content: 'counter(li)',
      display: 'inline-block',
      size: 32,
      borderRadius: '100%',
      textAlign: 'center',
      paddingY: '4px',
      text: '$title2',
      bg: '$secondary',
      position: 'absolute',
      left: 0,
    },
  },
}
