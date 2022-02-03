import React from 'react'
import { createSystem } from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  key: 'storybook'
})

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
