import type { ReactNode } from 'react'
import React from 'react'
import type { Meta } from '@storybook/react'
import { createSystem, useSystem } from '../createSystem'
import type { StyleProp } from '../runtime'
import { get } from '@vtex/admin-ui-util'
import { theme as vars } from '../theme'

export default {
  title: 'onda-core/createSystem',
} as Meta

const [OndaProvider] = createSystem({
  key: 'storybook',
})

function Div(props: { csx: StyleProp; children: ReactNode }) {
  const { cn } = useSystem()

  return <div className={cn(props.csx)}>Text content</div>
}

export function Styles() {
  return (
    <OndaProvider>
      <Div
        csx={{
          bg: 'action.primary',
          color: 'action.primary',
          marginY: 2,
          size: 100,
        }}
      >
        With csx
      </Div>
    </OndaProvider>
  )
}

export function ThemeStyles() {
  return (
    <OndaProvider>
      <Div
        csx={{
          bg: vars.background.action.primary,
          color: vars.foreground.action.primary,
          marginY: vars.space[2],
          size: '100px',
        }}
      >
        With csx
      </Div>
    </OndaProvider>
  )
}

export function FunctionStyles() {
  return (
    <OndaProvider>
      <Div
        csx={{
          color: (theme) => get(theme, 'foreground.muted'),
        }}
      >
        Plain div
      </Div>
    </OndaProvider>
  )
}
