import React from 'react'
import { unstableThemeProvider as ThemeProvider } from '../src/components/unstableThemeProvider'

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
