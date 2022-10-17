import React, { memo } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'

import { Box } from '../../../box'

import * as styles from '../styles/table-body.styles'

function TableBody(props: TableBodyProps) {
  const { children, csx, ...restProps } = props

  return (
    <Box
      as="tbody"
      role="rowgroup"
      {...restProps}
      csx={{ ...styles.baseline, ...csx }}
    >
      {children}
    </Box>
  )
}

export const TBody = memo(TableBody) as typeof TableBody

export type TableBodyProps = {
  csx?: StyleProp
} & React.ComponentPropsWithoutRef<'tbody'>
