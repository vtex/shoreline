/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit'
import { mergeSx } from '@vtex-components/theme'

import { useFocusHollow } from '../../hooks'

export function Checkbox({
  sx = {},
  size = 'regular',
  ...reakitProps
}: CheckboxProps) {
  const { focusStyles, focusProps } = useFocusHollow()

  const styles = mergeSx<SxStyleProp>(
    { variant: `forms.checkbox-${size}`, ...focusStyles },
    sx
  )

  return <ReakitCheckbox {...focusProps} {...reakitProps} sx={styles} />
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
  /** ThemeUI style prop
   *  @default {}
   */
  sx?: SxStyleProp
  /**
   *  Checkbox Size
   * @default regular
   */
  size?: 'regular' | 'small'
}

export { useCheckboxState as useCheckbox }
export { CheckboxStateReturn }
