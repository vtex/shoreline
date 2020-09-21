/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Ref } from 'react'
import {
  Checkbox,
  CheckboxProps,
  useCheckboxState,
  CheckboxStateReturn,
} from 'reakit'
import { mergeSx } from '@vtex-components/theme'
import { forwardRef } from '@vtex-components/utils'

import { useFocusHollow } from '../../hooks'

export const Toggle = forwardRef(
  (props: ToggleProps, ref: Ref<HTMLInputElement>) => {
    const { sx = {}, size = 'regular', ...reakitProps } = props
    const { focusStyles, focusProps } = useFocusHollow()

    const styles = mergeSx<SxStyleProp>(
      { variant: `forms.toggle-${size}`, ...focusStyles },
      sx
    )

    return (
      <Checkbox
        ref={ref}
        role="switch"
        {...reakitProps}
        {...focusProps}
        sx={styles}
      />
    )
  }
)

export interface ToggleProps
  extends Pick<
    CheckboxProps,
    | 'checked'
    | 'required'
    | 'disabled'
    | 'value'
    | 'name'
    | 'onChange'
    | 'state'
    | 'setState'
    | 'aria-labelledby'
    | 'aria-label'
    | 'id'
  > {
  /** ThemeUI style prop
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * Switch Size
   * @default regular
   */
  size?: 'regular' | 'small'
}

export { useCheckboxState as useToggle }
export { CheckboxStateReturn }
