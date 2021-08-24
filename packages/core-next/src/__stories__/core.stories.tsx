import type { ReactNode } from 'react'
import React from 'react'
import type { Meta } from '@storybook/react'
import { createOndaInstance, useSystem } from '../createOnda'
import type { StyleProp } from '../runtime'
import { get } from '@vtex/onda-util'

export default {
  title: 'onda-core/createOndaInstance',
} as Meta

const OndaProvider = createOndaInstance({
  name: 'storybook',
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
