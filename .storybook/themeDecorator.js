import React from 'react'
import { createOnda } from '@vtex/onda-core'

const [ThemeProvider] = createOnda({
  key: 'storybook',
})

export function themeDecorator(storyFn) {
  return <ThemeProvider>{storyFn()}</ThemeProvider>
}
