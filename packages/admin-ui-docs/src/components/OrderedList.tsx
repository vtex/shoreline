import React from 'react'
import { Stack, csx } from '@vtex/admin-ui'
import type { StyleProp } from '@vtex/admin-ui'

export function OrderedList(props: any) {
  const { children } = props

  return (
    <ol className={csx(styles.list)}>
      <Stack space="2rem">{children}</Stack>
    </ol>
  )
}

export function OrderedListItem(props: any) {
  const { children } = props

  return <li className={csx(styles.listItem)}>{children}</li>
}

const styles: Record<string, StyleProp> = {
  list: {
    listStyle: 'none',
    counterReset: 'li',
    paddingLeft: '$space-0',
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
      left: '$space-0',
    },
  },
}
