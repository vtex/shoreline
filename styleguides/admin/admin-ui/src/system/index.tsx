import React, { ReactNode } from 'react'
import {
  createSystem as createSystemInternal,
  useTheme,
  jsxs,
  useResponsiveValue,
  get,
  merge,
  StyleProp,
  StyleObject,
} from '@vtex/admin-ui-system'

import { theme } from '@vtex/admin-ui-theme'
import 'focus-visible/dist/focus-visible'

import { CoreProvider, useSystem, createSystem } from '@vtex/admin-core'

function ThemeProvider(props: ThemeProviderProps) {
  const { children, system } = props

  return <CoreProvider system={system}>{children}</CoreProvider>
}

interface ThemeProviderProps {
  children?: ReactNode
  system?: ReturnType<typeof createSystemInternal>
}

export {
  ThemeProvider,
  useTheme,
  useResponsiveValue,
  get,
  merge,
  theme,
  StyleProp,
  StyleObject,
  jsxs,
  useSystem,
  createSystem,
}
