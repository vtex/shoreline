import { get } from '@theme-ui/css'
import invariant from 'tiny-invariant'
import { useContext } from 'react'
import { ThemeContext } from '@emotion/core'

import { Theme, ThemeColors } from './config'

export function useTheme() {
  const theme = useContext(ThemeContext) as Theme

  invariant(
    theme,
    'You must be under AdminUI/ThemeProvider to be able to consume the theme object'
  )

  return theme
}

export function useColor(color: ThemeColors) {
  const theme = useTheme()

  return get(theme, `colors.${color}`) as string
}
