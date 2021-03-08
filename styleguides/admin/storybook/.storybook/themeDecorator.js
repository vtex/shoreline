import React from 'react'
import { ThemeProvider } from '@vtex/admin-core'

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
