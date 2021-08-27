import type { ReactNode } from 'react'
import React from 'react'
import type { Meta } from '@storybook/react'
import { createOnda, useSystem } from '../createOnda'
import type { StyleProp } from '../runtime'
import { get } from '@vtex/onda-util'
import { theme as vars } from '../theme'

export default {
  title: 'onda-core/createOnda',
} as Meta

const [OndaProvider] = createOnda({
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
          bg: 'blue',
          color: 'light.primary',
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
          bg: vars.colors.blue.default,
          color: vars.colors.light.primary,
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
          color: (theme) => get(theme, 'colors.blue.default'),
        }}
      >
        Plain div
      </Div>
    </OndaProvider>
  )
}
