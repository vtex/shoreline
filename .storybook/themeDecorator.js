import React from 'react'
import { createSystem, unstableCreateAdminUI, defaultTheme } from '@vtex/admin-ui'

const unstableSystem = unstableCreateAdminUI(defaultTheme, {
  tokens: ['background', 'foreground', 'borderColor'],
  disableCSSVariables: false,
})

const [ThemeProvider] = createSystem({
  key: 'storybook',
  unstableSystem,
})

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
