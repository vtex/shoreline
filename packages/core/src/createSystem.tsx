import React from 'react'
import {
  runtime as emotionRuntime,
  StyleProp,
} from '@vtex/onda-runtime-emotion'
import { Ocean, buildRuntime, buildSteps } from '@vtex/onda-system'
import { standard } from '@vtex/onda-plugins'

export interface SystemSpec<Theme extends Record<string, any>> {
  id: string
  theme: Theme
  ocean?: Ocean<Theme>
}

export const SystemContext = React.createContext<{
  theme: any
  cn: (styleProp: StyleProp) => string
  instance: any
} | null>(null)

export function useSystem() {
  const ctx = React.useContext(SystemContext)
  if (!ctx) {
    throw new Error('waaaait! something is wrong on the provider')
  }
  return ctx
}

export function createSystem<Theme extends Record<string, any>>(
  spec: SystemSpec<Theme>
) {
  const { id, theme, ocean = { plugins: standard } } = spec

  const steps = buildSteps(theme, ocean.plugins)
  const { exec: cn, instance } = buildRuntime({ id }, steps, emotionRuntime)

  function SystemProvider(props: any) {
    const { children } = props
    return (
      <SystemContext.Provider
        value={{
          theme: steps.theme.exec(theme),
          cn,
          instance,
        }}
      >
        {children}
      </SystemContext.Provider>
    )
  }

  return {
    cn,
    useSystem,
    SystemProvider,
  }
}
