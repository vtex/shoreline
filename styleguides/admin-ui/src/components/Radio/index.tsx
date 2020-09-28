/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  Radio as ReakitRadio,
  RadioProps as ReakitRadioProps,
  RadioStateReturn,
} from 'reakit/Radio'
import { Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'

export const Radio = forwardRef(
  (props: RadioProps, ref: Ref<HTMLInputElement>) => {
    const { size = 'regular', sx, state, ...baseProps } = props

    const styles = { variant: `forms.radio-${size}`, ...sx }

    return <ReakitRadio ref={ref} sx={styles} {...state} {...baseProps} />
  }
)

export interface RadioProps
  extends Pick<
    ReakitRadioProps,
    | 'value'
    | 'disabled'
    | 'required'
    | 'name'
    | 'id'
    | 'checked'
    | 'aria-label'
    | 'aria-labelledby'
  > {
  /**
   * Radio size
   * @default 'regular'
   */
  size?: 'regular' | 'small'
  /**
   * useRadio() hook return
   */
  state: RadioStateReturn
  /**
   * ThemeUI Style prop
   */
  sx?: SxStyleProp
}

export { useRadioState as useRadio, RadioStateReturn } from 'reakit/Radio'
