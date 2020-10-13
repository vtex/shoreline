import React from 'react'
import { ThemeProvider } from '../src/system'

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
