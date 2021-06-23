import React, { ReactElement } from 'react'
import {
  runtime as runtimeEmotion,
  StyleProp,
} from '@vtex/onda-runtime-emotion'
import {
  buildRuntime,
  buildPlugins,
  Plugin,
  createTheme,
  ThemeOptions,
} from '@vtex/onda-system'
import { useCSSVariables } from './useCSSVariables'

export interface SytemSpec<Theme extends Record<string, any>> {
  name: string
  description: string
  theme: Theme
  plugins: Plugin<Theme>[]
  options?: ThemeOptions
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
  (props: { children?: React.ReactNode }) => ReactElement,
  typeof useSystem
]

export function createOnda<Theme extends Record<string, any>>(
  spec: SytemSpec<Theme>
): DesignSystem {
  const { name, description, theme: themeConfig, plugins = [], options } = spec

  const [{ global, ...strictTheme }, cssVariables] = createTheme(
    themeConfig,
    options
  )

  const steps = buildPlugins(strictTheme, plugins as any)
  const {
    exec: cn,
    parse,
    instance: { emotion, Global },
  } = buildRuntime({ id: name }, steps, runtimeEmotion)
  const globalStyles = parse.exec(global)
  const theme = steps.entries.exec(strictTheme)

  function SystemProvider(props: { children?: React.ReactNode }) {
    const { children } = props

    useCSSVariables(cssVariables)

    return (
      <SystemContext.Provider
        value={{
          theme,
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

  return [SystemProvider, useSystem]
}
