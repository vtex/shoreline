import { useFocusRing } from '@react-aria/focus'
import { get } from '@vtex-components/theme'

import { useTheme } from '../..'

export function useFocusHollow() {
  const theme = useTheme()
  const { isFocusVisible, focusProps } = useFocusRing()
  const focusStyles = isFocusVisible
    ? {
        boxShadow: `0px 0px 0px ${get(theme, 'space.2')}px ${get(
          theme,
          'colors.focus'
        )}`,
      }
    : {}

  return { focusStyles, focusProps }
}
