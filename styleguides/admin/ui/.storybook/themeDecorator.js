import React from 'react'
import { ThemeProvider } from '../src/theme'

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
