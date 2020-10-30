import React from 'react'
import { Meta } from '@storybook/react'

import { unstableBox as Box } from '../unstableBox'
import { Text } from '../Text'
import { VisuallyHidden } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

export default {
  title: 'beta/VisuallyHidden',
  component: VisuallyHidden,
} as Meta

export function WithSimpleSearchField() {
  return (
    <ThemeProvider>
      <Box styles={{ display: 'flex', flexDirection: 'column', width: 200 }}>
        <VisuallyHidden>
          <label htmlFor="search">Hidden Label</label>
        </VisuallyHidden>
        <input id="search" type="search" placeholder="A11y Search Input" />
        <Text
          marginTop={3}
          styleOverrides={{ alignSelf: 'flex-end' }}
          variant="small"
        >
          Use this input to search things
        </Text>
      </Box>
    </ThemeProvider>
  )
}
