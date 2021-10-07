import React from 'react'
import type { Meta } from '@storybook/react'
import { merge } from '@vtex/admin-ui-util'
import { createSystem, unstableCreateAdminUI, theme } from '@vtex/admin-ui'
import { Playground } from './button'
import { WithDataView } from './dark'
import { draculaTheme } from './draculaTheme'

export default {
  title: 'new-colors/presentation',
} as Meta

const [SystemProvider] = createSystem({
  key: 'storybook',
})

const [DraculaProvider] = createSystem({
  key: 'storybook',
  // unstableSystem: unstableCreateAdminUI(merge(theme, draculaTheme)),
})

export function Button() {
  return (
    <SystemProvider>
      <Playground />
    </SystemProvider>
  )
}

export function DarkTheme() {
  return (
    <DraculaProvider>
      <WithDataView />
    </DraculaProvider>
  )
}
