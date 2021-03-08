import React from 'react'
import { Meta } from '@storybook/react'

import { Box } from '../Box'
import { Text } from '../Text'
import { VisuallyHidden } from './index'

export default {
  title: 'admin-ui/VisuallyHidden',
  component: VisuallyHidden,
} as Meta

export function WithSimpleSearchField() {
  return (
    <Box styles={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      <VisuallyHidden>
        <label htmlFor="search">Hidden Label</label>
      </VisuallyHidden>
      <input id="search" type="search" placeholder="A11y Search Input" />
      <Text
        styleOverrides={{ alignSelf: 'flex-end', marginTop: 3 }}
        variant="small"
      >
        Use this input to search things
      </Text>
    </Box>
  )
}
