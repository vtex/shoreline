import type { StyleProp } from '@vtex/admin-ui-core'
import React, { memo } from 'react'
import { Box } from '../../../box'
import * as styles from '../styles/table-head.styles'

function TableHead(props: TableHeadProps) {
  const { children, ...headProps } = props

  return (
    <Box as="thead" csx={styles.baseline} role="rowgroup" {...headProps}>
      <Box as="tr" csx={styles.rowBaseline} role="row">
        {children}
      </Box>
    </Box>
  )
}

export type TableHeadProps = React.ComponentPropsWithoutRef<'thead'> & {
  csx?: StyleProp
}

export const THead = memo(TableHead) as typeof TableHead
