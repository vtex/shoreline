import invariant from 'tiny-invariant'
import type { Theme } from '@vtex/admin-styles'

import { useThemeContext } from '../core'
import { isObjectEmpty } from '../util'

export function useTheme(): Theme {
  const { theme } = useThemeContext()

  invariant(
    !isObjectEmpty(theme as unknown as Record<string, unknown>) && theme,
    '💥 Make sure that you are under the ThemeProvider'
  )

  return theme as unknown as Theme
}
