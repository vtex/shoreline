import React from 'react'

import type { BoxProps } from '../../../box'
import { Box } from '../../../box'
import { Stack } from '../../../stack'
import { Paragraph } from '../../Paragraph'

export function Content(props: ContentProps) {
  const { empty, label, children, ...restProps } = props

  return (
    <Box csx={{ padding: 4, paddingLeft: empty ? 6 : 4 }} {...restProps}>
      {empty ? <Paragraph>{label}</Paragraph> : <Stack>{children}</Stack>}
    </Box>
  )
}

export interface ContentProps extends BoxProps {
  /** Whether has statement or not */
  empty: boolean
  /** Content label. It appears when Content is empty */
  label: string
}
