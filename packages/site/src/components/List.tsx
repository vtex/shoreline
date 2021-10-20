import React from 'react'
import type { BoxProps } from '@vtex/admin-ui'
import { Box } from '@vtex/admin-ui'

export default function List(props: ListProps) {
  return (
    <Box
      csx={{
        lineHeight: 1.5,
        borderLeft: '1px solid #2121',
        li: {
          marginBottom: 2,
          marginLeft: 3,
          '&::marker': {
            color: 'muted',
          },
        },
        '#props ~ &, #props ~ details > &': {
          '> li': {
            marginBottom: 6,
            li: {
              margin: 2,
            },
            'strong ~ code': {
              color: 'indianred',
            },
            p: {
              marginTop: 2,
              marginX: 0,
              marginBottom: 0,
            },
          },
        },
      }}
      {...props}
    />
  )
}

export type ListProps = BoxProps
