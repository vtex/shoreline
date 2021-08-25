import React from 'react'
import { createOndaInstance } from '@vtex/onda-core'

const ThemeProvider = createOndaInstance({
  name: 'storybook',
})

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
