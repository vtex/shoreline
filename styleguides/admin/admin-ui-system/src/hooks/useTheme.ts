import { useThemeUI } from '@theme-ui/core'
import invariant from 'tiny-invariant'

import { isObjectEmpty } from '../util'
import { Theme } from '../types'

export function useTheme(): Theme {
  const { theme } = useThemeUI()

  invariant(
    !isObjectEmpty((theme as unknown) as Record<string, unknown>) && theme,
    '💥 Make sure that you are under the ThemeProvider'
  )

  return (theme as unknown) as Theme
}
