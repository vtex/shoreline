import type { ReactNode } from 'react'
import React from 'react'
import { tag } from '@vtex/admin-ui'

export default function Kbd(props: Props) {
  const { children } = props

  return (
    <tag.kbd
      csx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 'default',
        borderColor: 'base',
        bg: 'muted',
        borderBottomWidth: 3,
        borderTopWidth: '1',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        text: 'small',
      }}
    >
      {children}
    </tag.kbd>
  )
}

interface Props {
  children?: ReactNode
}
