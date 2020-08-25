import React from 'react'
import { ThemeProvider } from '../src/components/Theme'

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
