import invariant from 'tiny-invariant'

import { useThemeContext } from '../core'
import { isObjectEmpty } from '../util'
import { Theme } from '@vtex/admin-styles'

export function useTheme(): Theme {
  const { theme } = useThemeContext()

  invariant(
    !isObjectEmpty((theme as unknown) as Record<string, unknown>) && theme,
    '💥 Make sure that you are under the ThemeProvider'
  )

  return (theme as unknown) as Theme
}
