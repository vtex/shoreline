/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
  useCheckboxState,
} from 'reakit'
import { useFocusRing } from '@react-aria/focus'
import { useComponentSx, mergeSx } from '@vtex-components/theme'

import { Theme } from '../../theme'

export function Checkbox({
  sx = {},
  size = 'regular',
  ...reakitProps
}: CheckboxProps) {
  const { focusStyles, focusProps } = useFocusHollow()

  const styles = useComponentSx('checkbox', {
    size,
  })

  const mergedSx = mergeSx<SxStyleProp>({ ...styles, ...focusStyles }, sx)

  return <ReakitCheckbox {...focusProps} {...reakitProps} sx={mergedSx} />
}

function useFocusHollow() {
  const { isFocusVisible, focusProps } = useFocusRing()
  const focusStyles = isFocusVisible
    ? {
        borderColor: 'text',
        boxShadow: (theme: Theme) =>
          `0rem 0rem 0rem ${theme.sizes[2]} ${theme.colors.focus}`,
      }
    : {}

  return { focusStyles, focusProps }
}

export interface CheckboxProps
  extends Pick<
    ReakitProps,
    | 'checked'
    | 'required'
    | 'disabled'
    | 'value'
    | 'name'
    | 'onChange'
    | 'state'
    | 'setState'
    | 'onClick'
    | 'aria-label'
    | 'aria-labelledby'
    | 'id'
  > {
  /** ThemeUI style prop */
  sx?: SxStyleProp
  /**
   * Checkbox Size
   * @default regular
   */
  size?: 'regular' | 'small'
}

export { useCheckboxState as useCheckbox }
