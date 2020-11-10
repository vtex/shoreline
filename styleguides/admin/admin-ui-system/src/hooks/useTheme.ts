import { useThemeUI } from '@theme-ui/core'
import invariant from 'tiny-invariant'

import { isObjectEmpty } from '../util'

export function useTheme() {
  const { theme } = useThemeUI()

  invariant(
    !isObjectEmpty(theme) && theme,
    '💥 Make sure that you are under the ThemeProvider'
  )

  return theme
}
