import React, { ReactElement } from 'react'
import {
  runtime as emotionRuntime,
  StyleProp,
} from '@vtex/onda-runtime-emotion'
import { Ocean, buildRuntime, buildSteps } from '@vtex/onda-system'
import { standard } from '@vtex/onda-plugins'

export interface SytemSpec<Theme extends Record<string, any>> {
  name: string
  description: string
  theme: Theme
  ocean?: Ocean<Theme>
}

export const SystemContext = React.createContext<{
  theme: any
  cn: (styleProp: StyleProp) => string
  instance: any
  about: {
    name: string
    description: string
  }
} | null>(null)

export function useSystem() {
  const ctx = React.useContext(SystemContext)
  if (!ctx) {
    throw new Error('waaaait! something is wrong on the provider')
  }
  return ctx
}

export type DesignSystem = [
  (props: { children: React.ReactNode }) => ReactElement,
  typeof useSystem,
  (styleProp: StyleProp) => string
]

export function createOnda<Theme extends Record<string, any>>(
  spec: SytemSpec<Theme>
): DesignSystem {
  const { name, description, theme, ocean = { plugins: standard } } = spec

  const steps = buildSteps(theme, ocean.plugins as any)
  const { exec: cn, instance } = buildRuntime(
    { id: name },
    steps,
    emotionRuntime
  )

  function SystemProvider(props: { children: React.ReactNode }) {
    const { children } = props
    return (
      <SystemContext.Provider
        value={{
          theme: steps.entries.exec(theme),
          cn,
          instance,
          about: {
            name,
            description,
          },
        }}
      >
        {children}
      </SystemContext.Provider>
    )
  }

  return [SystemProvider, useSystem, cn]
}
