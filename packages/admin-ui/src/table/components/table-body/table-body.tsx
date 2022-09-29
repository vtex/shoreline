import React, { memo } from 'react'

import { Box } from '../../../box'
import type { TableBodyProps } from './types'

import * as styles from '../styles/table-body.styles'

export const TableBody = memo((props: TableBodyProps) => {
  const { children, ...restProps } = props

  return (
    <Box as="tbody" role="rowgroup" {...restProps} csx={styles.baseline}>
      {children}
    </Box>
  )
})

TableBody.displayName = 'TableBody'
