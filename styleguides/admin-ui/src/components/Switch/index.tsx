/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Ref } from 'react'
import {
  Checkbox,
  CheckboxProps,
  useCheckboxState,
  CheckboxStateReturn,
} from 'reakit'
import { useComponentSx, mergeSx } from '@vtex-components/theme'
import { forwardRef } from '@vtex-components/utils'

import { useFocusHollow } from '../../utils'

export const Switch = forwardRef(
  (props: SwitchProps, ref: Ref<HTMLInputElement>) => {
    const { sx = {}, size = 'regular', ...reakitProps } = props
    const { focusStyles, focusProps } = useFocusHollow({
      backgroundColor: 'muted.0',
      borderColor: 'muted.0',
    })

    const styles = useComponentSx('switch', {
      size,
    })

    const mergedSx = mergeSx<SxStyleProp>({ ...styles, ...focusStyles }, sx)

    return (
      <Checkbox
        ref={ref}
        role="switch"
        {...reakitProps}
        {...focusProps}
        sx={mergedSx}
      />
    )
  }
)

export interface SwitchProps
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

export { useCheckboxState as useSwitch }
export { CheckboxStateReturn }
