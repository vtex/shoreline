import React from 'react'
import { Stack, Box } from '@vtex/admin-ui'
import type { ListItemProps, ListProps, StyleProp } from '@vtex/admin-ui'

export function OrderedList(props: ListProps) {
  const { children } = props

  return (
    <Box as="ol" csx={styles.list}>
      <Stack space="2rem">{children}</Stack>
    </Box>
  )
}

export function OrderedListItem(props: ListItemProps) {
  const { children } = props

  return (
    <Box as="li" csx={styles.listItem}>
      {children}
    </Box>
  )
}

const styles: Record<string, StyleProp> = {
  list: {
    listStyle: 'none',
    counterReset: 'li',
    paddingLeft: 0,
  },
  listItem: {
    text: '$title2',
    counterIncrement: 'li',
    position: 'relative',
    paddingLeft: 48,
    height: '100%',
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
