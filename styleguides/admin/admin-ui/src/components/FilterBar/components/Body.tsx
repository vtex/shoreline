import React from 'react'
import { Box, BoxProps } from '@vtex/admin-primitives'
import { Set } from '../../Set'
import { Paragraph } from '../../Paragraph'
import { Statement } from './Statement'

export function Body(props: BodyProps) {
  const { empty, label, children, ...restProps } = props

  const themeKey = { filterBar: { body: empty ? 'empty' : 'default' } }

  return (
    <Box csx={{ themeKey }} {...restProps}>
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

Body.Statement = Statement

export interface BodyProps extends BoxProps<'div'> {
  /** Whether has statement or not */
  empty: boolean
  /** Body label. It will appear when Body is empty */
  label: string
}
