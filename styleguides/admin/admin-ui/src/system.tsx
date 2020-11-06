import React, { ReactNode } from 'react'
import {
  createSystem,
  useTheme,
  useClassName,
  useResponsiveValue,
  get,
  merge,
  SxStyleProp,
} from '@vtex/admin-ui-system'
import { theme, Preflight } from '@vtex/admin-ui-theme'
import 'focus-visible/dist/focus-visible'

interface UnstableThemeProviderProps {
  children?: ReactNode
}

const {
  ThemeProvider: BaseProvider,
  cn,
  createElement,
  componentStyles,
  patternStyles,
} = createSystem({
  theme,
})

function ThemeProvider(props: UnstableThemeProviderProps) {
  const { children } = props

  return (
    <BaseProvider>
      <Preflight />
      {children}
    </BaseProvider>
  )
}

export {
  ThemeProvider,
  cn,
  createElement,
  componentStyles,
  patternStyles,
  useClassName,
  useTheme,
  useResponsiveValue,
  get,
  merge,
  theme,
  SxStyleProp,
}
