import React from 'react'
import { Flex } from '@vtex/admin-primitives'
import { IconTriangle } from '@vtex/admin-ui-icons'

export function SortIndicator(props: SortIndicatorProps) {
  const { order } = props

  return (
    <Flex
      direction="column"
      justify="center"
      csx={{
        margin: 1,
        minHeight: '0.75rem',
      }}
    >
      {order !== 'DSC' && (
        <IconTriangle
          csx={{
            width: '6px',
            height: '5px',
            minHeight: '5px',
            minWidth: '6px',
            marginBottom: 0.5,
            path: {
              fill: order === 'ASC' ? 'dark.secondary' : 'mid.secondary',
            },
          }}
        />
      )}
      {order !== 'ASC' && (
        <IconTriangle
          csx={{
            width: '6px',
            height: '5px',
            minHeight: '5px',
            minWidth: '6px',
            marginTop: 0.5,
            path: {
              fill: order === 'DSC' ? 'dark.secondary' : 'mid.secondary',
            },
          }}
          direction="down"
        />
      )}
    </Flex>
  )
}

export interface SortIndicatorProps {
  order?: 'ASC' | 'DSC' | null
}
