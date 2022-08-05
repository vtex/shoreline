import React from 'react'
import { ThemeProvider } from '@vtex/admin-ui'

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
