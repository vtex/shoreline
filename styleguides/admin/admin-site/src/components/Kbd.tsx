import React from 'react'
import { Text, TextProps } from '@vtex/admin-ui'

export default function Kbd(props: KbdProps) {
  return (
    <Text
      element="kbd"
      variant="small"
      styleOverrides={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 'default',
        borderColor: 'muted.2',
        bg: 'muted.4',
        borderBottomWidth: 3,
        borderTopWidth: '1',
        borderLeftWidth: 1,
        borderRightWidth: 1,
      }}
      {...props}
    />
  )
}

export type KbdProps = TextProps
