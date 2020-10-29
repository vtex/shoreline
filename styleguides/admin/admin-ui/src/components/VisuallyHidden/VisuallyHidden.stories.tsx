import React from 'react'
import { Meta } from '@storybook/react'

import { Box } from '../Box'
import { Text } from '../Text'
import { VisuallyHidden } from './index'

export default {
  title: 'beta/VisuallyHidden',
  component: VisuallyHidden,
} as Meta

export function WithSimpleSearchField() {
  return (
    <Box display="flex" direction="col" w={200}>
      <VisuallyHidden>
        <label htmlFor="search">Hidden Label</label>
      </VisuallyHidden>
      <input id="search" type="search" placeholder="A11y Search Input" />
      <Text
        marginTop={3}
        styleOverrides={{ alignSelf: 'flex-end' }}
        text="small"
      >
        Use this input to search things
      </Text>
    </Box>
  )
}
