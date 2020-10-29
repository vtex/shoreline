import React from 'react'
import { Meta } from '@storybook/react'

import { Text } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

export default {
  title: 'beta/typography/text',
} as Meta

export function Elements() {
  return (
    <ThemeProvider>
      <Text element="strong">Bold</Text>
      <br />
      <Text element="i">Italic</Text>
      <br />
      <Text element="u">Underline</Text>
      <br />
      <Text element="abbr">I18N</Text>
      <br />
      <Text element="cite">Citation</Text>
      <br />
      <Text element="del">Deleted</Text>
      <br />
      <Text element="em">Emphasis</Text>
      <br />
      <Text element="ins">Inserted</Text>
      <br />
      <Text element="kbd">Ctrl + C</Text>
      <br />
      <Text element="mark">Highlighted</Text>
      <br />
      <Text element="s">Strikethrough</Text>
      <br />
      <Text element="samp">Sample</Text>
      <br />
      <Text element="sub">sub</Text>
      <br />
      <Text element="sup">sup</Text>
    </ThemeProvider>
  )
}

export function StyleOverrides() {
  return (
    <ThemeProvider>
      <Text styleOverrides={{ color: 'primary.base' }}>Primary text</Text>
    </ThemeProvider>
  )
}
