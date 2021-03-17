import React from 'react'
import { Box } from '../Box'
import { IconTriangle } from '@vtex/admin-ui-icons'

export function SortIndicator(props: Props) {
  const { order } = props

  return (
    <Box
      styles={{
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '0.75rem',
      }}
    >
      {order !== 'DSC' && (
        <IconTriangle
          styleOverrides={{
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
          styleOverrides={{
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
    </Box>
  )
}

export interface Props {
  order?: 'ASC' | 'DSC'
}
