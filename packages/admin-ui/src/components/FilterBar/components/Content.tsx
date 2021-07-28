import React from 'react'
import type { BoxProps } from '@vtex/admin-primitives'
import { Box } from '@vtex/admin-primitives'

import { Set } from '../../Set'
import { Paragraph } from '../../Paragraph'

export function Content(props: ContentProps) {
  const { empty, label, children, ...restProps } = props

  return (
    <Box csx={{ padding: 4, paddingLeft: empty ? 6 : 4 }} {...restProps}>
      {empty ? (
        <Paragraph>{label}</Paragraph>
      ) : (
        <Set orientation="vertical" spacing={2}>
          {children}
        </Set>
      )}
    </Box>
  )
}

export interface ContentProps extends BoxProps<'div'> {
  /** Whether has statement or not */
  empty: boolean
  /** Content label. It appears when Content is empty */
  label: string
}
