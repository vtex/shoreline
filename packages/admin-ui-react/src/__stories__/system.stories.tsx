import type { ReactNode } from 'react'
import React from 'react'
import type { Meta } from '@storybook/react'
import { createSystem, useSystem } from '../createSystem'
import type { StyleProp } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'
import { useColorMode } from '../colorMode'

const [SystemProvider] = createSystem({
  key: 'storybook',
})

export default {
  title: 'admin-ui-react/system',
} as Meta

function Toggle() {
  const { setColorMode } = useColorMode()

  return (
    <button
      onClick={() =>
        setColorMode((mode: string) =>
          mode === 'default' ? 'dracula' : 'default'
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
    <SystemProvider>
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
    </SystemProvider>
  )
}

export function FunctionStyles() {
  return (
    <SystemProvider>
      <Div
        csx={{
          color: (theme) => get(theme, 'foreground.muted'),
        }}
      >
        Plain div
      </Div>
    </SystemProvider>
  )
}
