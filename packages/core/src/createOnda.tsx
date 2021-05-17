import React, { ReactElement, useLayoutEffect } from 'react'
import {
  runtime as runtimeEmotion,
  StyleProp,
} from '@vtex/onda-runtime-emotion'
import { buildRuntime, buildSteps, Plugin } from '@vtex/onda-system'
import { applyCSSVariables, createTheme } from './createTheme'

export interface SytemSpec<Theme extends Record<string, any>> {
  name: string
  description: string
  theme: Theme
  plugins: Plugin<Theme>[]
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
  const { name, description, theme: preTheme, plugins = [] } = spec

  const { global, ...flashTheme } = preTheme
  const [theme, cssProps] = createTheme(flashTheme)

  const steps = buildSteps(theme, plugins as any)
  const {
    exec: cn,
    parse,
    instance: { emotion, Global },
  } = buildRuntime({ id: name }, steps, runtimeEmotion)

  const globalStyles = parse.exec(global ?? {})

  function SystemProvider(props: { children: React.ReactNode }) {
    const { children } = props

    useLayoutEffect(() => {
      applyCSSVariables(cssProps)
    }, [])

    return (
      <SystemContext.Provider
        value={{
          theme: steps.entries.exec(theme),
          cn,
          instance: emotion,
          about: {
            name,
            description,
          },
        }}
      >
        <Global styles={globalStyles} />
        {children}
      </SystemContext.Provider>
    )
  }

  return [SystemProvider, useSystem, cn]
}
