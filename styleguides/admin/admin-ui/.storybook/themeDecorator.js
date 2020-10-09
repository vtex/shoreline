import React from 'react'
import { ThemeProvider } from 'admin-system'

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
