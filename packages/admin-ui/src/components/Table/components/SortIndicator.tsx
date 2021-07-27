import React from 'react'
import { Flex } from '@vtex/admin-primitives'
import { IconTriangle } from '@vtex/admin-ui-icons'

export function SortIndicator(props: SortIndicatorProps) {
  const { direction } = props

  return (
    <Flex
      direction="column"
      justify="center"
      csx={{
        margin: 1,
        minHeight: '0.75rem',
      }}
    >
      {direction !== 'DSC' && (
        <IconTriangle
          csx={{
            width: '6px',
            height: '5px',
            minHeight: '5px',
            minWidth: '6px',
            marginBottom: 0.5,
            path: {
              fill: direction === 'ASC' ? 'dark.secondary' : 'mid.secondary',
            },
          }}
        />
      )}
      {direction !== 'ASC' && (
        <IconTriangle
          csx={{
            width: '6px',
            height: '5px',
            minHeight: '5px',
            minWidth: '6px',
            marginTop: 0.5,
            path: {
              fill: direction === 'DSC' ? 'dark.secondary' : 'mid.secondary',
            },
          }}
          direction="down"
        />
      )}
    </Flex>
  )
}

export interface SortIndicatorProps {
  direction?: 'ASC' | 'DSC' | null
}
