import React from 'react'
import { ThemeProvider } from '../packages/admin-ui/dist/vtex-admin-ui.esm'
import '../packages/tokens/dist/styles.min.css'

export function themeDecorator(storyFn) {
  return (
    <ThemeProvider experimentalDisabledGlobalStyles>{storyFn()}</ThemeProvider>
  )
}
