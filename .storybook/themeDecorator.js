import React from 'react'
import { createSystem, unstableCreateAdminUI, defaultTheme } from '@vtex/admin-ui'

const unstableSystem = unstableCreateAdminUI(defaultTheme, {
  enableModes: true,
})

const [ThemeProvider] = createSystem({
  key: 'storybook',
  unstableSystem,
})

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
