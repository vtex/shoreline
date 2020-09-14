/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { ReactNode } from 'react'
import {
  Checkbox,
  CheckboxProps as ReakitProps,
  useCheckboxState,
} from 'reakit'
import { useFocusRing } from '@react-aria/focus'
import { useComponentSx, mergeSx } from '@vtex-components/theme'

import { Theme } from '../../theme'

export function Switch(props: SwitchProps) {
  const { label, sx = {}, size = 'regular', ...reakitProps } = props
  const { focusStyles, focusProps } = useFocusHollow()

  const styles = useComponentSx('switch', {
    size,
  })

  const mergedSx = mergeSx<SxStyleProp>({ ...styles, ...focusStyles }, sx)

  return <Checkbox {...reakitProps} {...focusProps} sx={mergedSx} />
}

function useFocusHollow() {
  const { isFocusVisible, focusProps } = useFocusRing()
  const focusStyles = isFocusVisible
    ? {
        backgroundColor: 'muted.0',
        borderColor: 'muted.0',
        boxShadow: (theme: Theme) =>
          `0rem 0rem 0rem ${theme.sizes[2]} ${theme.colors.focus}`,
      }
    : {}

  return { focusStyles, focusProps }
}

export interface SwitchProps
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
  > {
  /** ThemeUI style prop
   * @default {}
   */
  sx?: SxStyleProp
  /** Checkbox label */
  label?: ReactNode
  /**
   * Checkbox Size
   * @default regular
   */
  size?: 'regular' | 'small'
}

export { useCheckboxState as useSwitch }
