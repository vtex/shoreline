import React from 'react'
import { Box, BoxProps } from '@vtex/admin-ui'

export default function List(props: ListProps) {
  return (
    <Box
      sx={{
        lineHeight: 1.5,
        li: {
          marginBottom: 2,
        },
        '#props ~ &, #props ~ details > &': {
          '> li': {
            marginBottom: 6,
            li: {
              margin: 0,
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
