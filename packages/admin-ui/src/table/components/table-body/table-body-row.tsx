import type { StyleProp } from '@vtex/admin-ui-core'
import React, { memo } from 'react'
import { Box } from '../../../box'

import * as styles from '../styles/table-body.styles'

function _TableBodyRow(props: TableBodyRowProps) {
  const { selected, children, onClick, ...rowProps } = props

  return (
    <Box
      as="tr"
      {...rowProps}
      role="row"
      csx={{
        ...styles.rowBaseline,
        ...styles.variants({ clickable: !!onClick }),
        ...styles.variants({ selected }),
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  )
}

export type TableBodyRowProps = {
  csx?: StyleProp
  selected?: boolean
} & React.ComponentPropsWithoutRef<'tr'>

export const TableBodyRow = memo(_TableBodyRow) as typeof _TableBodyRow
