import React from 'react'
import { ThemeProvider } from '../packages/admin-ui/dist/vtex-admin-ui.esm'

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
