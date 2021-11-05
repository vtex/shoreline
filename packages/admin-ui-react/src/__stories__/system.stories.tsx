import type { ReactNode } from 'react'
import React from 'react'
import type { Meta } from '@storybook/react'
import { createSystem, useSystem } from '../createSystem'
import type { StyleProp } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'
import { useThemeMode } from '../themeMode'

import { unstableCreateAdminUI, defaultTheme } from '@vtex/admin-ui-core'

const unstableSystem = unstableCreateAdminUI(defaultTheme, {
  enableModes: true,
})

const [SystemProvider] = createSystem({
  key: 'storybook',
  unstableSystem,
})

export default {
  title: 'admin-ui-react/system',
  decorators: [
    (Story) => (
      <SystemProvider>
        <Story />
      </SystemProvider>
    ),
  ],
} as Meta

function Toggle() {
  const { setThemeMode } = useThemeMode()

  return (
    <button
      onClick={() =>
        setThemeMode((mode: string) =>
          mode === 'main' ? 'darkMatter' : 'main'
        )
      }
    >
      Toggle theme
    </button>
  )
}

function Div(props: { csx: StyleProp; children: ReactNode }) {
  const { cn } = useSystem()

  return (
    <div className={cn(props.csx)}>
      Text content
      <Toggle />
    </div>
  )
}

export function Styles() {
  return (
    <Div
      csx={{
        bg: 'muted',
        color: 'base',
        borderColor: 'container',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 1,
        marginY: 2,
        size: 150,
        borderRadius: 'default',
      }}
    >
      With csx
    </Div>
  )
}

export function FunctionStyles() {
  return (
    <Div
      csx={{
        color: (theme) => get(theme, 'foreground.muted'),
      }}
    >
      Plain div
    </Div>
  )
}
