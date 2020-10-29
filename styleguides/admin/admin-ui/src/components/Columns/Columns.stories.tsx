import React from 'react'
import { Meta } from '@storybook/react'

import { Columns } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { unstableBox as Box } from '../unstableBox'

export default {
  title: 'beta/layout/columns',
} as Meta

export const Auto = () => {
  return (
    <ThemeProvider>
      <Columns spacing={1}>
        <Columns.Item>
          <Box palette="primary" styles={{ padding: 2 }}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="inverted" styles={{ padding: 2 }}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="primary" styles={{ padding: 2 }}>
            6 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}

export const AutoGapless = () => {
  return (
    <ThemeProvider>
      <Columns spacing={0}>
        <Columns.Item>
          <Box palette="primary" styles={{ padding: 2 }}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="inverted" styles={{ padding: 2 }}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item>
          <Box palette="primary" styles={{ padding: 2 }}>
            6 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}

export const Units = () => {
  return (
    <ThemeProvider>
      <Columns spacing={1}>
        <Columns.Item units={3}>
          <Box palette="primary" styles={{ padding: 2 }}>
            3 units
          </Box>
        </Columns.Item>
        <Columns.Item units={6}>
          <Box palette="inverted" styles={{ padding: 2 }}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item units={3}>
          <Box palette="primary" styles={{ padding: 2 }}>
            3 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}

export const ResponsiveUnits = () => {
  return (
    <ThemeProvider>
      <Columns spacing={1}>
        <Columns.Item units={6} offset={['right', 'right', 'none']}>
          <Box palette="primary" styles={{ padding: 2 }}>
            6 units
          </Box>
        </Columns.Item>
        <Columns.Item units={3}>
          <Box palette="inverted" styles={{ padding: 2 }}>
            3 units
          </Box>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}
