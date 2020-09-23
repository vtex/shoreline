import { useFocusRing } from '@react-aria/focus'
import { get, useTheme } from '@vtex-components/theme'

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
