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

export const Toggle = forwardRef(
  (props: ToggleProps, ref: Ref<HTMLInputElement>) => {
    const { sx = {}, size = 'regular', ...reakitProps } = props

    const styles = mergeSx<SxStyleProp>({ variant: `forms.toggle-${size}` }, sx)

    return <Checkbox ref={ref} role="switch" {...reakitProps} sx={styles} />
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
