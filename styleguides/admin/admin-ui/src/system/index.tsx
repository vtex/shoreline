import React, { ReactNode } from 'react'

import 'focus-visible/dist/focus-visible'

import {
  CoreProvider,
  useSystem,
  createSystem,
  theme,
  useTheme,
  jsxs,
  useResponsiveValue,
  get,
  merge,
  StyleProp,
  StyleObject,
  ResponsiveValue,
} from '@vtex/admin-core'

function ThemeProvider(props: ThemeProviderProps) {
  const { children, system } = props

  return <CoreProvider system={system}>{children}</CoreProvider>
}

interface ThemeProviderProps {
  children?: ReactNode
  system?: ReturnType<typeof createSystem>
}

export {
  ThemeProvider,
  useTheme,
  useResponsiveValue,
  ResponsiveValue,
  get,
  merge,
  theme,
  StyleProp,
  StyleObject,
  jsxs,
  useSystem,
  createSystem,
}

export { isMobile } from 'react-device-detect'
