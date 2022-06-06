import React from 'react'
import { createSystem } from '@vtex/admin-ui'

const [ThemeProvider] = createSystem()

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
