/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Ref } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit'
import { mergeSx } from '@vtex-components/theme'
import { forwardRef } from '@vtex-components/utils'

export const Checkbox = forwardRef(
  (props: CheckboxProps, ref: Ref<HTMLInputElement>) => {
    const { sx = {}, size = 'regular', ...reakitProps } = props

    const styles = mergeSx<SxStyleProp>(
      { variant: `forms.checkbox-${size}` },
      sx
    )

    return <ReakitCheckbox ref={ref} {...reakitProps} sx={styles} />
  }
)
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
