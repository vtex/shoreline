import { useFocusRing } from '@react-aria/focus'
import { SxStyleProp } from 'theme-ui'

import { Theme } from '../theme'

export function useFocusHollow(sx?: SxStyleProp) {
  const { isFocusVisible, focusProps } = useFocusRing()
  const focusStyles = isFocusVisible
    ? {
        boxShadow: (theme: Theme) =>
          `0rem 0rem 0rem ${theme.space[2]} ${theme.colors.focus}`,
        ...sx,
      }
    : {}

  return { focusStyles, focusProps }
}
